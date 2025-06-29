let currentIndex = 0;
const slides = document.getElementById("slides");
const totalSlides = 6;

function moveSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = totalSlides - 1;
  if (currentIndex >= totalSlides) currentIndex = 0;
  slides.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") moveSlide(1);
  if (event.key === "ArrowLeft") moveSlide(-1);
});

function goToSlide(index) {
  currentIndex = index;
  slides.style.transform = `translateX(-${currentIndex * 100}vw)`;
  slideMenu.classList.remove("expanded");
}

const menuToggle = document.getElementById("menu-toggle");
const slideMenu = document.getElementById("slide-menu");

menuToggle.addEventListener("click", () => {
  slideMenu.classList.toggle("expanded");
});