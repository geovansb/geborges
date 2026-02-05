#!/bin/bash

# =============================================================================
# Site Deployment Script for S3 + CloudFront
# =============================================================================
# This script deploys the Next.js static site to S3 and invalidates CloudFront.
# Prerequisites:
#   - AWS CLI v2 installed
#   - AWS SSO session active (aws sso login --profile <profile>)
#   - Bun installed (for building the site)
# =============================================================================

set -e

# =============================================================================
# Configuration Variables
# =============================================================================

S3_BUCKET="geborges-com-site"
WEBSITE_DIR="../../website"
BUILD_DIR="${WEBSITE_DIR}/dist"
DEFAULT_REGION="us-east-1"
INVALIDATION_PATHS="/*"
BUN_PATH="/Users/geovansb/.bun/bin/bun"
INSTALL_DEPS=false

# =============================================================================
# Function: Display Usage Information
# =============================================================================

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Deploy the Next.js static site to S3 and invalidate CloudFront cache."
    echo ""
    echo "Options:"
    echo "  -p, --profile       AWS CLI profile name (required)"
    echo "  -r, --region        AWS region (default: ${DEFAULT_REGION})"
    echo "  -b, --build         Build the site before deploying (default: false)"
    echo "  -i, --install       Install dependencies with bun install (default: false)"
    echo "  -w, --wait          Wait for CloudFront invalidation to complete (default: true)"
    echo "  -d, --dry-run       Show what would be done without executing (default: false)"
    echo "  -h, --help          Display this help message and exit"
    echo ""
    echo "Examples:"
    echo "  $0 --profile myawsprofile"
    echo "  $0 --profile myawsprofile --install --build"
    echo "  $0 --profile myawsprofile --region eu-west-1 --install --build"
    echo "  $0 --profile myawsprofile --dry-run"
    echo ""
    echo "Prerequisites:"
    echo "  1. Ensure AWS SSO login is active: aws sso login --profile <profile>"
    echo "  2. Verify profile has permissions for S3 and CloudFront operations"
    echo "  3. Bun must be installed at ${BUN_PATH}"
}

# =============================================================================
# Function: Check AWS CLI Prerequisites
# =============================================================================

check_prerequisites() {
    echo ""
    echo "Checking Prerequisites..."
    echo "============================================"

    if ! command -v aws &> /dev/null; then
        echo "ERROR: AWS CLI is not installed or not in PATH"
        echo "Please install AWS CLI v2: https://aws.amazon.com/cli/"
        exit 1
    fi
    echo "[OK] AWS CLI is installed"

    if ! aws configure list --profile "${AWS_PROFILE}" &> /dev/null 2>&1; then
        echo "ERROR: AWS profile '${AWS_PROFILE}' not found"
        echo "Please configure the profile using: aws configure sso --profile ${AWS_PROFILE}"
        exit 1
    fi
    echo "[OK] AWS profile '${AWS_PROFILE}' is configured"

    if ! aws sts get-caller-identity --profile "${AWS_PROFILE}" &> /dev/null; then
        echo "ERROR: AWS SSO session is not active or has expired"
        echo "Please run: aws sso login --profile ${AWS_PROFILE}"
        exit 1
    fi
    echo "[OK] AWS SSO session is active"

    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --profile "${AWS_PROFILE}" --query 'Account' --output text)
    echo "[OK] AWS Account ID: ${AWS_ACCOUNT_ID}"

    if [ "${BUILD_SITE}" = true ]; then
        if [ ! -x "${BUN_PATH}" ]; then
            echo "ERROR: Bun is not installed or not found at ${BUN_PATH}"
            echo "Please install Bun: https://bun.sh/"
            exit 1
        fi
        echo "[OK] Bun is installed at ${BUN_PATH}"
    fi

    if [ ! -d "${BUILD_DIR}" ]; then
        echo "ERROR: Build directory '${BUILD_DIR}' not found"
        echo "Please run with --build flag or build the site manually"
        exit 1
    fi
    echo "[OK] Build directory exists: ${BUILD_DIR}"
}

# =============================================================================
# Function: Install Dependencies
# =============================================================================

install_dependencies() {
    echo ""
    echo "============================================"
    echo "Installing Dependencies..."
    echo "============================================"

    cd "${WEBSITE_DIR}"
    echo "[INFO] Running: ${BUN_PATH} install"
    "${BUN_PATH}" install

    cd - > /dev/null

    echo "[OK] Dependencies installed successfully"
}

