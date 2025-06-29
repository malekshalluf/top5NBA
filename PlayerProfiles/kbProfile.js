const frame = document.getElementById('frame-kb');
const totalFrames = 200;
const scrollRange = window.innerHeight * totalFrames * 0.5;

const backButton = document.getElementById('back-button-kb');
const returnTopButton = document.getElementById('return-top-btn-kb');
const skipButton = document.getElementById('skip-button-kb');

const playButton = document.getElementById('playMixtape-kb');
let isAutoScrolling = false;
let autoScrollInterval;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const progress = scrollTop / scrollRange;
    const frameIndex = Math.min(totalFrames, Math.max(1, Math.floor(progress * totalFrames)));

    frame.src = "./kbMixtape/kbFrame (" + frameIndex + ").jpg";

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

const slides = document.querySelectorAll(".timeline-slide-kb");
let currentSlide = 0;

document.querySelector(".timeline-next-kb").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-kb");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active-kb");
});

document.querySelector(".timeline-prev-kb").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-kb");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active-kb");
});


document.getElementById("quiz-form-kb").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = {
    q1: "2006",
    q2: "5",
    q3: "Hornets",
    q4: ["8", "24"] // multiple correct answers
  };

  let score = 0;

  // Single-answer questions (radio buttons)
  ["q1", "q2", "q3"].forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  });

  // Multi-answer question (checkboxes)
  const selectedCheckboxes = Array.from(document.querySelectorAll('input[name="q4"]:checked')).map(cb => cb.value);
  const correctAnswers = answers.q4;

  // Check if selected checkboxes match the correct answers (exact match)
  const isCorrectQ4 = 
    selectedCheckboxes.length === correctAnswers.length &&
    selectedCheckboxes.every(val => correctAnswers.includes(val));

  if (isCorrectQ4) {
    score++;
  }

  const resultText = `You scored ${score}/4.`;
  document.getElementById("quiz-result-kb").textContent = resultText;
});

// Email button handler
document.getElementById("send-button-kb").addEventListener("click", function () {
  const resultText = document.getElementById("quiz-result-kb").textContent.trim();
  const email = document.getElementById("email-kb").value;

  if (email && resultText) {
    const mailtoLink = `mailto:${email}?subject=Kobe Bryant Quiz Results&body=${encodeURIComponent(resultText)}`;
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