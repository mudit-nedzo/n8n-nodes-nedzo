# GHL Marketplace - Complete Actions Reference

Based on actual Nedzo API source code schemas. This document contains complete field configurations for all 16 actions across 4 resources.

---

## Table of Contents

1. [Agent Actions (5 actions)](#agent-actions)
2. [Call Actions (1 action)](#call-actions)
3. [Contact Actions (5 actions)](#contact-actions)
4. [Workspace Actions (5 actions)](#workspace-actions)

---

# AGENT ACTIONS

## ACTION 1: Create Agent

### Basic Information
```
Name: Create Agent
Key: create_nedzo_agent
Description: Create a new AI voice agent in Nedzo
Summary: Creates a new AI voice agent in your Nedzo workspace. Configure the agent's name, type (Inbound Voice, Outbound Voice, Chat, or Widget), language, prompts, voice settings, and compliance options. The agent can be used immediately after creation to handle calls or chat conversations.
```

### API Configuration
```
Method: POST
URL: https://api.nedzo.ai/v1/agents

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "workspaceId": "{workspaceId}",
  "name": "{name}",
  "agentType": "{agentType}",
  "prompt": "{prompt}",
  "language": "{language}",
  "hipaaCompliance": {hipaaCompliance},
  "callDuration": {callDuration},
  "openingLine": "{openingLine}",
  "voiceId": "{voiceId}",
  "backgroundSound": {backgroundSound},
  "voicemail": {voicemail},
  "voicemailMessage": "{voicemailMessage}",
  "speed": {speed},
  "isActive": {isActive}
}
```

### Input Fields (14 fields)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: No (optional for workspace-scoped keys)
Reference: workspaceId
Default value: (empty)
Help Text: Workspace UUID where the agent will be created (required for account-scoped API keys, optional for workspace-scoped keys)
Placeholder: e.g., 789e4567-e89b-12d3-a456-426614174000
```

#### Field 2: Agent Name
```
Name: Agent Name
Type: String
Required: Yes
Reference: name
Default value: (empty)
Help Text: Name for the AI voice agent (required)
Placeholder: e.g., Customer Support Agent
Max length: 255
```

#### Field 3: Agent Type
```
Name: Agent Type
Type: Dropdown (Single Select)
Required: Yes
Reference: agentType
Default value: Inbound Voice
Help Text: Type of agent to create (required): Inbound Voice, Outbound Voice, Chat, or Widget

Dropdown Options:
- Label: Inbound Voice, Value: Inbound Voice
- Label: Outbound Voice, Value: Outbound Voice
- Label: Chat, Value: Chat
- Label: Widget, Value: Widget
```

#### Field 4: Prompt
```
Name: Prompt
Type: Text Area
Required: No
Reference: prompt
Default value: (empty)
Help Text: System prompt that defines the agent's behavior
Placeholder: e.g., You are a helpful customer service agent...
```

#### Field 5: Language
```
Name: Language
Type: Dropdown (Single Select)
Required: No
Reference: language
Default value: english
Help Text: Agent language (defaults to english)

Dropdown Options:
- Label: English, Value: english
- Label: Spanish, Value: spanish
- Label: French, Value: french
- Label: German, Value: german
- Label: Portuguese, Value: portuguese
- Label: Dutch, Value: dutch
- Label: Chinese, Value: chinese
- Label: Japanese, Value: japanese
```

#### Field 6: HIPAA Compliance
```
Name: HIPAA Compliance
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: hipaaCompliance
Default value: false
Help Text: Enable HIPAA compliance mode (Enterprise only). When enabled, no logs, recordings, or transcriptions will be stored.
```

#### Field 7: Call Duration
```
Name: Call Duration (minutes)
Type: Number
Required: No
Reference: callDuration
Default value: 30
Help Text: Maximum call duration in minutes (1-60, defaults to 30)
Placeholder: 30
Min value: 1
Max value: 60
```

#### Field 8: Opening Line
```
Name: Opening Line
Type: String
Required: No
Reference: openingLine
Default value: (empty)
Help Text: First message the agent speaks when a call starts (voice agents only)
Placeholder: e.g., Hello, how can I help you today?
```

#### Field 9: Voice ID
```
Name: Voice ID
Type: String
Required: No
Reference: voiceId
Default value: (empty)
Help Text: Voice provider ID for text-to-speech (voice agents only)
Placeholder: e.g., voice_abc123
```

#### Field 10: Background Sound
```
Name: Background Sound
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: backgroundSound
Default value: true
Help Text: Enable background sound during calls (defaults to true, voice agents only)
```

#### Field 11: Voicemail Detection
```
Name: Voicemail Detection
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: voicemail
Default value: false
Help Text: Enable voicemail detection (defaults to false, Outbound Voice only)
```

#### Field 12: Voicemail Message
```
Name: Voicemail Message
Type: String
Required: No
Reference: voicemailMessage
Default value: (empty)
Help Text: Message to leave when voicemail is detected (Outbound Voice only)
Placeholder: e.g., Please call us back at your earliest convenience.
```

#### Field 13: Voice Speed
```
Name: Voice Speed
Type: Number
Required: No
Reference: speed
Default value: 1.0
Help Text: Voice speed multiplier (0.5-1.5, defaults to 1.0, voice agents only)
Placeholder: 1.0
Min value: 0.5
Max value: 1.5
Step: 0.1
```

#### Field 14: Is Active
```
Name: Is Active
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: isActive
Default value: true
Help Text: Whether the agent is active and can receive calls (defaults to true)
```

---

## ACTION 2: Get Agent

### Basic Information
```
Name: Get Agent
Key: get_nedzo_agent
Description: Retrieve an agent by ID
Summary: Retrieves detailed information about a specific AI voice agent using its unique ID. Returns all agent configuration including name, type, settings, and metadata.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/agents/{agentId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields (1 field)

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: Agent UUID
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

**IMPORTANT:** Make sure the URL uses the `{agentId}` parameter correctly.

---

## ACTION 3: List Agents

### Basic Information
```
Name: List Agents
Key: list_nedzo_agents
Description: List all agents
Summary: Returns agents based on API key scope. Workspace API keys return agents in that workspace only. Account API keys return all agents across all workspaces. Soft-deleted agents are excluded.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/agents

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields
**NO FIELDS NEEDED** - The API determines scope automatically based on API key type.

---

## ACTION 4: Update Agent

### Basic Information
```
Name: Update Agent
Key: update_nedzo_agent
Description: Update an existing agent
Summary: Updates the configuration of an existing AI voice agent. You can modify any field except workspaceId. Only include fields you want to update. Cannot update soft-deleted agents.
```

### API Configuration
```
Method: PATCH
URL: https://api.nedzo.ai/v1/agents/{agentId}

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "name": "{name}",
  "prompt": "{prompt}",
  "voiceId": "{voiceId}",
  "isActive": {isActive},
  "backgroundSound": {backgroundSound},
  "openingLine": "{openingLine}",
  "voicemail": {voicemail},
  "voicemailMessage": "{voicemailMessage}",
  "language": "{language}",
  "hipaaCompliance": {hipaaCompliance},
  "callDuration": {callDuration},
  "speed": {speed}
}
```

### Input Fields (13 fields)

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: Agent UUID to update
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

#### Field 2: Agent Name
```
Name: Agent Name
Type: String
Required: No
Reference: name
Default value: (empty)
Help Text: New name for the agent (leave empty to keep current)
Placeholder: e.g., Updated Agent Name
Max length: 255
```

#### Field 3: Prompt
```
Name: Prompt
Type: Text Area
Required: No
Reference: prompt
Default value: (empty)
Help Text: Updated system prompt (leave empty to keep current, set to null to clear)
Placeholder: e.g., You are an expert sales assistant...
```

#### Field 4: Voice ID
```
Name: Voice ID
Type: String
Required: No
Reference: voiceId
Default value: (empty)
Help Text: Voice provider ID (leave empty to keep current, set to null to clear)
Placeholder: e.g., voice_abc123
```

#### Field 5: Is Active
```
Name: Is Active
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: isActive
Default value: (empty)
Help Text: Whether the agent is active (leave unchecked to keep current)
```

#### Field 6: Background Sound
```
Name: Background Sound
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: backgroundSound
Default value: (empty)
Help Text: Enable background sound (leave unchecked to keep current)
```

#### Field 7: Opening Line
```
Name: Opening Line
Type: String
Required: No
Reference: openingLine
Default value: (empty)
Help Text: First message when call starts (leave empty to keep current, set to null to clear)
Placeholder: e.g., Hello, how can I help you today?
```

#### Field 8: Voicemail Detection
```
Name: Voicemail Detection
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: voicemail
Default value: (empty)
Help Text: Enable voicemail detection (leave unchecked to keep current)
```

#### Field 9: Voicemail Message
```
Name: Voicemail Message
Type: String
Required: No
Reference: voicemailMessage
Default value: (empty)
Help Text: Voicemail message (leave empty to keep current, set to null to clear)
Placeholder: e.g., Please call us back...
```

#### Field 10: Language
```
Name: Language
Type: Dropdown (Single Select)
Required: No
Reference: language
Default value: (empty)
Help Text: Agent language (leave empty to keep current)

Dropdown Options:
- Label: English, Value: english
- Label: Spanish, Value: spanish
- Label: French, Value: french
- Label: German, Value: german
- Label: Portuguese, Value: portuguese
- Label: Dutch, Value: dutch
- Label: Chinese, Value: chinese
- Label: Japanese, Value: japanese
```

#### Field 11: HIPAA Compliance
```
Name: HIPAA Compliance
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: hipaaCompliance
Default value: (empty)
Help Text: Enable HIPAA compliance mode (leave unchecked to keep current)
```

#### Field 12: Call Duration
```
Name: Call Duration (minutes)
Type: Number
Required: No
Reference: callDuration
Default value: (empty)
Help Text: Maximum call duration in minutes (1-60, leave empty to keep current)
Placeholder: 30
Min value: 1
Max value: 60
```

#### Field 13: Voice Speed
```
Name: Voice Speed
Type: Number
Required: No
Reference: speed
Default value: (empty)
Help Text: Voice speed multiplier (0.5-1.5, leave empty to keep current)
Placeholder: 1.0
Min value: 0.5
Max value: 1.5
Step: 0.1
```

---

## ACTION 5: Delete Agent

### Basic Information
```
Name: Delete Agent
Key: delete_nedzo_agent
Description: Delete an agent
Summary: Soft-deletes an AI voice agent by its ID. The agent will be marked as deleted but can be recovered if needed.
```

### API Configuration
```
Method: DELETE
URL: https://api.nedzo.ai/v1/agents/{agentId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for DELETE)
```

### Input Fields (1 field)

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: Agent UUID to delete
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

---

# CALL ACTIONS

## ACTION 6: Make Call (Create Call)

### Basic Information
```
Name: Make Call
Key: make_nedzo_call
Description: Initiate an outbound call
Summary: Initiates an outbound call using a configured agent. You can call either a contact by ID or a phone number directly. When calling a phone number, you can optionally provide contact details to create or update the contact. Custom variables can be passed to personalize the conversation.
```

### API Configuration
```
Method: POST
URL: https://api.nedzo.ai/v1/call

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)

**Option 1: Call by Contact ID**
```json
{
  "agentId": "{agentId}",
  "type": "contact",
  "contactId": "{contactId}",
  "variables": {variables}
}
```

**Option 2: Call by Phone Number**
```json
{
  "agentId": "{agentId}",
  "type": "phoneNumber",
  "phoneNumber": "{phoneNumber}",
  "firstName": "{firstName}",
  "lastName": "{lastName}",
  "email": "{email}",
  "businessName": "{businessName}",
  "customFields": {customFields},
  "variables": {variables}
}
```

### Input Fields (10 fields)

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: UUID of the agent to use for the call (required)
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

#### Field 2: Call Type
```
Name: Call Type
Type: Dropdown (Single Select)
Required: Yes
Reference: type
Default value: phoneNumber
Help Text: How to identify the call recipient (required)

Dropdown Options:
- Label: Phone Number, Value: phoneNumber
- Label: Contact ID, Value: contact
```

#### Field 3: Contact ID
```
Name: Contact ID
Type: String
Required: No (required if type = contact)
Reference: contactId
Default value: (empty)
Help Text: UUID of the contact to call (required when Call Type is "Contact ID")
Placeholder: e.g., 456e4567-e89b-12d3-a456-426614174000
```

#### Field 4: Phone Number
```
Name: Phone Number
Type: String
Required: No (required if type = phoneNumber)
Reference: phoneNumber
Default value: (empty)
Help Text: Phone number to call in E.164 format (required when Call Type is "Phone Number")
Placeholder: e.g., +14155551234
Validation: Must match E.164 format (^\+[1-9]\d{1,14}$)
```

#### Field 5: First Name
```
Name: First Name
Type: String
Required: No
Reference: firstName
Default value: (empty)
Help Text: First name of the contact (optional, for phone number calls only)
Placeholder: e.g., John
Max length: 255
```

#### Field 6: Last Name
```
Name: Last Name
Type: String
Required: No
Reference: lastName
Default value: (empty)
Help Text: Last name of the contact (optional, for phone number calls only)
Placeholder: e.g., Doe
Max length: 255
```

#### Field 7: Email
```
Name: Email
Type: String
Required: No
Reference: email
Default value: (empty)
Help Text: Email address of the contact (optional, for phone number calls only)
Placeholder: e.g., john@example.com
Validation: Must be valid email format
```

#### Field 8: Business Name
```
Name: Business Name
Type: String
Required: No
Reference: businessName
Default value: (empty)
Help Text: Business/company name of the contact (optional, for phone number calls only)
Placeholder: e.g., Acme Inc
Max length: 255
```

#### Field 9: Custom Fields
```
Name: Custom Fields
Type: Text Area (for JSON object)
Required: No
Reference: customFields
Default value: (empty)
Help Text: Custom field values as JSON object. Field names must match existing custom field definitions. (optional, for phone number calls only)
Placeholder: {"Lead Source": "Website", "Industry": "Technology"}
```

#### Field 10: Variables
```
Name: Variables
Type: Text Area (for JSON object)
Required: No
Reference: variables
Default value: (empty)
Help Text: Custom variables to pass to the assistant. These override contact field values and can be used in the agent prompt.
Placeholder: {"appointmentTime": "3pm", "customerName": "John"}
```

### Response
Returns a `conversationId` (UUID) that can be used to track the call status and results.

---

# CONTACT ACTIONS

## ACTION 7: Create Contact

### Basic Information
```
Name: Create Contact
Key: create_nedzo_contact
Description: Create a new contact in Nedzo
Summary: Creates a new contact in your Nedzo workspace. All contact fields are optional. You can store first name, last name, email, and phone number.
```

### API Configuration
```
Method: POST
URL: https://api.nedzo.ai/v1/contacts

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "workspaceId": "{workspaceId}",
  "firstName": "{firstName}",
  "lastName": "{lastName}",
  "email": "{email}",
  "phone": "{phone}"
}
```

### Input Fields (5 fields)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: No (optional for workspace-scoped keys)
Reference: workspaceId
Default value: (empty)
Help Text: Workspace UUID to create contact in (required for account-scoped API keys, optional for workspace-scoped keys)
Placeholder: e.g., 789e4567-e89b-12d3-a456-426614174000
```

#### Field 2: First Name
```
Name: First Name
Type: String
Required: No
Reference: firstName
Default value: (empty)
Help Text: Contact first name
Placeholder: e.g., John
Max length: 255
```

#### Field 3: Last Name
```
Name: Last Name
Type: String
Required: No
Reference: lastName
Default value: (empty)
Help Text: Contact last name
Placeholder: e.g., Doe
Max length: 255
```

#### Field 4: Email
```
Name: Email
Type: String
Required: No
Reference: email
Default value: (empty)
Help Text: Contact email address
Placeholder: e.g., john.doe@example.com
Validation: Must be valid email format
```

#### Field 5: Phone
```
Name: Phone
Type: String
Required: No
Reference: phone
Default value: (empty)
Help Text: Contact phone number
Placeholder: e.g., +1-555-123-4567
Max length: 50
```

---

## ACTION 8: Get Contact

### Basic Information
```
Name: Get Contact
Key: get_nedzo_contact
Description: Retrieve a contact by ID
Summary: Retrieves detailed information about a specific contact using its unique ID. Returns all contact information including name, email, phone, and metadata.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/contacts/{contactId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields (1 field)

#### Field 1: Contact ID
```
Name: Contact ID
Type: String
Required: Yes
Reference: contactId
Default value: (empty)
Help Text: Contact UUID
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

---

## ACTION 9: List Contacts

### Basic Information
```
Name: List Contacts
Key: list_nedzo_contacts
Description: List all contacts
Summary: Returns contacts based on API key scope. Workspace API keys return contacts in that workspace only. Account API keys can filter by workspace ID.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/contacts?workspaceId={workspaceId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields (1 field)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: No (optional for workspace-scoped keys)
Reference: workspaceId
Default value: (empty)
Help Text: Filter contacts by workspace UUID (required for account-scoped API keys, optional for workspace-scoped keys)
Placeholder: e.g., 789e4567-e89b-12d3-a456-426614174000
```

---

## ACTION 10: Update Contact

### Basic Information
```
Name: Update Contact
Key: update_nedzo_contact
Description: Update an existing contact
Summary: Updates the information of an existing contact. All fields are optional - only include fields you want to update. At least one field must be provided.
```

### API Configuration
```
Method: PATCH
URL: https://api.nedzo.ai/v1/contacts/{contactId}

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "firstName": "{firstName}",
  "lastName": "{lastName}",
  "email": "{email}",
  "phone": "{phone}"
}
```

### Input Fields (5 fields)

#### Field 1: Contact ID
```
Name: Contact ID
Type: String
Required: Yes
Reference: contactId
Default value: (empty)
Help Text: Contact UUID to update
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

#### Field 2: First Name
```
Name: First Name
Type: String
Required: No
Reference: firstName
Default value: (empty)
Help Text: Updated first name (leave empty to keep current, set to null to clear)
Placeholder: e.g., Jane
Max length: 255
```

#### Field 3: Last Name
```
Name: Last Name
Type: String
Required: No
Reference: lastName
Default value: (empty)
Help Text: Updated last name (leave empty to keep current, set to null to clear)
Placeholder: e.g., Smith
Max length: 255
```

#### Field 4: Email
```
Name: Email
Type: String
Required: No
Reference: email
Default value: (empty)
Help Text: Updated email (leave empty to keep current, set to null to clear)
Placeholder: e.g., jane.smith@example.com
Validation: Must be valid email format
```

#### Field 5: Phone
```
Name: Phone
Type: String
Required: No
Reference: phone
Default value: (empty)
Help Text: Updated phone (leave empty to keep current, set to null to clear)
Placeholder: e.g., +1-555-987-6543
Max length: 50
```

---

## ACTION 11: Delete Contact

### Basic Information
```
Name: Delete Contact
Key: delete_nedzo_contact
Description: Delete a contact
Summary: Permanently deletes a contact by its ID. This action cannot be undone.
```

### API Configuration
```
Method: DELETE
URL: https://api.nedzo.ai/v1/contacts/{contactId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for DELETE)
```

### Input Fields (1 field)

#### Field 1: Contact ID
```
Name: Contact ID
Type: String
Required: Yes
Reference: contactId
Default value: (empty)
Help Text: Contact UUID to delete
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

---

# WORKSPACE ACTIONS

## ACTION 12: Create Workspace

### Basic Information
```
Name: Create Workspace
Key: create_nedzo_workspace
Description: Create a new workspace
Summary: Creates a new workspace in your Nedzo account. Workspace name is required. You can optionally configure timezone, contact information, address, and business details.
```

### API Configuration
```
Method: POST
URL: https://api.nedzo.ai/v1/workspaces

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "name": "{name}",
  "description": "{description}",
  "timezone": "{timezone}",
  "icon": "{icon}",
  "contactName": "{contactName}",
  "contactEmail": "{contactEmail}",
  "contactPhone": "{contactPhone}",
  "streetAddress": "{streetAddress}",
  "state": "{state}",
  "zip": "{zip}",
  "country": "{country}",
  "businessRegistrationNumber": "{businessRegistrationNumber}"
}
```

### Input Fields (12 fields)

#### Field 1: Workspace Name
```
Name: Workspace Name
Type: String
Required: Yes
Reference: name
Default value: (empty)
Help Text: Workspace name (required)
Placeholder: e.g., My New Workspace
Min length: 1
Max length: 255
```

#### Field 2: Description
```
Name: Description
Type: Text Area
Required: No
Reference: description
Default value: (empty)
Help Text: Optional workspace description
Placeholder: e.g., Workspace for Q1 campaigns
Max length: 1000
```

#### Field 3: Timezone
```
Name: Timezone
Type: String
Required: No
Reference: timezone
Default value: UTC
Help Text: Workspace timezone in IANA format (defaults to UTC)
Placeholder: e.g., America/Los_Angeles
Validation: Must be valid IANA timezone
```

#### Field 4: Icon
```
Name: Icon
Type: String
Required: No
Reference: icon
Default value: (empty)
Help Text: Workspace icon URL or identifier
Placeholder: e.g., https://example.com/icon.png
```

#### Field 5: Contact Name
```
Name: Contact Name
Type: String
Required: No
Reference: contactName
Default value: (empty)
Help Text: Contact name for workspace
Placeholder: e.g., John Doe
```

#### Field 6: Contact Email
```
Name: Contact Email
Type: String
Required: No
Reference: contactEmail
Default value: (empty)
Help Text: Contact email for workspace
Placeholder: e.g., admin@example.com
Validation: Must be valid email format
```

#### Field 7: Contact Phone
```
Name: Contact Phone
Type: String
Required: No
Reference: contactPhone
Default value: (empty)
Help Text: Contact phone for workspace
Placeholder: e.g., +1987654321
```

#### Field 8: Street Address
```
Name: Street Address
Type: String
Required: No
Reference: streetAddress
Default value: (empty)
Help Text: Street address for workspace
Placeholder: e.g., 123 Main St
```

#### Field 9: State
```
Name: State
Type: String
Required: No
Reference: state
Default value: (empty)
Help Text: State/province for workspace
Placeholder: e.g., NY
```

#### Field 10: ZIP Code
```
Name: ZIP Code
Type: String
Required: No
Reference: zip
Default value: (empty)
Help Text: ZIP/postal code for workspace
Placeholder: e.g., 10001
```

#### Field 11: Country
```
Name: Country
Type: String
Required: No
Reference: country
Default value: (empty)
Help Text: Country for workspace
Placeholder: e.g., US
```

#### Field 12: Business Registration Number
```
Name: Business Registration Number
Type: String
Required: No
Reference: businessRegistrationNumber
Default value: (empty)
Help Text: Business registration number (EIN, VAT, etc.)
Placeholder: e.g., 12-3456789
```

---

## ACTION 13: Get Workspace

### Basic Information
```
Name: Get Workspace
Key: get_nedzo_workspace
Description: Retrieve a workspace by ID
Summary: Retrieves detailed information about a specific workspace using its unique ID. Returns all workspace configuration including name, timezone, contact information, and metadata.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/workspaces/{workspaceId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields (1 field)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes
Reference: workspaceId
Default value: (empty)
Help Text: Workspace UUID
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

---

## ACTION 14: List Workspaces

### Basic Information
```
Name: List Workspaces
Key: list_nedzo_workspaces
Description: List all workspaces
Summary: Returns all workspaces in your Nedzo account. Available only for account-scoped API keys.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/workspaces

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for GET)
```

### Input Fields
**NO FIELDS NEEDED** - Returns all workspaces for the authenticated account.

---

## ACTION 15: Update Workspace

### Basic Information
```
Name: Update Workspace
Key: update_nedzo_workspace
Description: Update an existing workspace
Summary: Updates the configuration of an existing workspace. All fields are optional - only include fields you want to update. At least one field must be provided.
```

### API Configuration
```
Method: PATCH
URL: https://api.nedzo.ai/v1/workspaces/{workspaceId}

Headers:
- Content-Type: application/json
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body (Custom JSON)
```json
{
  "name": "{name}",
  "description": "{description}",
  "timezone": "{timezone}",
  "icon": "{icon}",
  "contactName": "{contactName}",
  "contactEmail": "{contactEmail}",
  "contactPhone": "{contactPhone}",
  "streetAddress": "{streetAddress}",
  "state": "{state}",
  "zip": "{zip}",
  "country": "{country}",
  "businessRegistrationNumber": "{businessRegistrationNumber}"
}
```

### Input Fields (13 fields)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes
Reference: workspaceId
Default value: (empty)
Help Text: Workspace UUID to update
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

#### Field 2: Workspace Name
```
Name: Workspace Name
Type: String
Required: No
Reference: name
Default value: (empty)
Help Text: Updated workspace name (leave empty to keep current)
Placeholder: e.g., Updated Workspace Name
Min length: 1
Max length: 255
```

#### Field 3: Description
```
Name: Description
Type: Text Area
Required: No
Reference: description
Default value: (empty)
Help Text: Updated description (leave empty to keep current, set to null to clear)
Placeholder: e.g., Updated description
Max length: 1000
```

#### Field 4: Timezone
```
Name: Timezone
Type: String
Required: No
Reference: timezone
Default value: (empty)
Help Text: Updated timezone in IANA format (leave empty to keep current)
Placeholder: e.g., Europe/London
Validation: Must be valid IANA timezone
```

#### Field 5: Icon
```
Name: Icon
Type: String
Required: No
Reference: icon
Default value: (empty)
Help Text: Updated icon URL (leave empty to keep current, set to null to clear)
Placeholder: e.g., https://example.com/icon.png
```

#### Field 6: Contact Name
```
Name: Contact Name
Type: String
Required: No
Reference: contactName
Default value: (empty)
Help Text: Updated contact name (leave empty to keep current, set to null to clear)
Placeholder: e.g., John Doe
```

#### Field 7: Contact Email
```
Name: Contact Email
Type: String
Required: No
Reference: contactEmail
Default value: (empty)
Help Text: Updated contact email (leave empty to keep current, set to null to clear)
Placeholder: e.g., newemail@example.com
Validation: Must be valid email format
```

#### Field 8: Contact Phone
```
Name: Contact Phone
Type: String
Required: No
Reference: contactPhone
Default value: (empty)
Help Text: Updated contact phone (leave empty to keep current, set to null to clear)
Placeholder: e.g., +44123456789
```

#### Field 9: Street Address
```
Name: Street Address
Type: String
Required: No
Reference: streetAddress
Default value: (empty)
Help Text: Updated street address (leave empty to keep current, set to null to clear)
Placeholder: e.g., 123 Main St
```

#### Field 10: State
```
Name: State
Type: String
Required: No
Reference: state
Default value: (empty)
Help Text: Updated state/province (leave empty to keep current, set to null to clear)
Placeholder: e.g., NY
```

#### Field 11: ZIP Code
```
Name: ZIP Code
Type: String
Required: No
Reference: zip
Default value: (empty)
Help Text: Updated ZIP/postal code (leave empty to keep current, set to null to clear)
Placeholder: e.g., 10001
```

#### Field 12: Country
```
Name: Country
Type: String
Required: No
Reference: country
Default value: (empty)
Help Text: Updated country (leave empty to keep current, set to null to clear)
Placeholder: e.g., US
```

#### Field 13: Business Registration Number
```
Name: Business Registration Number
Type: String
Required: No
Reference: businessRegistrationNumber
Default value: (empty)
Help Text: Updated business registration number (leave empty to keep current, set to null to clear)
Placeholder: e.g., 12-3456789
```

---

## ACTION 16: Delete Workspace

### Basic Information
```
Name: Delete Workspace
Key: delete_nedzo_workspace
Description: Delete a workspace
Summary: Permanently deletes a workspace by its ID. This action cannot be undone. All agents, contacts, and data in this workspace will be deleted.
```

### API Configuration
```
Method: DELETE
URL: https://api.nedzo.ai/v1/workspaces/{workspaceId}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body for DELETE)
```

### Input Fields (1 field)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes
Reference: workspaceId
Default value: (empty)
Help Text: Workspace UUID to delete
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

---

## Summary Tables

### All Actions Overview

| # | Action Name | Resource | Method | Endpoint | Fields |
|---|-------------|----------|--------|----------|--------|
| 1 | Create Agent | Agent | POST | /v1/agents | 14 |
| 2 | Get Agent | Agent | GET | /v1/agents/{agentId} | 1 |
| 3 | List Agents | Agent | GET | /v1/agents | 0 |
| 4 | Update Agent | Agent | PATCH | /v1/agents/{agentId} | 13 |
| 5 | Delete Agent | Agent | DELETE | /v1/agents/{agentId} | 1 |
| 6 | Make Call | Call | POST | /v1/call | 10 |
| 7 | Create Contact | Contact | POST | /v1/contacts | 5 |
| 8 | Get Contact | Contact | GET | /v1/contacts/{contactId} | 1 |
| 9 | List Contacts | Contact | GET | /v1/contacts | 1 |
| 10 | Update Contact | Contact | PATCH | /v1/contacts/{contactId} | 5 |
| 11 | Delete Contact | Contact | DELETE | /v1/contacts/{contactId} | 1 |
| 12 | Create Workspace | Workspace | POST | /v1/workspaces | 12 |
| 13 | Get Workspace | Workspace | GET | /v1/workspaces/{workspaceId} | 1 |
| 14 | List Workspaces | Workspace | GET | /v1/workspaces | 0 |
| 15 | Update Workspace | Workspace | PATCH | /v1/workspaces/{workspaceId} | 13 |
| 16 | Delete Workspace | Workspace | DELETE | /v1/workspaces/{workspaceId} | 1 |

### Field Count by Action Type

| Operation | Agent | Call | Contact | Workspace |
|-----------|-------|------|---------|-----------|
| Create | 14 | 10 | 5 | 12 |
| Get | 1 | - | 1 | 1 |
| List | 0 | - | 1 | 0 |
| Update | 13 | - | 5 | 13 |
| Delete | 1 | - | 1 | 1 |

---

## Important Notes

1. **Variable Syntax**: GHL uses single curly braces `{variableName}` for string variables
2. **Boolean/Number Values**: In JSON body, don't quote boolean/number variables: `{hipaaCompliance}` not `"{hipaaCompliance}"`
3. **String Values**: In JSON body, quote string variables: `"{name}"`
4. **Optional Fields**: For update operations, only include fields you want to change
5. **URL Parameters**: For GET requests with query params, include them in the URL: `?workspaceId={workspaceId}`
6. **Path Parameters**: For routes with `{id}`, use the exact variable name from your field reference
7. **Content-Type Header**: Always include `Content-Type: application/json` for POST/PATCH requests
8. **Authentication**: Authorization header is auto-added by OAuth - don't add it manually

---

## Testing Checklist

For each action you create:
- [ ] All fields added with correct types
- [ ] Required vs optional fields marked correctly
- [ ] Default values set appropriately
- [ ] Help text and placeholders added
- [ ] URL configured correctly with path/query params
- [ ] Request body JSON is valid
- [ ] Boolean/number values not quoted in JSON
- [ ] String values quoted in JSON
- [ ] Content-Type header added for POST/PATCH
- [ ] Test with valid data
- [ ] Verify response structure
- [ ] Check error handling

---

**Document Version:** 1.0
**Based on:** Nedzo API source code (schemas.ts files)
**Date:** 2026-01-09
