const frame = document.getElementById('frame-ky');
const totalFrames = 156;
const scrollRange = window.innerHeight * totalFrames * 0.5;

const backButton = document.getElementById('back-button-ky');
const returnTopButton = document.getElementById('return-top-btn-ky');
const skipButton = document.getElementById('skip-button-ky');

const playButton = document.getElementById('playMixtape-ky');
let isAutoScrolling = false;
let autoScrollInterval;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const progress = scrollTop / scrollRange;
    const frameIndex = Math.min(totalFrames, Math.max(1, Math.floor(progress * totalFrames)));

    frame.src = "./kyMixtape/kyFrame (" + frameIndex + ").jpg";

    if (scrollTop > scrollRange) {
        frame.style.position = 'absolute';
        frame.style.top = `${scrollRange}px`;
    } else {
        frame.style.position = "fixed";
        frame.style.top = `0vh`;
    }

    // Hide skip button after finish
    if (scrollTop >= scrollRange) {
        skipButton.style.display = 'none';
        playButton.style.display = 'none';
    } else {
        skipButton.style.display = 'block';
        playButton.style.display = 'block';
    }
});

const slides = document.querySelectorAll(".timeline-slide-ky");
let currentSlide = 0;

document.querySelector(".timeline-next-ky").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-ky");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active-ky");
});

document.querySelector(".timeline-prev-ky").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-ky");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active-ky");
});


document.getElementById("quiz-form-ky").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = {
    q1: "2011",
    q2: "Cavaliers",
    q3: "ROTY",
    q4: "Nets"
  };

  let score = 0;
  Object.keys(answers).forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  });

  const resultText = `You scored ${score}/4.`;
  document.getElementById("quiz-result-ky").textContent = resultText;
});

// Email button handler
document.getElementById("send-button-ky").addEventListener("click", function () {
  const resultText = document.getElementById("quiz-result-ky").textContent.trim();
  const email = document.getElementById("email-ky").value;

  if (email && resultText) {
    const mailtoLink = `mailto:${email}?subject=Kyrie Irving Quiz Results&body=${encodeURIComponent(resultText)}`;
    window.location.href = mailtoLink;
  } else {
    alert("Please complete the quiz and enter an email address to send results.");
  }
});

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

// Return to Top button
returnTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skip button: scroll to the end of mixtape (scrollRange)
skipButton.addEventListener('click', () => {
  window.scrollTo({ top: scrollRange, behavior: 'smooth' });
});

playButton.addEventListener('click', () => {
    if (!isAutoScrolling) {
        isAutoScrolling = true;
        playButton.textContent = '⏸ Pause';

        autoScrollInterval = setInterval(() => {
            window.scrollBy(0, 28); // Scrolls down 10px every step
            if (window.scrollY >= scrollRange) {
                clearInterval(autoScrollInterval);
                isAutoScrolling = false;
                playButton.textContent = '▶ Play';
            }
        }, 1); // roughly 60 frames per second
    } else {
        clearInterval(autoScrollInterval);
        isAutoScrolling = false;
        playButton.textContent = '▶ Play';
    }
});