# =============================================================================
# Function: Build Next.js Site
# =============================================================================

build_site() {
    echo ""
    echo "============================================"
    echo "Building Next.js Site..."
    echo "============================================"

    cd "${WEBSITE_DIR}"
    echo "[INFO] Running: ${BUN_PATH} run build"
    "${BUN_PATH}" run build

    cd - > /dev/null

    if [ ! -d "${BUILD_DIR}" ]; then
        echo "ERROR: Build directory '${BUILD_DIR}' was not created"
        exit 1
    fi

    echo "[OK] Build completed successfully"
    echo "[INFO] Build output: ${BUILD_DIR}"
}

# =============================================================================
# Function: Sync Build to S3
# =============================================================================

sync_to_s3() {
    echo ""
    echo "============================================"
    echo "Syncing to S3 Bucket..."
    echo "============================================"

    echo "[INFO] Source: ${BUILD_DIR}"
    echo "[INFO] Destination: s3://${S3_BUCKET}/"
    echo ""

    if [ "${DRY_RUN}" = true ]; then
        echo "[DRY RUN] Would execute:"
        echo ""
        echo "# HTML files (no cache for immediate updates):"
        echo "  aws s3 sync ${BUILD_DIR} s3://${S3_BUCKET}/ \\"
        echo "    --profile ${AWS_PROFILE} \\"
        echo "    --region ${AWS_REGION} \\"
        echo "    --delete \\"
        echo "    --cache-control 'public, max-age=0, must-revalidate' \\"
        echo "    --exclude '.DS_Store' \\"
        echo "    --exclude '*.map' \\"
        echo "    --exclude '*' \\"
        echo "    --include '*.html'"
        echo ""
        echo "# Assets (1 year cache):"
        echo "  aws s3 sync ${BUILD_DIR} s3://${S3_BUCKET}/ \\"
        echo "    --profile ${AWS_PROFILE} \\"
        echo "    --region ${AWS_REGION} \\"
        echo "    --cache-control 'public, max-age=31536000, immutable' \\"
        echo "    --exclude '.DS_Store' \\"
        echo "    --exclude '*.map' \\"
        echo "    --exclude '*.html'"
        return
    fi

    # Sync only HTML files first (no cache for immediate updates)
    aws s3 sync "${BUILD_DIR}" "s3://${S3_BUCKET}/" \
        --profile "${AWS_PROFILE}" \
        --region "${AWS_REGION}" \
        --delete \
        --cache-control "public, max-age=0, must-revalidate" \
        --exclude ".DS_Store" \
        --exclude "*.map" \
        --exclude "*" \
        --include "*.html"

    # Sync all other assets (exclude HTML) with long cache (1 year)
    aws s3 sync "${BUILD_DIR}" "s3://${S3_BUCKET}/" \
        --profile "${AWS_PROFILE}" \
        --region "${AWS_REGION}" \
        --cache-control "public, max-age=31536000, immutable" \
        --exclude ".DS_Store" \
        --exclude "*.map" \
        --exclude "*.html"

    echo "[OK] Files synced to S3 successfully"
}

# =============================================================================
# Function: Get CloudFront Distribution ID
# =============================================================================

get_cloudfront_distribution_id() {
    echo ""
    echo "============================================"
    echo "Getting CloudFront Distribution ID..."
    echo "============================================"

    DISTRIBUTION_ID=$(aws cloudfront list-distributions \
        --profile "${AWS_PROFILE}" \
        --query "DistributionList.Items[?Comment=='CDN for geborges.com'].Id" \
        --output text)

    if [ -z "${DISTRIBUTION_ID}" ]; then
        echo "ERROR: Could not find CloudFront distribution for geborges.com"
        echo "Please verify the distribution exists and has the correct comment"
        exit 1
    fi

    echo "[OK] CloudFront Distribution ID: ${DISTRIBUTION_ID}"
}

# =============================================================================
# Function: Create CloudFront Invalidation
# =============================================================================

