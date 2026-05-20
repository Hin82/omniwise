import { escapeHtml, sanitizeEmailHeader } from '../lib/utils.js';

// Newsletter signup endpoint.
//
// Beteende:
// 1. Om BREVO_NEWSLETTER_LIST_ID är satt: skapar/uppdaterar kontakten i den
//    Brevo-listan (newsletter subscription).
// 2. Skickar en notifieringsmail till hello@omniwise.se om varje ny signup.
// 3. Returnerar alltid en generisk framgångsrespons om e-postformatet är giltigt,
//    även om Brevo-anropet misslyckas — så att användarens UX inte avslöjar
//    interna fel och vi inte läcker information om vilka adresser som finns.
export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Ange en giltig e-postadress.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const apiKey = context.env.BREVO_API_KEY;
    const listId = context.env.BREVO_NEWSLETTER_LIST_ID
      ? Number(context.env.BREVO_NEWSLETTER_LIST_ID)
      : null;

    if (!apiKey) {
      console.error('Newsletter: BREVO_API_KEY saknas');
      return new Response(
        JSON.stringify({ error: 'E-posttjänsten är inte konfigurerad.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // 1) Lägg till kontakten i Brevo-listan (om list-ID konfigurerat).
    if (listId) {
      const contactsResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
        }),
      });

      // 400 returneras om kontakten redan finns — det är okej, vi uppdaterar.
      // updateEnabled:true bör hantera det, men vi sväljer 400 för säkerhets skull.
      if (!contactsResponse.ok && contactsResponse.status !== 400) {
        const err = await contactsResponse.text();
        console.error('Brevo contacts error:', contactsResponse.status, err);
      }
    }

    // 2) Notifiering till OmniWise om ny signup.
    const notifyResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'OmniWise Nyhetsbrev', email: 'hello@omniwise.se' },
        to: [{ email: 'hello@omniwise.se', name: 'OmniWise AB' }],
        subject: `Ny nyhetsbrevsprenumerant: ${sanitizeEmailHeader(email)}`,
        htmlContent: `
          <h2>Ny prenumerant på nyhetsbrevet</h2>
          <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
          <p style="color:#43474f;font-size:14px;">
            ${listId
              ? 'Kontakten har lagts till i Brevo-listan automatiskt.'
              : 'OBS: Inget BREVO_NEWSLETTER_LIST_ID är satt — lägg till manuellt i Brevo.'}
          </p>
        `,
      }),
    });

    if (!notifyResponse.ok) {
      const err = await notifyResponse.text();
      console.error('Brevo notify error:', notifyResponse.status, err);
      // Sväljs — vi returnerar ändå framgång till användaren om de redan
      // lagts till i listan (eller om vi inte kan skilja på det).
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Tack! Du är nu prenumerant.' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (err) {
    console.error('Newsletter form error:', err);
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
