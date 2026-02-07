# Nedzo + n8n Integration Guide

This guide walks you through connecting Nedzo to n8n and using the available actions in your workflows.

## Getting Started

### Step 1: Get Your API Key

1. Log into your Nedzo account at app.nedzo.ai
2. Go to Settings > API Keys
3. Copy the key

### Step 2: Connect Nedzo in n8n

1. In your n8n workflow, add a new node
2. Search for "Nedzo"
3. Click on credentials and select "Create New"
4. Paste your API key
5. Click Save

That's it - you're connected.

---

## Available Actions

### Calls

#### Make Phone Call

Creates an outbound phone call using Nedzo voice agent.

**Step-by-step:**
1. Select Resource: **Call**
2. Select Operation: **Make Phone Call**
3. Enter **Agent ID** - UUID of the agent to use for the call
4. Select **Call Type** - Choose between Phone Number or Contact

**For Phone Number calls:**
5. Enter **Phone Number** - Number to call in E.164 format (+14155551234)
6. Click **Add Field** to add optional fields:
   - **First Name** - Contact's first name. This value is passed to the agent as a variable and can be used in the conversation.
   - **Last Name** - Contact's last name. This value is passed to the agent as a variable and can be used in the conversation.
   - **Email** - Contact's email address. This value is passed to the agent as a variable and can be used in the conversation.
   - **Business Name** - Business or company name. This value is passed to the agent as a variable and can be used in the conversation.
   - **Custom Fields (JSON)** - Custom field values by field name. Field names must match existing custom field definitions in your Nedzo account.
   - **Variables (JSON)** - Custom variables to pass to the assistant. These override contact field values and can be referenced in the agent's prompt.

**For Contact calls:**
5. Enter **Contact ID** - UUID of the contact to call. The contact must already exist in your workspace.

---

### Agents

#### Create Agent

Creates a new agent within a workspace.

**Step-by-step:**
1. Select Resource: **Agent**
2. Select Operation: **Create Agent**
3. Select **Workspace** - Choose from your workspaces. The dropdown loads automatically from your Nedzo account.
4. Enter **Name** - Agent name. Must be between 1-255 characters.
5. Select **Agent Type** - Choose the type of agent: Inbound Voice, Outbound Voice, Chat, or Widget. Based on your selection, different fields will be available.
6. Click **Add Field** to add optional fields based on agent type

---

##### Inbound Voice Agent

For agents that handle incoming phone calls.

**Common Fields:**
- **Name** (required) - Agent name. Must be between 1-255 characters. This is how the agent will be identified in your workspace.
- **Agent Type** (required) - Select "Inbound Voice" for agents that receive incoming calls.
- **Workspace** (required) - The workspace where this agent will be created. Select from the dropdown.

**Additional Fields (click Add Field):**
- **Prompt** - System prompt for the agent. This defines how the agent behaves and responds during conversations.
- **Language** - The language the agent will speak. Options: english, spanish, french, german, portuguese, dutch, chinese, japanese. Default is english.
- **Is Active** - Whether the agent is active and ready to handle calls. Default is true.

**Voice-Specific Fields:**
- **Opening Line** - The first message the agent speaks when a call starts.
- **Voice ID** - Voice provider ID for text-to-speech. Determines which voice the agent uses when speaking.
- **Background Sound** - Enable background sound during calls to make conversations feel more natural. Default is true.
- **HIPAA Compliance** - When enabled, no logs, recordings, or transcriptions will be stored. Use this for healthcare-related calls. Default is false.
- **Call Duration** - Maximum call duration in minutes. Valid range is 1-60. Default is 30 minutes.
- **Speed** - Voice speed multiplier. Valid range is 0.5-1.5. Default is 1.0 (normal speed).

---

##### Outbound Voice Agent

For agents that make outgoing phone calls.

**Common Fields:**
- **Name** (required) - Agent name. Must be between 1-255 characters. 
- **Agent Type** (required) - Select "Outbound Voice" for agents that make outgoing calls.
- **Workspace** (required) - The workspace where this agent will be created. Select from the dropdown.

