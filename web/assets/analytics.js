/* Clarity se descarga únicamente después de aceptar la analítica. */
(() => {
  'use strict';
  if (window.AirealAnalytics) return;

  const projectId = 'ynea67k393';
  const storageKey = 'aireal_analytics_consent_v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const events = new Set(['pedir_presupuesto', 'ver_proyecto', 'preparar_consulta', 'abrir_correo', 'consulta_enviada', 'instagram', 'whatsapp', 'reservar_fecha']);
  let loaded = false;
  let expiryTimer;
  let returnFocus;

  function parseChoice(value) {
    try {
      const saved = JSON.parse(value);
      return saved && ['accepted', 'rejected'].includes(saved.choice) &&
        Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now() &&
        saved.expiresAt <= Date.now() + lifetime ? saved : null;
    } catch { return null; }
  }

  function readChoice() {
    try { return parseChoice(localStorage.getItem(storageKey)); }
    catch { return null; }
  }

  let consent = readChoice();
  const panel = document.createElement('section');
  panel.id = 'analytics-consent';
  panel.className = 'analytics-consent';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'analytics-title');
  panel.hidden = Boolean(consent);
  panel.innerHTML = '<div class="analytics-copy"><h2 id="analytics-title" tabindex="-1">Tu privacidad, tu elección</h2>' +
    '<p>Con tu permiso, usamos Microsoft Clarity para medir las visitas y ver cómo se navega por la web mediante mapas de clics y grabaciones de sesiones. Puedes rechazarlo y seguir navegando.</p>' +
    '<p><a href="/cookies.html">Información de cookies</a> · <a href="/privacidad.html">Privacidad</a></p>' +
    '<p id="analytics-current" role="status"></p></div>' +
    '<div class="analytics-actions"><button type="button" id="analytics-reject">Rechazar analítica</button>' +
    '<button type="button" id="analytics-accept">Aceptar analítica</button>' +
    '<button type="button" id="analytics-close" hidden>Cerrar</button></div>';
  document.body.append(panel);

  const preferences = document.createElement('button');
  preferences.type = 'button';
  preferences.className = 'analytics-preferences';
  preferences.dataset.cookiePreferences = '';
  preferences.textContent = 'Preferencias de cookies';
  preferences.setAttribute('aria-controls', panel.id);
  preferences.setAttribute('aria-expanded', String(!panel.hidden));
  (document.querySelector('.footer-bottom nav') || document.body).append(preferences);

  function clearCookies() {
    const host = location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < host.length - 1; i++) domains.push('; Domain=' + host.slice(i).join('.'));
    for (const name of ['_clck', '_clsk']) {
      for (const domain of domains) document.cookie = name + '=; Max-Age=0; Path=/' + domain + '; SameSite=Lax';
    }
  }

  function loadClarity() {
    if (loaded || consent?.choice !== 'accepted') return;
    loaded = true;
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + projectId;
    document.head.append(script);
  }

  function stopClarity() {
    if (loaded && typeof window.clarity === 'function') {
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    }
    clearCookies();
    // Quitar la etiqueta no detiene un script ya ejecutado. La nueva página no lo carga.
    if (loaded) location.reload();
  }

  function render() {
    document.getElementById('analytics-current').textContent = consent ?
      (consent.choice === 'accepted' ? 'Ahora tienes la analítica activada. Puedes retirarla con «Rechazar analítica».' : 'Ahora tienes la analítica desactivada.') : '';
    document.getElementById('analytics-close').hidden = !consent;
    preferences.setAttribute('aria-expanded', String(!panel.hidden));
  }

  function scheduleExpiry() {
    clearTimeout(expiryTimer);
    if (!consent) return;
    expiryTimer = setTimeout(() => {
      if (consent.expiresAt > Date.now()) { scheduleExpiry(); return; }
      consent = null;
      try { localStorage.removeItem(storageKey); } catch { /* Sin almacenamiento persistente. */ }
      panel.hidden = false;
      render();
      stopClarity();
    }, Math.min(consent.expiresAt - Date.now(), 2147483647));
  }

  function closePanel() {
    panel.hidden = true;
    render();
    if (returnFocus?.isConnected) returnFocus.focus();
  }

  function choose(choice) {
    consent = { choice, expiresAt: Date.now() + lifetime };
    try { localStorage.setItem(storageKey, JSON.stringify(consent)); } catch { /* Solo se recuerda en esta página. */ }
    closePanel();
    scheduleExpiry();
    if (choice === 'accepted') loadClarity();
    else stopClarity();
  }

  document.getElementById('analytics-accept').addEventListener('click', () => choose('accepted'));
  document.getElementById('analytics-reject').addEventListener('click', () => choose('rejected'));
  document.getElementById('analytics-close').addEventListener('click', closePanel);
  preferences.addEventListener('click', () => {
    returnFocus = preferences;
    panel.hidden = false;
    render();
    document.getElementById('analytics-title').focus();
  });
  panel.addEventListener('keydown', event => { if (event.key === 'Escape' && consent) closePanel(); });

  function syncConsent() {
    consent = readChoice();
    panel.hidden = Boolean(consent);
    render();
    scheduleExpiry();
    if (consent?.choice === 'accepted') loadClarity();
    else stopClarity();
  }
  window.addEventListener('storage', event => { if (event.key === storageKey || event.key === null) syncConsent(); });
  window.addEventListener('pageshow', event => { if (event.persisted) syncConsent(); });

  function track(name) {
    if (consent?.choice === 'accepted' && consent.expiresAt > Date.now() && events.has(name) && typeof window.clarity === 'function') {
      window.clarity('event', name);
    }
  }
  window.AirealAnalytics = Object.freeze({ track });

  document.addEventListener('click', event => {
    const link = event.target.closest?.('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (link.id === 'open-email' || link.hasAttribute('data-email')) track('abrir_correo');
    else if (link.hasAttribute('data-instagram')) track('instagram');
    else if (link.hasAttribute('data-whatsapp')) track('whatsapp');
    else if (link.hasAttribute('data-booking')) track('reservar_fecha');
    else if (href.endsWith('#contacto')) track('pedir_presupuesto');
    else if (link.closest('.real-work, .work-card, .dev-work')) track('ver_proyecto');
  });

  render();
  scheduleExpiry();
  if (consent?.choice === 'accepted') loadClarity();
  else clearCookies();
})();
