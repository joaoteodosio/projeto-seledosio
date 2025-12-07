

  // =========================
// CARROSSEL COM SWIPE MOBILE
// =========================

const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const indicatorsContainer = document.querySelector(".indicators");

let index = 0;
const total = slideItems.length;

// Criar indicadores (bolinhas)
slideItems.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    indicatorsContainer.appendChild(dot);

    dot.addEventListener("click", () => goToSlide(i));
});

const dots = document.querySelectorAll(".dot");

// Atualiza posição dos slides
function updateCarousel() {
    slides.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function goToSlide(i) {
    index = i;
    updateCarousel();
}

function nextSlide() {
    index = (index + 1) % total;
    updateCarousel();
}

function prevSlide() {
    index = (index - 1 + total) % total;
    updateCarousel();
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// =========================
// SUPORTE A SWIPE (CELULAR)
// =========================

let startX = 0;
let moveX = 0;
let isSwiping = false;

slides.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

slides.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    moveX = e.touches[0].clientX - startX;
});

slides.addEventListener("touchend", () => {
    if (!isSwiping) return;

    if (moveX > 50) prevSlide();      // swipe direita
    if (moveX < -50) nextSlide();     // swipe esquerda

    isSwiping = false;
    startX = 0;
    moveX = 0;
});
