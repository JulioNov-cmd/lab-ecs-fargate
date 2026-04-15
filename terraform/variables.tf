variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "project_name" {
  description = "Project name prefix"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR for VPC"
  type        = string
}

variable "public_subnet_1_cidr" {
  description = "CIDR for public subnet 1"
  type        = string
}

variable "public_subnet_2_cidr" {
  description = "CIDR for public subnet 2"
  type        = string
}

variable "availability_zone_1" {
  description = "AZ 1"
  type        = string
}

variable "availability_zone_2" {
  description = "AZ 2"
  type        = string
}

variable "container_port" {
  description = "App container port"
  type        = number
}

variable "desired_count" {
  description = "Desired ECS service tasks"
  type        = number
}

variable "task_cpu" {
  description = "Fargate task CPU"
  type        = string
}

variable "task_memory" {
  description = "Fargate task memory"
  type        = string
}

variable "github_owner" {
  description = "GitHub owner or organization"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "github_branch" {
  description = "GitHub branch allowed to deploy"
  type        = string
}