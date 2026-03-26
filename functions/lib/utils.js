export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeEmailHeader(value) {
  if (value == null) return '';
  return String(value)
    .replace(/[\r\n\x00-\x1f]/g, '')
    .trim();
}
