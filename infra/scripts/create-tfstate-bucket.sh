#!/bin/bash

# =============================================================================
# Terraform S3 State Bucket Creation Script
# =============================================================================
# This script creates an S3 bucket configured for Terraform state storage.
# The bucket includes:
#   - Encryption at rest using AES-256
#   - Block public access settings
#   - Native S3 lock mechanism (use_lockfile = true)
#
# Prerequisites:
#   - AWS CLI v2 installed
#   - AWS SSO session active (aws sso login --profile <profile>)
#   - Sufficient IAM permissions for S3 operations
# =============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# =============================================================================
# Configuration Variables
# =============================================================================

# S3 Bucket Name for Terraform state
# Using a unique naming convention to avoid conflicts across environments
TF_STATE_BUCKET="terraform-state-$(aws sts get-caller-identity --profile "${AWS_PROFILE:-default}" --query 'Account' --output text 2>/dev/null || echo 'unknown')"

# Default Region (can be overridden by command line argument)
DEFAULT_REGION="us-east-1"

# =============================================================================
# Function: Display Usage Information
# =============================================================================

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Create an S3 bucket for Terraform state storage with native S3 lock mechanism."
    echo ""
    echo "Options:"
    echo "  -p, --profile    AWS CLI profile name (required)"
    echo "  -r, --region     AWS region for resource creation (default: ${DEFAULT_REGION})"
    echo "  -h, --help       Display this help message and exit"
    echo ""
    echo "Examples:"
    echo "  $0 --profile myawsprofile --region us-east-1"
    echo "  $0 -p myawsprofile -r eu-west-1"
    echo ""
    echo "Prerequisites:"
    echo "  1. Ensure AWS SSO login is active: aws sso login --profile <profile>"
    echo "  2. Verify profile has permissions for S3 operations"
}

# =============================================================================
# Function: Check AWS CLI Prerequisites
# =============================================================================

check_prerequisites() {
    echo "============================================"
    echo "Checking Prerequisites..."
    echo "============================================"

    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        echo "ERROR: AWS CLI is not installed or not in PATH"
        echo "Please install AWS CLI v2: https://aws.amazon.com/cli/"
        exit 1
    fi
    echo "[OK] AWS CLI is installed"

    # Check if profile exists in AWS CLI configuration
    if ! aws configure list --profile "${AWS_PROFILE}" &> /dev/null 2>&1; then
        echo "ERROR: AWS profile '${AWS_PROFILE}' not found"
        echo "Please configure the profile using: aws configure sso --profile ${AWS_PROFILE}"
        exit 1
    fi
    echo "[OK] AWS profile '${AWS_PROFILE}' is configured"

    # Check if AWS SSO session is active by testing API access
    if ! aws sts get-caller-identity --profile "${AWS_PROFILE}" &> /dev/null; then
        echo "ERROR: AWS SSO session is not active or has expired"
        echo "Please run: aws sso login --profile ${AWS_PROFILE}"
        exit 1
    fi
    echo "[OK] AWS SSO session is active"

    # Get AWS Account ID for resource naming
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --profile "${AWS_PROFILE}" --query 'Account' --output text)
    echo "[OK] AWS Account ID: ${AWS_ACCOUNT_ID}"

    # Update bucket name with account ID for global uniqueness
    TF_STATE_BUCKET="terraform-state-${AWS_ACCOUNT_ID}"
    echo "[INFO] S3 Bucket Name: ${TF_STATE_BUCKET}"
}

# =============================================================================
# Function: Create S3 Bucket for Terraform State
# =============================================================================

