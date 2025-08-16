import { NextRequest } from "next/server";

// Simple in-memory broadcaster (per server instance)
const clients = new Set<WritableStreamDefaultWriter<string>>();

export async function GET(_req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  clients.add(writer);
  const encoder = new TextEncoder();

  // Send initial ping
  await writer.write(encoder.encode(`event: ping\ndata: ok\n\n`));

  const interval = setInterval(() => {
    writer.write(encoder.encode(`event: ping\ndata: ok\n\n`)).catch(() => {});
  }, 30000);

  const response = new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });

  // Cleanup when client disconnects
  response.headers.set("X-Accel-Buffering", "no");
  // Note: no direct close hook, rely on GC and interval clears below
  (response as any).finally?.(() => {
    clearInterval(interval);
    writer.close().catch(() => {});
    clients.delete(writer);
  });

  return response;
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
