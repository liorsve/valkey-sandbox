import { WS_READY_STATES } from "../constants.js";

export const sendToWebSocket = (ws, action, data) => {
  if (ws?.readyState === WS_READY_STATES.OPEN) {
    ws.send(JSON.stringify({ action, data }));
    console.log(`[WebSocket] Sent ${action} to client`);
    return true;
  }
  return false;
};
