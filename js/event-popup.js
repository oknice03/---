(() => {
  'use strict';
  const dialog = document.getElementById('video-package');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const sessionKey = 'pptbranding-video-event-seen-v1';
  const todayKey = 'pptbranding-video-event-hidden-v1';
  const day = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(); };
  const read = (kind, key) => { try { return window[kind].getItem(key); } catch { return null; } };
  const save = (kind, key, value) => { try { window[kind].setItem(key, value); } catch { /* Storage may be unavailable in private mode. */ } };
  let touched = false, delayPassed = false, previousFocus = null;
  const stopAuto = () => { window.removeEventListener('scroll', autoOpen); document.removeEventListener('visibilitychange', autoOpen); };
  function openEvent(manual = false) {
    if (dialog.open) return;
    if (!manual && (touched || read('sessionStorage', sessionKey) || read('localStorage', todayKey) === day())) return;
    previousFocus = document.activeElement;
    touched = true;
    stopAuto();
    save('sessionStorage', sessionKey, '1');
    dialog.showModal();
    document.body.classList.add('pb-popup-open');
  }
  function autoOpen() {
    if (!delayPassed || document.visibilityState !== 'visible' || window.scrollY < 320) return;
    const active = document.activeElement;
    if (active && active !== document.body && active !== document.documentElement) return;
    openEvent();
  }
  function closeEvent() { if (dialog.open) dialog.close(); }
  document.querySelectorAll('[data-event-open]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => openEvent(true));
  });
  dialog.querySelectorAll('[data-event-close]').forEach(button => button.addEventListener('click', closeEvent));
  dialog.querySelector('[data-event-today]').addEventListener('click', () => {
    save('localStorage', todayKey, day());
    closeEvent();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('pb-popup-open');
    if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({preventScroll:true});
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeEvent();
  });
  dialog.querySelector('[data-event-contact]').addEventListener('click', () => {
    previousFocus = null;
    closeEvent();
    const contact = document.getElementById('contact');
    if (contact) { contact.setAttribute('tabindex', '-1'); requestAnimationFrame(() => contact.focus({preventScroll:true})); }
  });
  if (!read('sessionStorage', sessionKey) && read('localStorage', todayKey) !== day()) {
    window.addEventListener('scroll', autoOpen, {passive:true});
    document.addEventListener('visibilitychange', autoOpen);
    window.setTimeout(() => { delayPassed = true; autoOpen(); }, 12000);
  }
})();
