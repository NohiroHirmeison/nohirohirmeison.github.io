// ===== DATA =====
const allImages = [
  { src: "Img/galery-1.png", label: "1st Semester - Cryptography App" },
  { src: "Img/galery-2.png", label: "2nd Semester - Chat & Socket Programming" },
  { src: "Img/galery-3.png", label: "3rd Semester - SIEM Implementation" },
  { src: "Img/galery-4.png", label: "4th Semester - SIEM, Defend & Attack" },
  { src: "Img/galery-5.png", label: "5th Semester - VA & Pentest" }
];

// ===== NAVBAR =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
  let scrollposition = window.scrollY;

  if (scrollposition >= 60) {
    nav.classList.add('nav-dark');
  } else {
    nav.classList.remove('nav-dark');
  }
});

// ===== MODAL =====
const images = document.querySelectorAll(".gallery-img");
const modalImage = document.getElementById("modalImage");
const modal = new bootstrap.Modal(document.getElementById('galleryModal'));

let currentIndex = 0;

images.forEach(img => {
  img.addEventListener("click", () => {
    const index = parseInt(img.dataset.index);
    currentIndex = !isNaN(index) ? index : 0;

    showImage();
    modal.show();
  });
});

function showImage() {
  if (!allImages[currentIndex]) return;
  modalImage.src = allImages[currentIndex].src;
}

// tombol modal
document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % allImages.length;
  showImage();
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  showImage();
};

// ===== GALLERY =====
let startIndex = 0;
let isAnimating = false;
let autoSlide;

const displayImages = [
  document.getElementById("img0"),
  document.getElementById("img1"),
  document.getElementById("img2")
];

const displayLabels = [
  document.getElementById("label0"),
  document.getElementById("label1"),
  document.getElementById("label2")
];

function updateGallery() {
  if (isAnimating) return;
  isAnimating = true;

  // fade out
  displayImages.forEach(img => img.classList.add("fade-out"));

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % allImages.length;

      displayImages[i].src = allImages[index].src;
      displayImages[i].dataset.index = index;
      displayLabels[i].textContent = allImages[index].label;
    }

    // fade in
    displayImages.forEach(img => img.classList.remove("fade-out"));

    isAnimating = false;
  }, 500);
}

// ===== AUTO SLIDE =====
function startAutoSlide() {
  autoSlide = setInterval(() => {
    if (isAnimating) return;

    startIndex = (startIndex + 1) % allImages.length;
    updateGallery();
  }, 10000); // 10 detik
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// ===== BUTTON CONTROL =====
document.getElementById("nextGallery").onclick = () => {
  if (isAnimating) return;

  startIndex = (startIndex + 1) % allImages.length;
  updateGallery();
  resetAutoSlide();
};

document.getElementById("prevGallery").onclick = () => {
  if (isAnimating) return;

  startIndex = (startIndex - 1 + allImages.length) % allImages.length;
  updateGallery();
  resetAutoSlide();
};

// ===== INIT =====
updateGallery();
startAutoSlide();

// ===== MUSIC + POPUP =====
const enterBtn = document.getElementById("enterBtn");
const popup = document.getElementById("welcomePopup");
const music = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

let isMuted = false;

// volume default
music.volume = 0.4;

// masuk website
enterBtn.onclick = () => {
  popup.style.opacity = "0";
  popup.style.pointerEvents = "none";

  setTimeout(() => {
    popup.style.display = "none";
  }, 500);

  music.play();
};

// mute toggle
muteBtn.onclick = () => {
  isMuted = !isMuted;
  music.muted = isMuted;

  muteBtn.textContent = isMuted ? "🔇" : "🔊";
};