create_s3_bucket() {
    echo ""
    echo "============================================"
    echo "Creating S3 Bucket for Terraform State..."
    echo "============================================"

    # Check if bucket already exists
    if aws s3api head-bucket --bucket "${TF_STATE_BUCKET}" --profile "${AWS_PROFILE}" 2>/dev/null; then
        echo "[INFO] S3 bucket '${TF_STATE_BUCKET}' already exists"
        echo "[INFO] Skipping bucket creation"
    else
        echo "Creating S3 bucket: ${TF_STATE_BUCKET} in ${AWS_REGION}"

        # Create bucket in the specified region
        # For us-east-1, we don't specify LocationConstraint (AWS default)
        if [ "${AWS_REGION}" = "us-east-1" ]; then
            aws s3api create-bucket \
                --bucket "${TF_STATE_BUCKET}" \
                --profile "${AWS_PROFILE}"
        else
            aws s3api create-bucket \
                --bucket "${TF_STATE_BUCKET}" \
                --region "${AWS_REGION}" \
                --create-bucket-configuration LocationConstraint="${AWS_REGION}" \
                --profile "${AWS_PROFILE}"
        fi

        echo "[OK] S3 bucket created successfully"
    fi

    # Enable default encryption using AES-256
    echo "Enabling S3 bucket encryption..."
    aws s3api put-bucket-encryption \
        --bucket "${TF_STATE_BUCKET}" \
        --server-side-encryption-configuration '{
            "Rules": [
                {
                    "ApplyServerSideEncryptionByDefault": {
                        "SSEAlgorithm": "AES256"
                    }
                }
            ]
        }' \
        --profile "${AWS_PROFILE}"
    echo "[OK] S3 bucket encryption enabled"

    # Block all public access (security best practice for state bucket)
    echo "Configuring block public access settings..."
    aws s3api put-public-access-block \
        --bucket "${TF_STATE_BUCKET}" \
        --public-access-block-configuration '{
            "BlockPublicAcls": true,
            "IgnorePublicAcls": true,
            "BlockPublicPolicy": true,
            "RestrictPublicBuckets": true
        }' \
        --profile "${AWS_PROFILE}"
    echo "[OK] Block public access configured"

    # Optional: Add bucket tags for cost allocation and organization
    echo "Adding bucket tags..."
    aws s3api put-bucket-tagging \
        --bucket "${TF_STATE_BUCKET}" \
        --tagging 'TagSet=[{Key=Project,Value=geborges},{Key=Environment,Value=tfstate}]' \
        --profile "${AWS_PROFILE}"
    echo "[OK] Bucket tags added"
}


# =============================================================================
# Function: Generate Backend Configuration
# =============================================================================

generate_backend_config() {
    echo ""
    echo "============================================"
    echo "Generating Backend Configuration..."
    echo "============================================"

    # Generate backend.tf content
    BACKEND_CONFIG="terraform {
  backend \"s3\" {
    bucket         = \"${TF_STATE_BUCKET}\"
    key            = \"geborges/terraform.tfstate\"
    region         = \"${AWS_REGION}\"
    encrypt        = true
    use_lockfile   = true
  }
}
"
    # Write backend configuration to file
    BACKEND_FILE="../terraform/backend.tf"
    echo "${BACKEND_CONFIG}" > "${BACKEND_FILE}"

    echo "[OK] Backend configuration written to: ${BACKEND_FILE}"
    echo ""
    echo "Generated backend.tf content:"
    echo "--------------------------------------------"
    cat "${BACKEND_FILE}"
    echo "--------------------------------------------"
}

# =============================================================================
# Function: Display Next Steps
# =============================================================================

display_next_steps() {
    echo ""
    echo "============================================"
    echo "Setup Complete!"
    echo "============================================"
    echo ""
    echo "Next steps:"
    echo "1. Navigate to your Terraform configuration directory"
    echo "   cd infra/terraform"
    echo ""
    echo "2. Initialize Terraform with the new backend"
    echo "   terraform init"
    echo ""
    echo "3. Verify state is stored in S3"
    echo "   terraform state list"
    echo ""
    echo "Resources created:"
    echo "  - S3 Bucket: ${TF_STATE_BUCKET}"
    echo ""
    echo "IMPORTANT: The backend uses S3 native lock mechanism (use_lockfile = true)."
    echo ""
    echo "IMPORTANT: Ensure your Terraform configuration references"
    echo "the correct backend bucket in backend.tf"
    echo ""
}

# =============================================================================
# Main Script Execution
# =============================================================================

main() {
    # Initialize variables
    AWS_PROFILE=""
    AWS_REGION="${DEFAULT_REGION}"

    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--profile)
                AWS_PROFILE="$2"
                shift 2
                ;;
            -r|--region)
                AWS_REGION="$2"
                shift 2
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            *)
                echo "ERROR: Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done

    # Check if profile was provided
    if [ -z "${AWS_PROFILE}" ]; then
        echo "ERROR: AWS profile is required"
        echo ""
        usage
        exit 1
    fi

    # Export profile for AWS CLI usage
    export AWS_PROFILE

    echo "============================================"
    echo "Terraform State Bucket Setup"
    echo "============================================"
    echo "Profile: ${AWS_PROFILE}"
    echo "Region: ${AWS_REGION}"
    echo ""

    # Execute setup steps
    check_prerequisites
    create_s3_bucket
    generate_backend_config
    display_next_steps
}

# Run main function with all script arguments
main "$@"