**Additional Fields (click Add Field):**
- **Prompt** - System prompt for the agent. This defines how the agent behaves and responds during conversations.
- **Language** - The language the agent will speak. Options: english, spanish, french, german, portuguese, dutch, chinese, japanese. Default is english.
- **Is Active** - Whether the agent is active and ready to make calls. Default is true.

**Voice-Specific Fields:**
- **Opening Line** - The first message the agent speaks when a call starts.
- **Voice ID** - Voice provider ID for text-to-speech. Determines which voice the agent uses when speaking.
- **Voicemail** - Enable voicemail detection. When enabled, the agent can detect when a call goes to voicemail. Default is false.
- **Voicemail Message** - Message to leave when voicemail is detected. Only used when Voicemail detection is enabled.
- **Background Sound** - Enable background sound during calls to make conversations feel more natural. Default is true.
- **HIPAA Compliance** - When enabled, no logs, recordings, or transcriptions will be stored. Use this for healthcare-related calls. Default is false.
- **Call Duration** - Maximum call duration in minutes. Valid range is 1-60. Default is 30 minutes.
- **Speed** - Voice speed multiplier. Valid range is 0.5-1.5. Default is 1.0 (normal speed).

---

##### Chat Agent

For chat-based agents.

**Common Fields:**
- **Name** (required) - Agent name. Must be between 1-255 characters. This is how the agent will be identified in your workspace.
- **Agent Type** (required) - Select "Chat" for text-based chat agents.
- **Workspace** (required) - The workspace where this agent will be created. Select from the dropdown.
- **Prompt** - System prompt for the agent. This defines how the agent behaves and responds during chat conversations.
- **Language** - The language the agent will communicate in. Options: english, spanish, french, german, portuguese, dutch, chinese, japanese. Default is english.
- **Is Active** - Whether the agent is active and ready to handle chat conversations. Default is true.

---

##### Widget Agent

For agents embedded on websites.

**Common Fields:**
- **Name** (required) - Agent name. Must be between 1-255 characters. This is how the agent will be identified in your workspace.
- **Agent Type** (required) - Select "Widget" for agents that will be embedded on websites.
- **Workspace** (required) - The workspace where this agent will be created. Select from the dropdown.
- **Prompt** - System prompt for the agent. This defines how the agent behaves and responds when visitors interact with the widget.
- **Language** - The language the agent will communicate in. Options: english, spanish, french, german, portuguese, dutch, chinese, japanese. Default is english.
- **Is Active** - Whether the agent is active and ready to handle widget interactions. Default is true.

---

#### Find Agent

Gets an agent and all its information.

**Step-by-step:**
1. Select Resource: **Agent**
2. Select Operation: **Find Agent**
3. Enter **Agent ID** - UUID of the agent to retrieve. You can get this ID from the Nedzo dashboard or from a previous node output.

---

#### Update Agent

Updates an existing agent's settings.

**Step-by-step:**
1. Select Resource: **Agent**
2. Select Operation: **Update Agent**
3. Enter **Agent ID** - UUID of the agent to update. You can get this ID from the Nedzo dashboard or from a previous node output.
4. Select **Agent Type** - Select the type of agent you're updating. This ensures only relevant fields are shown in the Update Fields section.
5. Click **Add Field** in Update Fields section to modify settings

**Update Fields available (based on agent type):**
- **Name** - New agent name. Must be between 1-255 characters.
- **Prompt** - Updated system prompt for the agent. This defines how the agent behaves and responds during conversations.
- **Is Active** - Whether the agent is active. Set to false to disable the agent temporarily.
- **Language** - The language the agent will communicate in. Options: english, spanish, french, german, portuguese, dutch, chinese, japanese.

