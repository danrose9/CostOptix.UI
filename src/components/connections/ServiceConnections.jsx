
export const ServiceConnections = [
  {  
    vendor: 'Microsoft',
    provider: 'Microsoft',
    name: 'Microsoft 365',
    connectionName: '365OFF',
    img: require('../../assets/microsoft-96.png'),
    href: 'https://portal.office.com/',
    consentUrl: 'https://login.microsoftonline.com/{organizationId}/adminconsent?client_id={clientId}&state={state}&redirect_uri={redirectUrl}',
    description: 'Microsft 365 Subscription & Service Plan license and costs',
    details: 'Connect to Microsft 365. Report on subscriptions associated to your tenant and each user. Understand which users are not effectively using their complete service plans and how to reduce costs.',
    active: false,
    colorHex: '#008AD7',
    color: 'purple',    
  },
  {  
    vendor: 'Microsoft',
    provider: 'Azure',
    name: 'Microsoft Azure',
    connectionName: 'MICAZR',
    img: require('../../assets/azure-96.png'),
    href: 'https://portal.azure.com/',
    consentUrl: '',
    description: 'Microsoft Azure Billing and Usage',
    details: 'Create a connection to Azure\'s Billing APIs. These allow access to see usage, costs and resource information within your organization.',
    active: true,
    colorHex: '#7FBA00',
    color: 'blue',
  },
  {  
    vendor: 'Amazon',
    provider: 'AWS',
    name: 'Amazon Web Services',
    connectionName: 'AZNWEB',
    img: require('../../assets/amazon-web-services-96.png'),
    href: 'https://aws.amazon.com/',
    consentUrl: '',
    description: 'Amazon Web Service costs and expenditure',
    details: 'Connect to your AWS organization giving access to show subscription costs, resources and usage information across each of your regions.',
    active: true,
    colorHex: '#FF9900',
    color: 'orange',
  },
  {  
    vendor: 'Salesforce',
    provider: 'Salesforce',
    name: 'Salesforce',
    connectionName: 'SALEFO',
    img: require('../../assets/salesforce-96.png'),
    href: 'https://www.salesforce.com/',
    consentUrl: '',
    description: 'Salesforce costs and subscriptions',
    details: 'Connect to your Salesforce subscription, gather service costs and subscription usage with this connection',
    active: false,
    colorHex: '#ADCEFF',
    color: 'violet',
  },
  {  
    vendor: 'Google',
    provider: 'Google',
    name: 'Google Cloud',
    connectionName: 'GOOGCL',
    img: require('../../assets/google-cloud-96.png'),
    href: 'https://cloud.google.com/',
    consentUrl: '',
    description: 'Google Cloud cost analytics',
    details: 'Connect to your Google Cloud subscription, gather service costs and subscription usage with this connection',
    active: false,
    colorHex: '#FFC658',
    color: 'yellow',
  },
];

export default ServiceConnections;
