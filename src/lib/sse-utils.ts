// Simple in-memory broadcaster (per server instance)
const clients = new Set<WritableStreamDefaultWriter<string>>();

// Add client to the set
export function addClient(writer: WritableStreamDefaultWriter<string>) {
  clients.add(writer);
}

// Remove client from the set
export function removeClient(writer: WritableStreamDefaultWriter<string>) {
  clients.delete(writer);
}

// Util for other routes to emit event
export function emitOrderCreated(payload: any) {
  const data = typeof payload === "string" ? payload : JSON.stringify(payload);
  const encoder = new TextEncoder();
  clients.forEach(async (w) => {
    try {
      await w.write(encoder.encode(`event: order\ndata: ${data}\n\n`) as any);
    } catch {}
  });
}