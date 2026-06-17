export default {
  /**
   * Modern Cloudflare Worker (ES Module) that proxies POST /api/chat requests.
   * Access environment variables/secrets via the 'env' parameter.
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only handle POST requests to /api/chat
    if (request.method === 'POST' && url.pathname === '/api/chat') {
      // Access the backend URL from your environment/secrets
      const backendUrl = env.CLOUD_BACKEND_URL;

      if (!backendUrl) {
        return new Response(JSON.stringify({
          error: 'CLOUD_BACKEND_URL not configured. Please add it via wrangler secrets or your dashboard.'
        }), { 
          status: 501, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }

      const forwardUrl = new URL('/api/chat', backendUrl).toString();
      
      try {
        const res = await fetch(forwardUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: await request.text(),
        });

        // Return the response directly to preserve streaming and headers
        return new Response(res.body, { 
          status: res.status, 
          headers: res.headers 
        });
      } catch (err) {
        return new Response(JSON.stringify({ 
          error: 'Proxy error', 
          detail: String(err) 
        }), { 
          status: 502, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    }

    return new Response('Not found', { status: 404 });
  }
};
