# GHL Marketplace - Agent Actions Reference

Complete configuration reference for all Agent actions in the Unibox Agent GHL integration.

---

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
  "voicemailMessage": "{voicemailMessage}"
}
```

### Input Fields

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes
Reference: workspaceId
Default value: (empty)
Help Text: Enter the workspace UUID where the agent will be created
Placeholder: e.g., 550e8400-e29b-41d4-a716-446655440000
```

#### Field 2: Agent Name
```
Name: Agent Name
Type: String
Required: Yes
Reference: name
Default value: (empty)
Help Text: Name for the AI voice agent
Placeholder: e.g., Customer Support Agent
```

#### Field 3: Agent Type
```
Name: Agent Type
Type: Dropdown (Single Select)
Required: Yes
Reference: agentType
Default value: Inbound Voice
Help Text: Select the type of agent to create
Additional preferences: Check "Alters Dynamic Field" (controls visibility of voice-specific fields)

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
Help Text: System prompt that defines the agent's behavior and personality
Placeholder: e.g., You are a helpful customer service agent...
```

#### Field 5: Language
```
Name: Language
Type: Dropdown (Single Select)
Required: No
Reference: language
Default value: english
Help Text: Language the agent will speak and understand

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
Help Text: Enable HIPAA compliance mode (no logs, recordings, or transcriptions will be stored)
```

#### Field 7: Call Duration
```
Name: Call Duration (minutes)
Type: Number
Required: No
Reference: callDuration
Default value: 30
Help Text: Maximum call duration in minutes (1-60)
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
Help Text: First message the agent says when the call starts (voice agents only)
Placeholder: e.g., Hello! How can I help you today?
```

#### Field 9: Voice ID
```
Name: Voice ID
Type: String
Required: No
Reference: voiceId
Default value: (empty)
Help Text: Voice ID for text-to-speech (voice agents only)
Placeholder: e.g., elevenlabs-voice-id
```

#### Field 10: Background Sound
```
Name: Background Sound
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: backgroundSound
Default value: true
Help Text: Enable background sound during calls (voice agents only)
```

#### Field 11: Voicemail Detection
```
Name: Voicemail Detection
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: voicemail
Default value: false
Help Text: Detect and handle voicemail (Outbound Voice agents only)
Additional preferences: Check "Alters Dynamic Field" (controls voicemailMessage field visibility)
```

#### Field 12: Voicemail Message
```
Name: Voicemail Message
Type: String
Required: No
Reference: voicemailMessage
Default value: (empty)
Help Text: Message to leave on voicemail (Outbound Voice agents only)
Placeholder: e.g., This is a message from Company X...
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
Body: Default (no custom body needed for GET request)
```

### Input Fields

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: The unique UUID of the agent to retrieve
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

### URL Configuration Note
Make sure the URL uses the agentId parameter: `https://api.nedzo.ai/v1/agents/{agentId}`

---

## ACTION 3: List Agents

### Basic Information
```
Name: List Agents
Key: list_nedzo_agents
Description: Get all agents in a workspace
Summary: Retrieves a list of all AI voice agents within a specified workspace. Optionally include soft-deleted agents in the results.
```

### API Configuration
```
Method: GET
URL: https://api.nedzo.ai/v1/agents?workspaceId={workspaceId}&includeDeleted={includeDeleted}

Headers:
- Authorization: Bearer {access_token} (auto-added by OAuth)
```

### Request Body
```
Body: Default (no custom body needed for GET request)
```

