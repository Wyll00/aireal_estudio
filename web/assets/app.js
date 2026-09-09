/* Interacciones progresivas. El contenido y los enlaces se sirven sin JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');
  const config = window.AIREAL_CONFIG || {};
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '') ? config.email : 'williamluisgonzalez@gmail.com';
  const safeHttps = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } };
  document.querySelectorAll('[data-email]').forEach(el => { el.href = 'mailto:' + email; el.textContent = email; });
  document.querySelectorAll('[data-instagram]').forEach(el => { if (safeHttps(config.instagram)) el.href = safeHttps(config.instagram); });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  if (/^[1-9]\d{7,14}$/.test(config.whatsapp || '')) document.querySelectorAll('[data-whatsapp]').forEach(el => { el.href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent('Hola, quiero información sobre Aireal Estudio.'); el.target = '_blank'; el.rel = 'noopener noreferrer'; el.hidden = false; });
  if (safeHttps(config.bookingUrl)) document.querySelectorAll('[data-booking]').forEach(el => { el.href = safeHttps(config.bookingUrl); el.target = '_blank'; el.rel = 'noopener noreferrer'; el.hidden = false; });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  function closeMenu() { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); nav.classList.remove('is-open'); }
  if (toggle && nav) {
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav.classList.toggle('is-open', open); });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
  }
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => { const select = document.getElementById('interest'); if (select) select.value = link.dataset.interest; }));

  const tabs = [...document.querySelectorAll('[data-tab]')];
  function selectTab(tab, focus = false) { tabs.forEach(t => { const active = t === tab; t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; document.getElementById('panel-' + t.dataset.tab).hidden = !active; }); if (focus) tab.focus(); }
  tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectTab(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); } }); });
  const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: true });
  const decimal = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 });
  const value = id => Number(document.getElementById(id)?.value || 0);
  const put = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  if (document.getElementById('panel-time') && window.AirealMath) {
    const recalc = () => {
      const time = window.AirealMath.timeScenario({ hours: value('hours'), share: value('automation'), hourValue: value('hour-value'), monthlyCost: value('monthly-cost') });
      put('hours-label', value('hours') + ' h'); put('automation-label', value('automation') + ' %');
      put('time-result', decimal.format(time.savedHours) + ' h'); put('time-value', currency.format(time.gross) + ' de valor teórico; ' + currency.format(time.net) + ' tras el coste indicado.');
      const bookings = window.AirealMath.bookingScenario({ revenue: value('revenue'), share: value('direct-share'), commission: value('commission'), fee: value('payment-fee'), annualCost: value('booking-cost') });
      put('revenue-label', currency.format(value('revenue'))); put('share-label', value('direct-share') + ' %'); put('booking-result', currency.format(bookings.net)); put('booking-value', currency.format(bookings.gross) + ' de diferencia en costes variables, antes de ' + currency.format(value('booking-cost')) + ' de costes fijos.');
      for (const [panel, result, detail] of [['panel-time', 'time-result', 'time-value'], ['panel-booking', 'booking-result', 'booking-value']]) {
        const inputs = [...document.querySelectorAll('#' + panel + ' input[type=number]')];
        const valid = inputs.every(input => input.value.trim() !== '' && input.validity.valid);
        inputs.forEach(input => input.setAttribute('aria-invalid', String(input.value.trim() === '' || !input.validity.valid)));
        if (!valid) { put(result, 'Revisa los valores'); put(detail, 'Introduce importes dentro de los límites de cada campo para calcular el escenario.'); }
      }
    };
    document.querySelectorAll('.calculator input').forEach(input => input.addEventListener('input', recalc)); recalc();
  }

  const form = document.getElementById('contact-form');
  let brief = '';
  if (form) {
    // Siempre se cancela el envío nativo: no existe endpoint ni se ponen datos personales en la URL.
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const get = name => String(data.get(name) || '').trim();
      brief = ['Hola, Aireal Estudio:', '', 'Nombre: ' + get('name'), 'Email: ' + get('email'), 'Negocio o web: ' + (get('business') || 'No indicado'), 'Interés: ' + get('interest'), '', get('message')].join('\n');
      document.getElementById('open-email').href = 'mailto:' + email + '?subject=' + encodeURIComponent('Consulta · ' + get('interest')) + '&body=' + encodeURIComponent(brief);
      document.getElementById('brief-preview').textContent = brief;
      document.getElementById('contact-result').hidden = false;
      put('contact-status', 'Tu consulta está preparada. Abre tu correo, revisa el mensaje y pulsa Enviar allí. También puedes copiarlo o descargarlo.');
      document.getElementById('open-email').focus();
    });
    form.addEventListener('input', () => { if (!document.getElementById('contact-result').hidden) { document.getElementById('contact-result').hidden = true; brief = ''; } });
    document.getElementById('copy-brief').addEventListener('click', async () => { if (!brief) return; try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(brief); put('contact-status', 'Consulta copiada. Pégala en tu correo y envíala a ' + email + '.'); } catch { const pre = document.getElementById('brief-preview'); pre.closest('details').open = true; const range = document.createRange(); range.selectNodeContents(pre); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); put('contact-status', 'No se pudo copiar automáticamente. El texto está seleccionado para que lo copies o lo descargues.'); } });
    document.getElementById('download-brief').addEventListener('click', () => { if (!brief) return; const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'consulta-aireal.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); put('contact-status', 'Se ha preparado la descarga de tu consulta. Envíala a ' + email + ' cuando quieras.'); });
    document.getElementById('prepare-brief').disabled = false;
    // Sin JavaScript, el botón permanece desactivado; el correo directo sigue disponible.
  }
})();
