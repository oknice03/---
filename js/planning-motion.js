(() => {
  const section = document.querySelector('.pb-planning');
  const button = section?.querySelector('.pb-motion-toggle');
  if (!section || !button) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let inView = false;
  const update = () => {
    const stopped = userPaused || preference.matches;
    section.classList.toggle('motion-running', inView && !document.hidden && !stopped);
    button.disabled = preference.matches;
    button.setAttribute('aria-pressed', String(stopped));
    button.textContent = preference.matches ? '동작 줄이기 설정 적용' : userPaused ? '모션 재생하기' : '모션 멈추기';
  };
  button.hidden = false;
  section.classList.add('motion-ready');
  button.addEventListener('click', () => { userPaused = !userPaused; update(); });
  preference.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      update();
    }, {threshold: 0.05});
    observer.observe(section);
  } else {
    inView = true;
  }
  update();
})();
