variable aws_region {
    description = "AWS Region"
    default = "us-east-1"
    type = string
}

variable "domain_name" { 
    description = "Root Domain"
    default = "geborges.com"
    type = string
}


variable "alt_names" { 
    description = "Alternative domains (i.e. www)"
    default = [] 
    type = list(string)
}

variable "route53_zone_id" {
  description = "Hosted Zone ID"
  type        = string
  default     = "Z0414339XEX14919T44O"
}

variable "default_tags" {
    description = "Default tags"
    type = map(string)
    default = {
        Project = "geborges"
        Env = "prod"
    }
}

variable "CSP_Enable" {
  description = "Enable Content-Security-Policy header in CloudFront response headers policy"
  type        = bool
  default     = true
}
