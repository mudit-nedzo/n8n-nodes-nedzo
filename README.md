# n8n-nodes-nedzo

This is an n8n community node for [Nedzo](https://nedzo.ai) - AI Voice Agent Automation Platform.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-nedzo` in **Enter npm package name**
4. Agree to the risks and select **Install**

### Manual Installation

```bash
npm install n8n-nodes-nedzo
```

## Credentials

This node requires Nedzo API credentials. You can obtain an API key from your [Nedzo dashboard](https://app.nedzo.ai).

## Operations

### Agent
- **Create Agent** - Create a new agent within a workspace
- **Find Agent** - Find and get an agent details
- **Update Agent** - Updates an agent within a workspace
- **Delete Agent** - Delete agent (permanent)

### Call
- **Make Phone Call** - Creates an outbound phone call using Nedzo voice agent

### Contact
- **Create/Update Contact** - Creates or updates a contact in a workspace
- **Find Contact** - Gets a contact and all its information
- **Delete Contact** - Deletes a contact in a workspace

### Workspace
- **Create Workspace** - Creates a workspace in an account
- **Delete Workspace** - Deletes a workspace (permanent)

## Documentation

For detailed step-by-step instructions on using each operation, see the [full documentation](DOCUMENTATION.md).

## Compatibility

Tested with n8n version 1.0.0 and above.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Nedzo API Documentation](https://docs.nedzo.ai)
- [Nedzo Website](https://nedzo.ai)

## License

[MIT](LICENSE.md)
