let currentSectionIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSections = slides.length;
const dotsContainer = document.querySelector('.dots');

// Initialize dots based on the number of slides
for (let i = 0; i < totalSections; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
}

// Set up event listeners
document.querySelector('.next').addEventListener('click', showNextSection);
document.querySelector('.prev').addEventListener('click', showPrevSection);
dotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        const index = parseInt(event.target.dataset.index, 10);
        showSection(index);
    }
});

// Function to show the next slide
function showNextSection() {
    currentSectionIndex = (currentSectionIndex + 1) % totalSections;
    updateSectionPosition();
}

// Function to show the previous slide
function showPrevSection() {
    currentSectionIndex = (currentSectionIndex - 1 + totalSections) % totalSections;
    updateSectionPosition();
}

// Function to update slide position and dot indicators
function updateSectionPosition() {
    const slidesContainer = document.querySelector('.slides');
    const newTransformValue = -currentSectionIndex * 100;
    slidesContainer.style.transform = `translateX(${newTransformValue}%)`;
    updateDots();
}

// Function to update the active dot indicator
function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSectionIndex);
    });
}

// Function to show a specific section and update dots
function showSection(index) {
    currentSectionIndex = index;
    updateSectionPosition();
}

// Set up image carousel
let imageChangeInterval;
document.addEventListener('DOMContentLoaded', (event) => {
    startImageCarousel();
});

function startImageCarousel() {
    imageChangeInterval = setInterval(changeImage, 3000);
}

function changeImage() {
    const activeSlide = slides[currentSectionIndex];
    const images = activeSlide.querySelectorAll('.image-section img');
    const activeImage = activeSlide.querySelector('.image-section img.active');
    let activeImageIndex = Array.from(images).indexOf(activeImage);

    activeImage.classList.remove('active');
    activeImageIndex = (activeImageIndex + 1) % images.length;
    images[activeImageIndex].classList.add('active');
}
