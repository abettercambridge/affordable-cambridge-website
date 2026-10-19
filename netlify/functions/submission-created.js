// Runs automatically on Netlify each time a pledge or story submission is verified.
// Sends the submission, including the uploaded photo link, to the MFZ Website Emails Google Sheet.
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz6KF4uOVIQue3cStbgvzZgmZStgGXaCUQusSKwNWVpWhzh-Wkf0fHpkRocG2uWG_uO/exec';
const SKIP = ['form-name', 'company', 'ip', 'user_agent', 'referrer'];

exports.handler = async (event) => {
  try {
    const p = JSON.parse(event.body).payload || {};
    const data = {};
    for (const [k, v] of Object.entries(p.data || {})) {
      if (SKIP.includes(k)) continue;
      if (v && typeof v === 'object') {
        data[k + '_url'] = v.url || '';
      } else if (k === 'photo' && typeof v === 'string' && v.startsWith('http')) {
        data.photo_url = v;
      } else {
        data[k] = v;
      }
    }
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ form_name: p.form_name, created_at: p.created_at, data })
    });
  } catch (e) {
    console.error('Sheet sync failed', e);
  }
  return { statusCode: 200, body: 'ok' };
};
