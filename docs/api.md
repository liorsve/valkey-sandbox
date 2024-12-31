# API Documentation

## WebSocket Events

### Code Execution

Execute code in a sandboxed environment.

**Request:**

```json
{
  "event": "execute",
  "data": {
    "language": "python|javascript",
    "code": "string",
    "mode": "standalone|cluster"
  }
}
```

**Response:**

```json
{
  "event": "execute",
  "data": {
    "success": true,
    "output": "string",
    "error": "string|null",
    "executionTime": "number",
    "memoryUsed": "number"
  }
}
```

### Get Templates

Get available code templates.

**Request:**

```json
{
  "event": "getTemplates"
}
```

**Response:**

```json
{
  "event": "getTemplates",
  "data": {
    "success": true,
    "templates": [
      {
        "id": "string",
        "name": "string",
        "language": "string",
        "code": "string",
        "description": "string"
      }
    ]
  }
}
```

## Error Handling

**Error Response Format:**

```json
{
  "event": "error",
  "data": {
    "success": false,
    "error": {
      "code": "string",
      "message": "string",
      "details": "object|null"
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Invalid request parameters
- `EXECUTION_ERROR`: Code execution failed
- `SECURITY_ERROR`: Security violation detected
- `TIMEOUT_ERROR`: Execution timeout
- `INTERNAL_ERROR`: Server error
