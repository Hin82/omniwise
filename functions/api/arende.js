import { escapeHtml, sanitizeEmailHeader } from '../lib/utils.js';

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json();
    const { name, company, email, category, priority, subject, description } = body;

    if (!name || !email || !category || !priority || !subject || !description) {
      return new Response(
        JSON.stringify({ error: 'Namn, e-post, kategori, prioritet, ämne och beskrivning krävs.' }),
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

    const priorityColors = {
      'Kritisk': '#dc2626',
      'Hög': '#ea580c',
      'Normal': '#2563eb',
      'Låg': '#6b7280',
    };
    const priorityColor = priorityColors[priority] || '#2563eb';

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'OmniWise Ärendehantering', email: 'hello@omniwise.se' },
        to: [{ email: 'support@omniwise.se', name: 'OmniWise Support' }],
        replyTo: { email, name },
        subject: `[${sanitizeEmailHeader(priority)}] ${sanitizeEmailHeader(subject)} — ${sanitizeEmailHeader(name)}${company ? ` (${sanitizeEmailHeader(company)})` : ''}`,
        htmlContent: `
          <h2>Nytt supportärende</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Namn</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Företag</td><td style="padding:8px;">${escapeHtml(company || '—')}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">E-post</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Kategori</td><td style="padding:8px;">${escapeHtml(category)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Prioritet</td><td style="padding:8px;"><span style="background-color:${priorityColor};color:#fff;padding:2px 8px;border-radius:4px;font-size:14px;">${escapeHtml(priority)}</span></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;">Ämne</td><td style="padding:8px;">${escapeHtml(subject)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#001736;vertical-align:top;">Beskrivning</td><td style="padding:8px;white-space:pre-wrap;">${escapeHtml(description)}</td></tr>
          </table>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const err = await brevoResponse.text();
      console.error('Brevo error:', brevoResponse.status, err);
      return new Response(
        JSON.stringify({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Ärendet har registrerats!' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (err) {
    console.error('Arende form error:', err);
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

