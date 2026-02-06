# GHL Marketplace - Agent Actions Reference (CORRECTED)

Complete configuration reference based on actual Nedzo API source code.

---

## IMPORTANT CHANGES FROM PREVIOUS VERSION:

1. ❌ **REMOVED `voiceConfig`** - doesn't exist in API
2. ✅ **ADDED `speed`** field - voice speed multiplier (0.5-1.5)
3. ✅ **ADDED `isActive`** field - whether agent can receive calls
4. ✅ **UPDATED List Agents** - no workspaceId or includeDeleted params needed
5. ✅ **All fields verified** against actual API schema

---

## ACTION 1: Create Agent ⚠️ NEEDS UPDATES

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

### Request Body (Custom JSON) - CORRECTED
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

### Input Fields - CORRECTED (14 fields, not 12)

#### Field 1: Workspace ID
```
Name: Workspace ID
Type: String
Required: Yes (for account-scoped keys)
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
```

#### Field 3: Agent Type
```
Name: Agent Type
Type: Dropdown (Single Select)
Required: Yes
Reference: agentType
Default value: Inbound Voice
Help Text: Type of agent to create (required): Inbound Voice, Outbound Voice, Chat, or Widget
Additional preferences: Check "Alters Dynamic Field"

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
Additional preferences: Check "Alters Dynamic Field"
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

#### ⭐ Field 13: Speed (NEW - YOU NEED TO ADD THIS)
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

#### ⭐ Field 14: Is Active (NEW - YOU NEED TO ADD THIS)
```
Name: Is Active
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: isActive
Default value: true
Help Text: Whether the agent is active and can receive calls (defaults to true)
```

---

## ACTION 2: Get Agent ✅ CORRECT

### Basic Information
```
Name: Get Agent
Key: get_nedzo_agent
Description: Retrieve an agent by ID
Summary: Retrieves detailed information about a specific AI voice agent using its unique ID. Returns all agent configuration including name, type, settings, and metadata. Returns the agent even if soft-deleted.
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

### Input Fields

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

### URL Configuration
Use the agentId parameter in the URL: `https://api.nedzo.ai/v1/agents/{agentId}`

---

## ACTION 3: List Agents ⚠️ CHANGED

### Basic Information
```
Name: List Agents
Key: list_nedzo_agents
Description: List all agents
Summary: Returns agents based on API key scope. Workspace API keys return agents in that workspace only. Account API keys return all agents across all workspaces, grouped by workspace. Soft-deleted agents are always excluded.
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

### Important Note
The API automatically:
- Returns workspace agents if using workspace-scoped key
- Returns all agents grouped by workspace if using account-scoped key
- Excludes soft-deleted agents always

---

## ACTION 4: Update Agent ⚠️ NEEDS UPDATES

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

### Request Body (Custom JSON) - CORRECTED
```json
{
  "name": "{name}",
  "prompt": "{prompt}",
  "language": "{language}",
  "voiceId": "{voiceId}",
  "isActive": {isActive},
  "backgroundSound": {backgroundSound},
  "openingLine": "{openingLine}",
  "voicemail": {voicemail},
  "voicemailMessage": "{voicemailMessage}",
  "hipaaCompliance": {hipaaCompliance},
  "callDuration": {callDuration},
  "speed": {speed}
}
```

### Input Fields - CORRECTED

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

#### Field 2: Agent Name
```
Name: Agent Name
Type: String
Required: No
Reference: name
Default value: (empty)
Help Text: Agent name (leave empty to keep current)
Placeholder: e.g., Updated Agent Name
```

#### Field 3: Prompt
```
Name: Prompt
Type: Text Area
Required: No
Reference: prompt
Default value: (empty)
Help Text: System prompt (leave empty to keep current, can be set to null)
Placeholder: e.g., Updated system prompt...
```

#### Field 4: Language
```
Name: Language
Type: Dropdown (Single Select)
Required: No
Reference: language
Default value: (empty)
Help Text: Agent language (leave empty to keep current, can be set to null)

Dropdown Options (same as Create):
- Label: English, Value: english
- Label: Spanish, Value: spanish
- Label: French, Value: french
- Label: German, Value: german
- Label: Portuguese, Value: portuguese
- Label: Dutch, Value: dutch
- Label: Chinese, Value: chinese
- Label: Japanese, Value: japanese
```

#### Field 5: Voice ID
```
Name: Voice ID
Type: String
Required: No
Reference: voiceId
Default value: (empty)
Help Text: Voice provider ID for text-to-speech (leave empty to keep current, can be set to null)
Placeholder: e.g., voice_abc123
```

#### Field 6: Is Active
```
Name: Is Active
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: isActive
Default value: (empty)
Help Text: Whether the agent is active and can receive calls (leave empty to keep current)
```

#### Field 7: Background Sound
```
Name: Background Sound
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: backgroundSound
Default value: (empty)
Help Text: Enable background sound during calls (leave empty to keep current)
```

#### Field 8: Opening Line
```
Name: Opening Line
Type: String
Required: No
Reference: openingLine
Default value: (empty)
Help Text: First message the agent speaks when a call starts (leave empty to keep current, can be set to null)
Placeholder: e.g., Hello, how can I help you today?
```

#### Field 9: Voicemail Detection
```
Name: Voicemail Detection
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: voicemail
Default value: (empty)
Help Text: Enable voicemail detection (leave empty to keep current)
```

#### Field 10: Voicemail Message
```
Name: Voicemail Message
Type: String
Required: No
Reference: voicemailMessage
Default value: (empty)
Help Text: Message to leave when voicemail is detected (leave empty to keep current, can be set to null)
Placeholder: e.g., Please call us back...
```

#### Field 11: HIPAA Compliance
```
Name: HIPAA Compliance
Type: Boolean (Checkbox/Toggle)
Required: No
Reference: hipaaCompliance
Default value: (empty)
Help Text: Enable HIPAA compliance mode (leave empty to keep current)
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

#### Field 13: Speed
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

## ACTION 5: Delete Agent ✅ CORRECT

### Basic Information
```
Name: Delete Agent
Key: delete_nedzo_agent
Description: Delete an agent (soft delete)
Summary: Soft-deletes an agent by setting deletedAt timestamp. The agent is NOT permanently removed from the database. Returns 204 even if already soft-deleted (idempotent).
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

### Input Fields

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

### Response Note
API returns HTTP 204 No Content (empty response). GHL might need custom response mapping.

---

## Summary of Changes

| Action | Status | Changes Needed |
|--------|--------|----------------|
| Create Agent | ⚠️ UPDATE | Add `speed` and `isActive` fields |
| Get Agent | ✅ OK | No changes |
| List Agents | ⚠️ UPDATE | Remove all fields - no params needed |
| Update Agent | ⚠️ UPDATE | Remove `voiceConfig`, add `speed`, `isActive`, individual voice fields |
| Delete Agent | ✅ OK | No changes |

---

## Action Required

### For "Create Agent" (already created):
1. Add Field 13: Speed
2. Add Field 14: Is Active
3. Update the JSON body to include these fields

### For "List Agents" (not yet created):
- Create with ZERO input fields
- Just the action with GET request to `/v1/agents`

### For "Update Agent" (not yet created):
- Use the corrected field list above
- Do NOT include `voiceConfig`
- Include all individual fields instead

---

## Testing Checklist

After corrections:
- [ ] Test Create Agent with new speed and isActive fields
- [ ] Test List Agents without any parameters
- [ ] Verify Update Agent works without voiceConfig
- [ ] Confirm all field types match API schema
