/* ===================================================================
   OmniWise AB — Newsletter form handler
   -------------------------------------------------------------------
   Hittar alla <form data-newsletter> på sidan och kopplar dem mot
   /api/newsletter. Visar status i närmaste [data-newsletter-status]
   om sådan finns.
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-newsletter]');

  forms.forEach((form) => {
    const findStatusEl = () => {
      const inside = form.querySelector('[data-newsletter-status]');
      if (inside) return inside;
      const next = form.nextElementSibling;
      if (next && next.hasAttribute && next.hasAttribute('data-newsletter-status')) return next;
      const inParent = form.parentElement && form.parentElement.querySelector('[data-newsletter-status]');
      return inParent || null;
    };

    const statusEl = findStatusEl();
    const baseStatusClasses = statusEl ? Array.from(statusEl.classList) : [];

    const setStatus = (text, ok) => {
      if (!statusEl) return;
      statusEl.textContent = text || '';
      statusEl.classList.remove('text-red-300', 'text-red-200');
      if (text && ok === false) {
        statusEl.classList.add('text-red-300');
      }
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const email = (emailInput && emailInput.value || '').trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Ange en giltig e-postadress.', false);
        if (emailInput) emailInput.focus();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      setStatus('Skickar…', true);

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus(data.message || 'Tack! Du är nu prenumerant.', true);
          form.reset();
        } else {
          setStatus(data.error || 'Något gick fel. Försök igen senare.', false);
        }
      } catch (err) {
        setStatus('Kunde inte ansluta. Försök igen.', false);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});