**Voice-Specific Update Fields (Inbound/Outbound Voice only):**
- **Voice ID** - Voice provider ID for text-to-speech. Determines which voice the agent uses when speaking.
- **Opening Line** - The first message the agent speaks when a call starts.
- **Background Sound** - Enable or disable background sound during calls.
- **HIPAA Compliance** - Enable or disable HIPAA compliance mode. When enabled, no logs, recordings, or transcriptions will be stored.
- **Call Duration** - Maximum call duration in minutes. Valid range is 1-60.
- **Speed** - Voice speed multiplier. Valid range is 0.5-1.5.

**Outbound Voice Only:**
- **Voicemail** - Enable or disable voicemail detection.
- **Voicemail Message** - Message to leave when voicemail is detected.

---

#### Delete Agent

Deletes an agent. This is permanent and cannot be undone.

**Step-by-step:**
1. Select Resource: **Agent**
2. Select Operation: **Delete Agent**
3. Enter **Agent ID** - UUID of the agent to delete. This action cannot be undone.

---

### Contacts

#### Create/Update Contact

Creates or updates a contact in a workspace. Matches existing contacts by phone first, then email.

**Step-by-step:**
1. Select Resource: **Contact**
2. Select Operation: **Create/Update Contact**
3. Select **Workspace** - Choose from your workspaces. The dropdown loads automatically from your Nedzo account.
4. Enter **Phone** - Phone number in E.164 format (+14155551234). This is the primary matching field - if a contact with this phone exists, it will be updated.
5. Enter **Email** - Contact's email address. This is the fallback matching field if phone is not provided.
6. Click **Add Field** to add optional fields:
   - **First Name** - Contact's first name. Maximum 255 characters.
   - **Last Name** - Contact's last name. Maximum 255 characters.

You need at least a phone number or email.

---

#### Find Contact

Gets a contact and all its information.

**Step-by-step:**
1. Select Resource: **Contact**
2. Select Operation: **Find Contact**
3. Enter **Contact ID** - UUID of the contact to retrieve. You can get this ID from the Nedzo dashboard or from a previous node output.

---

#### Delete Contact

Deletes a contact in a workspace.

**Step-by-step:**
1. Select Resource: **Contact**
2. Select Operation: **Delete Contact**
3. Enter **Contact ID** - UUID of the contact to delete. This action cannot be undone.

---

### Workspaces

#### Create Workspace

Creates a new workspace in your account.

**Step-by-step:**
1. Select Resource: **Workspace**
2. Select Operation: **Create Workspace**
3. Enter **Name** - Workspace name. Must be between 1-255 characters.
4. Click **Add Field** to add optional fields:
   - **Description** - Workspace description. Maximum 1000 characters.
   - **Timezone** - IANA timezone identifier (e.g., "America/New_York", "Europe/London"). Used for scheduling and time-based features.
   - **Contact Name** - Primary contact name for this workspace.
   - **Contact Phone** - Primary contact phone number for this workspace.
   - **Contact Email** - Primary contact email address for this workspace.
   - **Street Address** - Street address for the workspace location.
   - **State** - State or province for the workspace location.
   - **ZIP** - ZIP or postal code for the workspace location.
   - **Country** - Country code or name for the workspace location.
   - **Business Registration Number** - Business registration number such as EIN, VAT, etc.

---

#### Delete Workspace

Deletes a workspace. This is permanent and cannot be undone.

**Step-by-step:**
1. Select Resource: **Workspace**
2. Select Operation: **Delete Workspace**
3. Enter **Workspace ID** - UUID of the workspace to delete. This action cannot be undone.

---

## Tips

- Phone numbers must be in E.164 format: +14155551234 (country code, no spaces or dashes)
- Use Create/Update Contact to avoid duplicates - it matches by phone first, then email
- Agent IDs and Contact IDs are UUIDs - you can get them from Find actions or previous node outputs
- Workspace dropdown automatically loads your workspaces from your account

---

## Troubleshooting

**Authentication failed**
- Check your API key is correct with no extra spaces

**Contact not created**
- Make sure you have either a phone number or email
- Check phone format is E.164

**Call not triggered**
- Verify the agent ID exists
- Check phone number is valid E.164 format

---

## Need Help?

Contact support@nedzo.ai
