const allImages = [
  "Img/galery-1.png",
  "Img/galery-2.png",
  "Img/galery-3.png",
  "Img/galery-4.png",
  "Img/galery-5.png"
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
  modalImage.src = imageList[currentIndex];
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

const displayImages = [
  document.getElementById("img0"),
  document.getElementById("img1"),
  document.getElementById("img2")
];

function updateGallery() {
  // fade out
  displayImages.forEach(img => img.classList.add("fade-out"));

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % allImages.length;
      displayImages[i].src = allImages[index];
      displayImages[i].dataset.index = index;
    }

    // fade in
    displayImages.forEach(img => {
      img.classList.remove("fade-out");
      img.classList.add("fade-in");
    });
  }, 300);
}

// auto geser tiap 3 detik
setInterval(() => {
  startIndex = (startIndex + 1) % allImages.length;
  updateGallery();
}, 3000);

// init pertama
updateGallery();
