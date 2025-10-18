document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slidesContainer = carousel.querySelector('.slides');
  const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const indicatorsWrap = carousel.querySelector('.indicators');

  if (!slides.length) return;

  // cria indicadores dinamicamente
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Ir para slide ${i+1}`);
    dot.dataset.index = i;
    indicatorsWrap.appendChild(dot);
  });
  const dots = Array.from(indicatorsWrap.querySelectorAll('.dot'));

  let current = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 4000;
  let isPointerDown = false;
  let startX = 0;
  let deltaX = 0;

  function goTo(index){
    current = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function next(){
    goTo(current + 1);
  }

  function prev(){
    goTo(current - 1);
  }

  function updateDots(){
    dots.forEach(d => d.classList.remove('active'));
    const activeDot = dots[current];
    if (activeDot) activeDot.classList.add('active');
  }

  // handlers
  nextBtn && nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  dots.forEach(d => {
    d.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      goTo(idx);
      resetAutoplay();
    });
  });

  // autoplay
  function startAutoplay(){
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }
  function stopAutoplay(){
    if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; }
  }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  // pause on mouse / touch interaction
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // touch / swipe support
  carousel.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    startX = e.clientX;
    deltaX = 0;
    stopAutoplay();
    carousel.style.touchAction = 'pan-y';
  }, {passive: true});

  window.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    deltaX = e.clientX - startX;
  }, {passive: true});

  window.addEventListener('pointerup', () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) next();
      else prev();
    }
    deltaX = 0;
    resetAutoplay();
  });

  // Inicia
  goTo(0);
  startAutoplay();
});
