const nav = document.getElementById('nav');

window.addEventListener('scroll', function() {
    scrollposition = this.window.scrollY;

    if (scrollposition >=60) {
        nav.classList.add('nav-dark');
    } else if (scrollposition <60) {
        nav.classList.remove('nav-dark')
    }
})

const images = document.querySelectorAll(".gallery-img");

const modalImage = document.getElementById("modalImage");
const modal = new bootstrap.Modal(document.getElementById('galleryModal'));

let currentIndex = 0;

const imageList = allImages;

images.forEach(img => {
  img.addEventListener("click", () => {
    currentIndex = parseInt(img.dataset.index);
    showImage();
    modal.show();
  });
});

function showImage() {
  modalImage.src = imageList[currentIndex];
}

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  showImage();
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  showImage();
};

// semua gambar project kamu
const allImages = [
  "Img/galery-1.png",
  "Img/galery-2.png",
  "Img/galery-3.png",
  "Img/galery-4.png",
  "Img/galery-5.png"
];

let startIndex = 0;

const displayImages = [
  document.getElementById("img0"),
  document.getElementById("img1"),
  document.getElementById("img2")
];

function updateGallery() {
  for (let i = 0; i < 3; i++) {
    const index = (startIndex + i) % allImages.length;
    displayImages[i].src = allImages[index];
    displayImages[i].dataset.index = index; // 🔥 penting
  }
}

setInterval(() => {
  startIndex = (startIndex + 1) % allImages.length;
  updateGallery();
}, 3000);

updateGallery();
