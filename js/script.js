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

const imageList = Array.from(images).map(img => img.src);

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