### Input Fields

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes
Reference: workspaceId
Default value: (empty)
Help Text: The workspace UUID to list agents from
Placeholder: e.g., 550e8400-e29b-41d4-a716-446655440000
```

#### Field 2: Include Deleted
```
Name: Include Deleted
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: includeDeleted
Default value: false
Help Text: Whether to include soft-deleted agents in the results
```

### URL Configuration Note
The URL should include query parameters. Make sure both parameters are in the URL string.

---

## ACTION 4: Update Agent

### Basic Information
```
Name: Update Agent
Key: update_nedzo_agent
Description: Update an existing agent
Summary: Updates the configuration of an existing AI voice agent. You can modify the agent's name, prompt, language, voice settings, HIPAA compliance, and call duration. Only include fields you want to update.
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
  "language": "{language}",
  "voiceConfig": {voiceConfig},
  "hipaaCompliance": {hipaaCompliance},
  "callDuration": {callDuration}
}
```

### Input Fields

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: The unique UUID of the agent to update
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

#### Field 2: Agent Name
```
Name: Agent Name
Type: String
Required: No
Reference: name
Default value: (empty)
Help Text: New name for the agent (leave empty to keep current name)
Placeholder: e.g., Updated Agent Name
```

#### Field 3: Prompt
```
Name: Prompt
Type: Text Area
Required: No
Reference: prompt
Default value: (empty)
Help Text: Updated system prompt for the agent (leave empty to keep current prompt)
Placeholder: e.g., You are an expert sales assistant...
```

#### Field 4: Language
```
Name: Language
Type: Dropdown (Single Select)
Required: No
Reference: language
Default value: (empty)
Help Text: Updated language for the agent (leave empty to keep current language)

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

#### Field 5: Voice Config
```
Name: Voice Configuration
Type: Text Area (for JSON)
Required: No
Reference: voiceConfig
Default value: (empty)
Help Text: Voice configuration settings as JSON object (leave empty to keep current settings)
Placeholder: {"voiceId": "voice_123", "speed": 1.0}
```

#### Field 6: HIPAA Compliance
```
Name: HIPAA Compliance
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: hipaaCompliance
Default value: (empty/unchecked)
Help Text: Enable or disable HIPAA compliance mode (leave unchecked to keep current setting)
```

#### Field 7: Call Duration
```
Name: Call Duration (minutes)
Type: Number
Required: No
Reference: callDuration
Default value: (empty)
Help Text: Maximum call duration in minutes, 1-60 (leave empty to keep current duration)
Placeholder: 30
Min value: 1
Max value: 60
```

### URL Configuration Note
Make sure the URL uses the agentId parameter: `https://api.nedzo.ai/v1/agents/{agentId}`

---

## ACTION 5: Delete Agent

### Basic Information
```
Name: Delete Agent
Key: delete_nedzo_agent
Description: Delete an agent
Summary: Permanently deletes an AI voice agent by its ID. This action cannot be undone. The agent will be soft-deleted and can be recovered if needed.
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
Body: Default (no custom body needed for DELETE request)
```

### Input Fields

#### Field 1: Agent ID
```
Name: Agent ID
Type: String
Required: Yes
Reference: agentId
Default value: (empty)
Help Text: The unique UUID of the agent to delete
Placeholder: e.g., 123e4567-e89b-12d3-a456-426614174000
```

### URL Configuration Note
Make sure the URL uses the agentId parameter: `https://api.nedzo.ai/v1/agents/{agentId}`

### Response Mapping
The API may return an empty response or a success message. You can map a custom response like:
```json
{
  "success": true,
  "deleted": true,
  "agentId": "{agentId}"
}
```

---

## Summary Table

| Action | Method | Endpoint | Fields | Body Type |
|--------|--------|----------|--------|-----------|
| Create Agent | POST | /v1/agents | 12 | Custom JSON |
| Get Agent | GET | /v1/agents/{agentId} | 1 | Default |
| List Agents | GET | /v1/agents?workspaceId={workspaceId}&includeDeleted={includeDeleted} | 2 | Default |
| Update Agent | PATCH | /v1/agents/{agentId} | 7 | Custom JSON |
| Delete Agent | DELETE | /v1/agents/{agentId} | 1 | Default |

---

## Notes

1. **Variable Syntax**: GHL uses single curly braces `{variableName}` for variables
2. **Boolean/Number Values**: In JSON, don't quote boolean and number variables: `{hipaaCompliance}` not `"{hipaaCompliance}"`
3. **String Values**: In JSON, quote string variables: `"{name}"`
4. **Optional Fields**: For update operations, only include fields you want to change
5. **URL Parameters**: For GET requests with query params, include them directly in the URL
6. **Path Parameters**: For routes with {id}, make sure to use the correct variable name from your fields

---

## Testing Checklist

After creating each action:
- [ ] Test with valid data
- [ ] Verify response structure
- [ ] Check error handling
- [ ] Confirm authentication works
- [ ] Validate all field mappings
