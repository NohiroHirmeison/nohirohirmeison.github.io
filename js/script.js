const allImages = [
  { src: "Img/galery-1.png", label: "Semester 1" },
  { src: "Img/galery-2.png", label: "Semester 2" },
  { src: "Img/galery-3.png", label: "Semester 3" },
  { src: "Img/galery-4.png", label: "Semester 4" },
  { src: "Img/galery-5.png", label: "Semester 5" }
];

const imageList = allImages;

const nav = document.getElementById('nav');

window.addEventListener('scroll', function() {
    let scrollposition = window.scrollY;

    if (scrollposition >= 60) {
        nav.classList.add('nav-dark');
    } else {
        nav.classList.remove('nav-dark');
    }
});

// ===== GALLERY =====
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
  if (!imageList[currentIndex]) return;
  modalImage.src = imageList[currentIndex].src;
}

// tombol next prev
document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  showImage();
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  showImage();
};

// ===== AUTO SLIDE =====
let startIndex = 0;
let isAnimating = false;

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
  if (isAnimating) return; // cegah glitch
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

// auto geser tiap 3 detik
let autoSlide = setInterval(() => {
  startIndex = (startIndex + 1) % allImages.length;
  updateGallery();
}, 10000);

// init pertama
updateGallery();

document.getElementById("nextGallery").onclick = () => {
  startIndex = (startIndex + 1) % allImages.length;
  updateGallery();

  resetAutoSlide();
};

document.getElementById("prevGallery").onclick = () => {
  startIndex = (startIndex - 1 + allImages.length) % allImages.length;
  updateGallery();

  resetAutoSlide();
};

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    startIndex = (startIndex + 1) % allImages.length;
    updateGallery();
  }, 10000);
}
