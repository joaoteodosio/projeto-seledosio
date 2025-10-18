// Função para alternar a exibição do menu de navegação em dispositivos móveis
function toggleMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Alterna a classe 'show' para cada link, exceto o ícone do menu
        if (!link.classList.contains('menu-icon')) {
            link.classList.toggle('show');
        }
    });
}
// SLIDER
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlide(index) {
    const slidesContainer = document.querySelector(".slides");
    if (index >= totalSlides) currentIndex = 0;
    else if(index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    slidesContainer.style.transform =  `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("clik", ()=> showSlide(currentIndex + 1));
prevBtn.addEventListener("clik", ()=> showSlide(currentIndex - 1));

setInterval(()=> {
    showSlide(currentIndex + 1);
}, 5000); // troca automatica a cada 5s
