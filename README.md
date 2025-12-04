# n8n-nodes-atriomail

This is an n8n community node for [Atriomail](https://system.atriomail.com) - an Email System Management API for managing domains, mailboxes, forwarders, and catch-all configurations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Domain
- **Create** - Create a new email domain
- **Delete** - Delete an existing domain
- **Get** - Retrieve a specific domain by ID
- **Get Many** - List all domains
- **Update** - Update domain settings (active status, description)

### Mailbox
- **Create** - Create a new mailbox with email address and password
- **Delete** - Delete an existing mailbox
- **Get** - Retrieve a specific mailbox by ID
- **Get Many** - List all mailboxes
- **Update** - Update mailbox settings (name, password, quota, active status)

### Forwarder
- **Create** - Create a new email forwarder
- **Delete** - Delete an existing forwarder
- **Get** - Retrieve a specific forwarder by ID
- **Get Many** - List all forwarders
- **Update** - Update forwarder settings (forward-to addresses, active status)

### Catch-All
- **Create** - Create a new catch-all configuration for a domain
- **Delete** - Delete an existing catch-all configuration
- **Get** - Retrieve a specific catch-all by ID
- **Get Many** - List all catch-all configurations
- **Update** - Update catch-all settings (forward-to addresses, active status)

## Credentials

To use this node, you need to configure the Atriomail API credentials:

1. **API URL**: Your Atriomail instance URL (default: `https://system.atriomail.com`)
2. **API Token**: Your API token generated from the Atriomail dashboard

### Getting your API Token

1. Log in to your Atriomail dashboard
2. Navigate to your account settings
3. Generate a new API token
4. Copy the token and use it in the n8n credentials

## Compatibility

- Tested with n8n version 1.0.0 and above
- Requires Node.js 18.10 or higher

## Usage

### Create a Domain

1. Add the Atriomail node to your workflow
2. Select **Domain** as the resource
3. Select **Create** as the operation
4. Enter the domain name (e.g., `example.com`)
5. Optionally set the domain as active and add a description

### Create a Mailbox

1. Select **Mailbox** as the resource
2. Select **Create** as the operation
3. Choose the domain from the dropdown (domains are loaded dynamically)
4. Enter the local part (e.g., `john` for `john@example.com`)
5. Set a password for the mailbox
6. Optionally set display name and quota

### Create a Forwarder

1. Select **Forwarder** as the resource
2. Select **Create** as the operation
3. Choose the domain from the dropdown
4. Enter the local part (e.g., `sales` for `sales@example.com`)
5. Enter comma-separated email addresses to forward to

### Create a Catch-All

1. Select **Catch-All** as the resource
2. Select **Create** as the operation
3. Choose the domain from the dropdown
4. Enter comma-separated email addresses to receive catch-all emails

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Atriomail API Documentation](https://system.atriomail.com/api/documentation)

## License

[MIT](LICENSE)

## More Information

[Atriomail](https://atriomail.com)
