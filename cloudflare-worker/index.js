addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Simple Cloudflare Worker that proxies POST /api/chat requests to an existing
 * backend (set BACKEND_URL as a secret) or returns an actionable error.
 *
 * This keeps your API key off the repo: store it as a Cloudflare Worker secret
 * if you implement direct calls here.
 */
async function handleRequest(request) {
  const url = new URL(request.url)

  if (request.method === 'POST' && url.pathname === '/api/chat') {
    // Prefer a BACKEND_URL env var that points to your AI backend (e.g., Cloud Run)
    const backendUrl = CLOUD_BACKEND_URL || null

    if (!backendUrl) {
      return new Response(JSON.stringify({
        error: 'BACKEND_URL not configured. Set the BACKEND_URL secret to point to your ai backend.'
      }), { status: 501, headers: { 'Content-Type': 'application/json' } })
    }

    // Forward the request body to the backend
    const forwardUrl = new URL('/api/chat', backendUrl).toString()
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
    }

    try {
      const res = await fetch(forwardUrl, init)
      const text = await res.text()
      return new Response(text, { status: res.status, headers: res.headers })
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error', detail: String(err) }), { status: 502, headers: { 'Content-Type': 'application/json' } })
    }
  }

  return new Response('Not found', { status: 404 })
}

// Allow Wrangler to inject secrets as globals by using placeholders that will
// be replaced at deploy time.
const CLOUD_BACKEND_URL = typeof __CLOUD_BACKEND_URL__ !== 'undefined' ? __CLOUD_BACKEND_URL__ : undefined
