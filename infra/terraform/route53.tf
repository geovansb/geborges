
########################
# Route 53 records -> CloudFront
########################

# A/AAAA alias for root domain pointing to distribution
resource "aws_route53_record" "root_a" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root_aaaa" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}


# Optional: alias for www.geborges.com (if you want)
# Uncomment and add "www.${var.domain_name}" to var.alt_names if using

# resource "aws_route53_record" "www_a" {
#   zone_id = data.aws_route53_zone.this.zone_id
#   name    = "www.${var.domain_name}"
#   type    = "A"
#
#   alias {
#     name                   = aws_cloudfront_distribution.site.domain_name
#     zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
#     evaluate_target_health = false
#   }
# }
#
# resource "aws_route53_record" "www_aaaa" {
#   zone_id = data.aws_route53_zone.this.zone_id
#   name    = "www.${var.domain_name}"
#   type    = "AAAA"
#
#   alias {
#     name                   = aws_cloudfront_distribution.site.domain_name
#     zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
#     evaluate_target_health = false
#   }
# }