terraform {
  backend "s3" {
    bucket         = "terraform-state-983046790072"
    key            = "geborges/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    use_lockfile   = true
  }
}

