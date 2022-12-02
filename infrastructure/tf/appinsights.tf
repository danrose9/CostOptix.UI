# resource "azurerm_log_analytics_workspace" "costoptix-ui-logworkspace" {
#   name                = "costoptix-${var.environment}-ui-logworkspace"
#   location            = var.costoptix_rg.location
#   resource_group_name = var.costoptix_rg.name
#   sku                 = "PerGB2018"
#   retention_in_days   = 30
# }
# 
# resource "azurerm_application_insights" "costoptix-ui-appinsights" {
#   name                = "costoptix-${var.environment}-ui-appinsights"
#   location            = var.costoptix_rg.location
#   resource_group_name = var.costoptix_rg.name
#   workspace_id        = azurerm_log_analytics_workspace.costoptix-ui-logworkspace.id
#   application_type    = "Node.JS"
# }