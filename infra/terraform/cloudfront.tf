########################
# CloudFront Origin Access Control (OAC)
########################

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "geborges-com-oac"
  description                       = "OAC to access private S3 bucket for site"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

########################
# CloudFront Response Headers Policy
########################

resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "geborges-com-security-headers"

  security_headers_config {
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    strict_transport_security {
      access_control_max_age_sec = 63072000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }

    xss_protection {
      protection = true
      mode_block = true
      override   = true
    }

  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "geolocation=(), microphone=(), camera=(), fullscreen=(self)"
      override = true
    }
  }
}

########################
# CloudFront Distribution
########################

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  comment             = "CDN for geborges.com"
  default_root_object = "index.html"

  aliases = concat([var.domain_name], var.alt_names)

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-geborges-com-site"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-geborges-com-site"

    viewer_protocol_policy = "redirect-to-https"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  price_class = "PriceClass_100" # Uses cheaper edge locations (North America/Europe)

  tags = {
    Name = "geborges-com-cf"
  }

  depends_on = [
    aws_s3_bucket_ownership_controls.site,
    aws_s3_bucket_public_access_block.site
  ]
}

########################
# Bucket Policy allowing only CloudFront (OAC)
########################

data "aws_iam_policy_document" "site_bucket_policy" {
  statement {
    sid = "AllowCloudFrontReadOAC"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.site.arn}/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_bucket_policy.json
}
