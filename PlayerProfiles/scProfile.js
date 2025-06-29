const frame = document.getElementById('frame-sc');
const totalFrames = 188;
const scrollRange = window.innerHeight * totalFrames * 0.5;

const backButton = document.getElementById('back-button-sc');
const returnTopButton = document.getElementById('return-top-btn-sc');
const skipButton = document.getElementById('skip-button-sc');

const playButton = document.getElementById('playMixtape-sc');
let isAutoScrolling = false;
let autoScrollInterval;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const progress = scrollTop / scrollRange;
    const frameIndex = Math.min(totalFrames, Math.max(1, Math.floor(progress * totalFrames)));

    frame.src = "./scMixtape/scFrame (" + frameIndex + ").jpg";

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

const slides = document.querySelectorAll(".timeline-slide-sc");
let currentSlide = 0;

document.querySelector(".timeline-next-sc").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-sc");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active-sc");
});

document.querySelector(".timeline-prev-sc").addEventListener("click", () => {
  slides[currentSlide].classList.remove("active-sc");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active-sc");
});


document.getElementById("quiz-form-sc").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = {
    q1: "2015",
    q2: "4",
    q3: "Davidson",
    q4: "Warriors"
  };

  let score = 0;
  Object.keys(answers).forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  });

  const resultText = `You scored ${score}/4.`;
  document.getElementById("quiz-result-sc").textContent = resultText;
});

// Email button handler
document.getElementById("send-button-sc").addEventListener("click", function () {
  const resultText = document.getElementById("quiz-result-sc").textContent.trim();
  const email = document.getElementById("email-sc").value;

  if (email && resultText) {
    const mailtoLink = `mailto:${email}?subject=Stephen Curry Quiz Results&body=${encodeURIComponent(resultText)}`;
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