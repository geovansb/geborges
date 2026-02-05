# S3 Bucket for the site
resource "aws_s3_bucket" "site" {
    bucket = "geborges-com-site"
    tags = merge(var.default_tags, {
            Name = "geborges-com-site"
        }
    )
}

# Required for OAC use (no ACLs)
resource "aws_s3_bucket_ownership_controls" "site" {
    bucket = aws_s3_bucket.site.id
    rule {
        object_ownership = "BucketOwnerEnforced"
    }
}

resource "aws_s3_bucket_public_access_block" "site" {
    bucket = aws_s3_bucket.site.id
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
}
