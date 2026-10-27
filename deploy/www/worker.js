// Sends www.hamzahap.dev/anything to hamzahap.dev/anything, query string included.
// (The #fragment never reaches a server; browsers carry it across the redirect.)
export default {
  fetch(request) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.hostname = 'hamzahap.dev'
    return Response.redirect(url.toString(), 301)
  },
}
