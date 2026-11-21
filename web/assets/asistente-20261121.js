/* Asistente de Aireal Estudio. Solo aparece si /api/chat dice que está activado.
   Todo el DOM se crea aquí, sin estilos en línea (CSP), y las respuestas se pintan
   como texto, nunca como HTML. No se guarda nada: la conversación vive en esta pestaña. */
(() => {
  'use strict';
  const ENDPOINT = '/api/chat';
  const SUGGESTIONS = ['¿Cuánto cuesta una web?', '¿Qué incluye la primera sesión?', '¿Cómo funciona la carta QR?'];
  const SVG = 'http://www.w3.org/2000/svg';
  const history = [];
  let busy = false;

  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
  const svg = (paths, viewBox, cls) => {
    const s = document.createElementNS(SVG, 'svg');
    s.setAttribute('viewBox', viewBox); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    if (cls) s.setAttribute('class', cls);
    paths.forEach(([d, c, attrs]) => { const p = document.createElementNS(SVG, 'path'); p.setAttribute('d', d); if (c) p.setAttribute('class', c); Object.entries(attrs || {}).forEach(([k, v]) => p.setAttribute(k, v)); s.append(p); });
    return s;
  };
  // La «a.» del logo: misma forma y el punto terracota.
  const markA = 'M62.61 80 62.07 73.26V57.01Q62.07 53.11 59.83 51.05Q57.59 48.98 53.36 48.98Q50.41 48.98 47.68 50.18Q44.95 51.37 42.54 54L37.97 49.34Q41.28 45.91 45.25 44.35Q49.22 42.78 53.91 42.78Q61.23 42.78 65.26 46.51Q69.29 50.25 69.29 57.01V80ZM50.87 80.64Q46.76 80.64 43.65 79.18Q40.54 77.71 38.83 75.07Q37.11 72.43 37.11 68.96Q37.11 65.89 38.37 63.72Q39.62 61.55 41.62 60.35Q43.51 59.15 45.93 58.67Q48.35 58.2 51.03 58.2H62.73V63.65H52.07Q50.59 63.65 49.02 63.91Q47.46 64.18 46.28 65.03Q45.41 65.69 44.9 66.7Q44.4 67.7 44.4 69.02Q44.4 71.65 46.38 73.2Q48.36 74.75 51.7 74.75Q54.55 74.75 56.89 73.45Q59.22 72.15 60.65 69.86Q62.07 67.58 62.07 64.7L64.63 68.1Q63.99 72 62.05 74.84Q60.12 77.67 57.27 79.15Q54.43 80.64 50.87 80.64Z';
  const markDot = 'M71.29 80V71.01H79.51V80Z';
  const mark = (cls) => svg([[markA, 'ae-chat__mark-ink'], [markDot, 'ae-chat__mark-dot']], '33 38 52 46', cls);

  async function ready() {
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', cache: 'no-store', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: '{"ping":true}' });
      if (!r.ok) { console.info('[Aireal] Asistente oculto: /api/chat respondió ' + r.status); return false; }
      const on = (await r.json()).ready === true;
      if (!on) console.info('[Aireal] Asistente oculto: falta ANTHROPIC_API_KEY en Cloudflare');
      return on;
    } catch (e) { console.info('[Aireal] Asistente oculto: no se pudo contactar con /api/chat', e); return false; }
  }

  function build() {
    const launcher = el('button', 'ae-chat__launcher');
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Abrir el asistente de Aireal Estudio');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-controls', 'ae-chat-panel');
    launcher.append(mark('ae-chat__launcher-mark'), svg([['M6 6l12 12M18 6L6 18', null, { fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }]], '0 0 24 24', 'ae-chat__launcher-close'));

    const panel = el('section', 'ae-chat__panel');
    panel.id = 'ae-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Asistente de Aireal Estudio');
    panel.hidden = true;

    const head = el('header', 'ae-chat__head');
    const avatar = el('span', 'ae-chat__avatar'); avatar.append(mark());
    const titles = el('div', 'ae-chat__titles');
    titles.append(el('p', 'ae-chat__title', 'Asistente de Aireal'), el('p', 'ae-chat__subtitle', 'Responde con la información de esta web'));
    const close = el('button', 'ae-chat__close'); close.type = 'button'; close.setAttribute('aria-label', 'Cerrar el asistente');
    close.append(svg([['M6 6l12 12M18 6L6 18', null, { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.75', 'stroke-linecap': 'round' }]], '0 0 24 24'));
    head.append(avatar, titles, close);

    const log = el('div', 'ae-chat__log'); log.setAttribute('role', 'log'); log.setAttribute('aria-live', 'polite');
    const hello = el('p', 'ae-chat__msg ae-chat__msg--bot', 'Hola. Pregúntame por servicios, precios o cómo trabajamos. Si prefieres hablar con William, el formulario está al final de la página.');
    const chips = el('div', 'ae-chat__chips');
    SUGGESTIONS.forEach((s) => { const c = el('button', 'ae-chat__chip', s); c.type = 'button'; c.addEventListener('click', () => send(s)); chips.append(c); });
    log.append(hello, chips);

    const form = el('form', 'ae-chat__form');
    const label = el('label', 'ae-sr', 'Tu pregunta'); label.htmlFor = 'ae-chat-input';
    const input = el('input', 'ae-chat__input'); input.id = 'ae-chat-input'; input.type = 'text'; input.maxLength = 600; input.autocomplete = 'off'; input.placeholder = 'Escribe tu pregunta';
    const sendBtn = el('button', 'ae-chat__send'); sendBtn.type = 'submit'; sendBtn.setAttribute('aria-label', 'Enviar');
    sendBtn.append(svg([['M12 19V5M5.5 11.5L12 5l6.5 6.5', null, { fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }]], '0 0 24 24'));
    form.append(label, input, sendBtn);

    const foot = el('p', 'ae-chat__foot');
    const contact = el('a', null, 'Escribir a William'); contact.href = '#contacto';
    const privacy = el('a', null, 'privacidad'); privacy.href = '/privacidad';
    foot.append('Respuestas generadas por Claude (Anthropic) con la información de la web. No compartas datos personales · ', privacy, ' · ', contact);

    panel.append(head, log, form, foot);
    document.body.append(panel, launcher);

    const open = (state) => {
      panel.hidden = !state;
      launcher.setAttribute('aria-expanded', String(state));
      launcher.setAttribute('aria-label', state ? 'Cerrar el asistente' : 'Abrir el asistente de Aireal Estudio');
      document.documentElement.classList.toggle('ae-chat-open', state);
      if (state) input.focus(); else launcher.focus();
    };
    launcher.addEventListener('click', () => open(panel.hidden));
    close.addEventListener('click', () => open(false));
    contact.addEventListener('click', () => open(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) open(false); });

    const scroll = () => { log.scrollTop = log.scrollHeight; };
    const add = (role, text) => { const m = el('p', `ae-chat__msg ae-chat__msg--${role === 'user' ? 'user' : 'bot'}`, text); log.append(m); scroll(); return m; };

    async function send(text) {
      const q = String(text || '').trim().slice(0, 600);
      if (!q || busy) return;
      busy = true; chips.remove(); input.value = ''; sendBtn.disabled = true;
      add('user', q); history.push({ role: 'user', content: q });
      const typing = add('bot', ''); typing.classList.add('ae-chat__msg--typing'); typing.setAttribute('aria-label', 'Escribiendo');
      typing.append(el('span'), el('span'), el('span'));
      try {
        const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ messages: history.slice(-12) }) });
        const data = await r.json().catch(() => ({}));
        typing.remove();
        if (r.ok && data.reply) { add('bot', data.reply); history.push({ role: 'assistant', content: data.reply }); }
        else { add('bot', data.error || 'No he podido responder ahora. Escríbenos desde el formulario.').classList.add('ae-chat__msg--error'); history.pop(); }
      } catch {
        typing.remove(); add('bot', 'Sin conexión con el asistente. Escríbenos desde el formulario.').classList.add('ae-chat__msg--error'); history.pop();
      } finally { busy = false; sendBtn.disabled = false; input.focus(); }
    }
    form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });

    // Mientras se muestra el aviso de cookies, el botón espera para no taparlo.
    const consent = () => document.getElementById('analytics-consent');
    const sync = () => { const c = consent(); launcher.classList.toggle('is-waiting', Boolean(c && !c.hidden)); };
    new MutationObserver(sync).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
    sync();
    requestAnimationFrame(() => launcher.classList.add('is-in'));
  }

  const start = async () => { if (await ready()) build(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
