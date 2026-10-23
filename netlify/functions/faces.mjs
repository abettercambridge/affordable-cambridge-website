// Faces for the "Pushed out" graphic on the homepage.
// Lists photos people uploaded through the story form (stories.html) so the graphic fills itself in.
//   GET /.netlify/functions/faces          -> { faces: ["/.netlify/functions/faces?id=...", ...] }, newest last
//   GET /.netlify/functions/faces?id=XYZ   -> redirects to that submission's photo (Netlify's file links expire, so we fetch a fresh one)
// Setup in Netlify: Site configuration > Environment variables
//   NETLIFY_API_TOKEN  a personal access token (User settings > Applications) from someone on the site's team
//   HIDE_FACES         optional, comma-separated submission ids to keep off the graphic
// Without the token the function returns no faces and the graphic shows only the photos in images/faces/.
const API = 'https://api.netlify.com/api/v1';

export default async (req, context) => {
  const token = process.env.NETLIFY_API_TOKEN;
  const site = process.env.SITE_ID || context?.site?.id;
  const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' } });
  if (!token || !site) return json({ faces: [] });
  const get = async (path) => {
    const r = await fetch(API + path, { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) throw new Error(path + ' ' + r.status);
    return r.json();
  };
  const hidden = new Set((process.env.HIDE_FACES || '').split(',').map((s) => s.trim()).filter(Boolean));
  const photoUrl = (sub) => {
    const p = sub && sub.data && sub.data.photo;
    return p && typeof p === 'object' ? p.url : typeof p === 'string' && /^https?:/.test(p) ? p : '';
  };
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (id) {
      if (hidden.has(id) || !/^[a-f0-9]+$/i.test(id)) return new Response('Not found', { status: 404 });
      const url = photoUrl(await get('/submissions/' + id));
      if (!url) return new Response('Not found', { status: 404 });
      return new Response(null, { status: 302, headers: { location: url, 'cache-control': 'public, max-age=600' } });
    }
    const forms = await get('/sites/' + site + '/forms');
    const form = forms.find((f) => f.name === 'story');
    if (!form) return json({ faces: [] });
    const subs = [];
    for (let page = 1; page <= 5; page++) {
      const batch = await get('/forms/' + form.id + '/submissions?per_page=100&page=' + page);
      subs.push(...batch);
      if (batch.length < 100) break;
    }
    const faces = subs
      .filter((s) => photoUrl(s) && !hidden.has(s.id))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((s) => '/.netlify/functions/faces?id=' + s.id);
    return json({ faces });
  } catch (e) {
    return json({ faces: [], error: 'unavailable' });
  }
};
