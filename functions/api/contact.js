export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json();
    const { name, company, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Namn, e-post och meddelande krävs.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const apiKey = context.env.BREVO_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'E-posttjänsten är inte konfigurerad.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'OmniWise Kontaktformulär', email: 'hello@omniwise.se' },
        to: [{ email: 'hello@omniwise.se', name: 'OmniWise AB' }],
        replyTo: { email, name },
        subject: `Kontaktförfrågan från ${name}${company ? ` (${company})` : ''}`,
        htmlContent: `
          <h2>Nytt meddelande från kontaktformuläret</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Namn</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Företag</td><td style="padding:8px;">${escapeHtml(company || '—')}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">E-post</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;vertical-align:top;">Meddelande</td><td style="padding:8px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const err = await brevoResponse.text();
      console.error('Brevo error:', brevoResponse.status, err);
      return new Response(
        JSON.stringify({ error: 'Kunde inte skicka meddelandet. Försök igen senare.', detail: err }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Meddelandet har skickats!' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ error: 'Ett oväntat fel uppstod.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
