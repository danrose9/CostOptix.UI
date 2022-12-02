resource "azurerm_service_plan" "costoptix-ui-serviceplan" {
  name                = "costoptix-${var.environment}-ui-serviceplan"
  location            = var.costoptix_rg.location
  resource_group_name = var.costoptix_rg.name

  os_type  = "Linux"
  sku_name = "B1"
}

resource "azurerm_linux_web_app" "costoptix-ui" {
  name                = "costoptix-${var.environment}-ui"
  location            = var.costoptix_rg.location
  resource_group_name = var.costoptix_rg.name
  service_plan_id     = azurerm_service_plan.costoptix-ui-serviceplan.id

  https_only = true

  site_config {
    always_on        = false
    app_command_line = "npx serve -s"

    application_stack {
      node_version = "16-lts"
    }
  }

  app_settings = {
    "REACT_APP_API_URI"                                 = var.api_url
    # "APPINSIGHTS_INSTRUMENTATIONKEY"                  = azurerm_application_insights.costoptix-ui-appinsights.instrumentation_key
    # "APPINSIGHTS_PROFILERFEATURE_VERSION"             = "1.0.0"
    # "APPINSIGHTS_SNAPSHOTFEATURE_VERSION"             = "1.0.0"
    # "APPLICATIONINSIGHTS_CONNECTION_STRING"           = azurerm_application_insights.costoptix-ui-appinsights.connection_string
    # "ApplicationInsightsAgent_EXTENSION_VERSION"      = "~3"
    # "DiagnosticServices_EXTENSION_VERSION"            = "~3"
    # "InstrumentationEngine_EXTENSION_VERSION"         = "disabled"
    # "SnapshotDebugger_EXTENSION_VERSION"              = "disabled"
    # "XDT_MicrosoftApplicationInsights_BaseExtensions" = "disabled"
    # "XDT_MicrosoftApplicationInsights_Mode"           = "recommended"
    # "XDT_MicrosoftApplicationInsights_PreemptSdk"     = "disabled"
  }
}