invalidate_cloudfront() {
    echo ""
    echo "============================================"
    echo "Creating CloudFront Invalidation..."
    echo "============================================"

    if [ "${DRY_RUN}" = true ]; then
        echo "[DRY RUN] Would create invalidation for paths: ${INVALIDATION_PATHS}"
        return
    fi

    INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
        --distribution-id "${DISTRIBUTION_ID}" \
        --profile "${AWS_PROFILE}" \
        --region "${AWS_REGION}" \
        --paths "${INVALIDATION_PATHS}")

    INVALIDATION_ID=$(echo "${INVALIDATION_OUTPUT}" | python3 -c "import sys, json; print(json.load(sys.stdin)['Invalidation']['Id'])")

    if [ -z "${INVALIDATION_ID}" ]; then
        echo "ERROR: Failed to create CloudFront invalidation"
        echo "Output: ${INVALIDATION_OUTPUT}"
        exit 1
    fi

    echo "[OK] Invalidation created successfully"
    echo "[INFO] Invalidation ID: ${INVALIDATION_ID}"
}

# =============================================================================
# Function: Wait for Invalidation to Complete
# =============================================================================

wait_for_invalidation() {
    if [ "${WAIT_FOR_INVALIDATION}" = false ]; then
        echo ""
        echo "[INFO] Skipping invalidation wait (--no-wait flag set)"
        return
    fi

    if [ "${DRY_RUN}" = true ]; then
        echo ""
        echo "[DRY RUN] Would wait for invalidation to complete"
        return
    fi

    echo ""
    echo "Waiting for Invalidation to Complete..."
    echo "============================================"
    echo "This may take a few minutes..."

    aws cloudfront wait invalidation-completed \
        --distribution-id "${DISTRIBUTION_ID}" \
        --id "${INVALIDATION_ID}" \
        --profile "${AWS_PROFILE}" \
        --region "${AWS_REGION}"

    echo "[OK] Invalidation completed"
}

# =============================================================================
# Function: Display Deployment Summary
# =============================================================================

display_summary() {
    echo ""
    echo "============================================"
    echo "Deployment Summary"
    echo "============================================"
    echo "S3 Bucket: ${S3_BUCKET}"
    echo "Build Directory: ${BUILD_DIR}"
    echo "AWS Profile: ${AWS_PROFILE}"
    echo "AWS Region: ${AWS_REGION}"
    echo ""

    if [ "${BUILD_SITE}" = true ]; then
        echo "Build: Executed"
    else
        echo "Build: Skipped (used existing build)"
    fi

    if [ "${DRY_RUN}" = true ]; then
        echo "Mode: DRY RUN (no changes made)"
    else
        echo "Mode: Production"
    fi

    echo ""

    if [ "${DRY_RUN}" = false ]; then
        echo "CloudFront Distribution ID: ${DISTRIBUTION_ID}"
        echo "Invalidation ID: ${INVALIDATION_ID}"
    fi

    echo ""
    echo "Site URL: https://geborges.com"
    echo ""
}

# =============================================================================
# Main Script Execution
# =============================================================================

main() {
    AWS_PROFILE=""
    AWS_REGION="${DEFAULT_REGION}"
    BUILD_SITE=false
    INSTALL_DEPS=false
    WAIT_FOR_INVALIDATION=true
    DRY_RUN=false
    DISTRIBUTION_ID=""
    INVALIDATION_ID=""

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
            -b|--build)
                BUILD_SITE=true
                shift
                ;;
            -i|--install)
                INSTALL_DEPS=true
                shift
                ;;
            --no-wait)
                WAIT_FOR_INVALIDATION=false
                shift
                ;;
            -d|--dry-run)
                DRY_RUN=true
                shift
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

    if [ -z "${AWS_PROFILE}" ]; then
        echo "ERROR: AWS profile is required"
        echo ""
        usage
        exit 1
    fi

    export AWS_PROFILE

    echo ""
    echo "============================================"
    echo "Site Deployment Script"
    echo "============================================"
    echo "Profile: ${AWS_PROFILE}"
    echo "Region: ${AWS_REGION}"
    echo "Build: ${BUILD_SITE}"
    echo "Install: ${INSTALL_DEPS}"
    echo "Wait for Invalidation: ${WAIT_FOR_INVALIDATION}"
    echo "Dry Run: ${DRY_RUN}"
    echo ""

    check_prerequisites

    if [ "${INSTALL_DEPS}" = true ]; then
        install_dependencies
    fi

    if [ "${BUILD_SITE}" = true ]; then
        build_site
    fi

    sync_to_s3
    get_cloudfront_distribution_id
    invalidate_cloudfront
    wait_for_invalidation
    display_summary
}

main "$@"
