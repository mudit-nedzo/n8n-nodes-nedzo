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
- **Create** - Create a new AI voice agent
- **Get** - Retrieve an agent by ID
- **Get Many** - List all agents in a workspace
- **Update** - Update an agent's configuration
- **Delete** - Delete an agent

### Call
- **Create** - Initiate an outbound call using an agent

### Contact
- **Create** - Create a new contact
- **Get** - Retrieve a contact by ID
- **Get Many** - List all contacts in a workspace
- **Update** - Update a contact's information
- **Delete** - Delete a contact

### Workspace
- **Create** - Create a new workspace
- **Get** - Retrieve a workspace by ID
- **Get Many** - List all workspaces
- **Update** - Update workspace settings
- **Delete** - Delete a workspace

## Compatibility

Tested with n8n version 1.0.0 and above.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Nedzo API Documentation](https://docs.nedzo.ai)
- [Nedzo Website](https://nedzo.ai)

## License

[MIT](LICENSE.md)
