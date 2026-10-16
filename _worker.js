export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let p = url.pathname;
    if (p === '/' || p === '') p = '/index.html';
    else if (!p.includes('.')) p = p.replace(/\/$/, '') + '/index.html';
    const target = new URL('/sites/' + host + p, url);
    let res = await env.ASSETS.fetch(new Request(target, request));
    if (res.status === 404) {
      res = await env.ASSETS.fetch(new Request(new URL('/404.html', url), request));
      return new Response(res.body, { status: 404, headers: res.headers });
    }
    return res;
  }
};