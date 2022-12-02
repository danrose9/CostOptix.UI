terraform {
  backend "azurerm" {
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

# Variables
variable "environment" {
  type      = string
  sensitive = true
}

variable "costoptix_rg" {
  type = object({
    name     = string
    location = string
  })
  sensitive = true
}

variable "api_url" {
  type      = string
  sensitive = true
}