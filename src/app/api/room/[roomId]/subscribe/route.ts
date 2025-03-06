import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  var { readable, writable } = new TransformStream();
  var writer = writable.getWriter();
  var encoder = new TextEncoder();

  var sendEvent = (data: unknown) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  }

  var count = 0;
  var interval = setInterval(() => {
    if (count >= 30) {
      clearInterval(interval);
      writer.close();
      return;
    }

    sendEvent({ ping: `pong ${count++}` });
  }, 5000);

  req.signal.addEventListener('abort', () => {
    clearInterval(interval);
    writer.close();
  });

  return new Response(readable, {
    headers: {
      'Content-Encoding': 'none',
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
