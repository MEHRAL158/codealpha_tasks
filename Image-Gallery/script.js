// ======================================
// Select Elements
// ======================================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// ======================================
// Create Image List
// ======================================

let currentImages = [];
let currentIndex = 0;


// ======================================
// Update Image List
// ======================================

function updateImageList() {

    currentImages = [];

    galleryItems.forEach(function(item) {

        if (item.style.display !== "none") {

            const image = item.querySelector("img");

            currentImages.push(image);
        }

    });
}


// ======================================
// Open Lightbox
// ======================================

function openLightbox(index) {

    updateImageList();

    currentIndex = index;

    showImage();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


// ======================================
// Show Current Image
// ======================================

function showImage() {

    if (currentImages.length === 0) {
        return;
    }

    const image = currentImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    imageCounter.textContent =
        (currentIndex + 1) + " / " + currentImages.length;
}


// ======================================
// Close Lightbox
// ======================================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}


// ======================================
// Next Image
// ======================================

function showNextImage() {

    if (currentImages.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();
}


// ======================================
// Previous Image
// ======================================

function showPreviousImage() {

    if (currentImages.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    showImage();
}


// ======================================
// Open Image When Clicked
// ======================================

galleryItems.forEach(function(item) {

    item.addEventListener("click", function() {

        updateImageList();

        const image = item.querySelector("img");

        const index = currentImages.indexOf(image);

        openLightbox(index);

    });

});


// ======================================
// Button Events
// ======================================

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNextImage);

prevBtn.addEventListener("click", showPreviousImage);


// ======================================
// Close Lightbox by Clicking Background
// ======================================

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ======================================
// Category Filtering
// ======================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        galleryItems.forEach(function(item) {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === itemCategory
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// ======================================
// Keyboard Controls
// ======================================

document.addEventListener("keydown", function(event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {

        showNextImage();

    }

    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});