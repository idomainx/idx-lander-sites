export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let p = url.pathname || '/';
    if (p !== '/' && !p.endsWith('/') && !/\.[a-zA-Z0-9]+$/.test(p)) p += '/';
    const target = new URL('/sites/' + host + p, url);
    let res = await env.ASSETS.fetch(target.toString());
    if (res.status === 404) {
      const nf = await env.ASSETS.fetch(new URL('/404.html', url).toString());
      return new Response(nf.body, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    return res;
  }
};