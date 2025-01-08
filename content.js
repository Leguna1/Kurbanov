const carouselContainer = document.querySelector('.carousel-container');
const articleTitleContainer = document.querySelector('.child-container-1')
const articleTextContainer = document.querySelector('.child-container-3')
const prevButton = document.querySelector('.prev-article-button');
const nextButton = document.querySelector('.next-article-button');


let currentArticle = 0;
let currentCardIndex = 0;
let autoSwitchInterval;
let isModalOpen = false; // Flag to track modal state
const articles = [
    {
        title: "Article Title 1",
        text: "This is example article text for article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        images: [
            "image1.jpg",
            "image2.jpg",
            "image3.jpg",
            "image4.jpg",
            "image5.jpg",
        ]
    },
    {
        title: "Article Title 2",
        text: "This is example article text for article 2. Some other text here, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        images: [
            "image1.jpg",
            "image2.jpg",
            "image3.jpg"
        ]
    },
    {
        title: "Article Title 3",
        text: "This is example article text for article 3. Some other text here, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        images: [
            "image4.jpg",
            "image5.jpg",
        ]
    }
]
  function calculateCircularOffset(index, currentCardIndex, cardCount) {
    const radius = 300; // Radius of the circular carousel
    const angleStep = (2 * Math.PI) / cardCount; // Angle between each card
    const angle = angleStep * ((index - currentCardIndex + cardCount) % cardCount);

    const xOffset = radius * Math.sin(angle); // X-coordinate based on angle
    const zOffset = radius * Math.cos(angle); // Z-coordinate based on angle

    return { x: xOffset, z: zOffset };
}

function initializeCardsPositions() {
    const cards = document.querySelectorAll('.carousel-card');
    if (cards.length === 0) return;

    currentCardIndex = 0; // Reset current card index to 0
    const cardCount = cards.length;

    cards.forEach((card, i) => {
        const offset = calculateCircularOffset(i, currentCardIndex, cardCount);
        card.style.transform = `translate(-50%, -50%) translateX(${offset.x}px) translateZ(${offset.z}px)`;

        if (i === currentCardIndex) {
            card.style.zIndex = 5; // Highlight the active card
			
        } else {
            card.style.zIndex = 1; // Dim non-active cards
			
        }
    });
}


function switchImage(direction) {
    const cards = document.querySelectorAll('.carousel-card');
    if (cards.length <= 1) return;

    if (direction === 'next') {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
    } else if (direction === 'prev') {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    }

    const cardCount = cards.length;
    cards.forEach((card, i) => {
        const offset = calculateCircularOffset(i, currentCardIndex, cardCount);
        card.style.transform = `translate(-50%, -50%) translateX(${offset.x}px) translateZ(${offset.z}px)`;

        if (i === currentCardIndex) {
            card.style.zIndex = 5;
        } else {
            card.style.zIndex = 1;
        }
    });
}

function updateArticle(index) {
    const article = articles[index];
    articleTitleContainer.innerHTML = `<div class="article-title">${article.title}</div>`;
    articleTextContainer.innerHTML = `<div class="article-text">${article.text}</div>`;

    carouselContainer.innerHTML = `
        <button class="carousel-button prev-carousel-button"><</button>
        <button class="carousel-button next-carousel-button">></button>
    `;

    article.images.forEach((image, i) => {
        const card = document.createElement('div');
        card.classList.add('carousel-card');
        card.innerHTML = `<img src="${image}" alt="Carousel Image ${i + 1}">`;
        card.addEventListener('click', () => openModal(i));
        carouselContainer.appendChild(card);
    });

    document.querySelector('.prev-carousel-button').addEventListener('click', () => switchImage('prev'));
    document.querySelector('.next-carousel-button').addEventListener('click', () => switchImage('next'));

    currentCardIndex = 0;
    initializeCardsPositions();
    resetAutoSwitchTimer();
}
function startAutoSwitching() {
    autoSwitchInterval = setInterval(() => {
        if (!isModalOpen) {
            currentArticle = (currentArticle + 1) % articles.length;
            updateArticle(currentArticle);
        }
    }, 5000); // Switch every 5 seconds
}

function resetAutoSwitchTimer() {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = setInterval(() => switchImage('next'), 50000);
}

function openModal(startIndex) {
    let modalIndex = startIndex;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <button class="modal-prev"><</button>
            <img src="${articles[currentArticle].images[modalIndex]}" class="modal-image" alt="Modal Image">
            <button class="modal-next">></button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.remove();
    };

    const updateModalImage = () => {
        const modalImage = modal.querySelector('.modal-image');
        modalImage.src = articles[currentArticle].images[modalIndex];
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-prev').addEventListener('click', () => {
        modalIndex = (modalIndex - 1 + articles[currentArticle].images.length) % articles[currentArticle].images.length;
        updateModalImage();
    });
    modal.querySelector('.modal-next').addEventListener('click', () => {
        modalIndex = (modalIndex + 1) % articles[currentArticle].images.length;
        updateModalImage();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

prevButton.addEventListener('click', () => {
    currentArticle = (currentArticle - 1 + articles.length) % articles.length;
    updateArticle(currentArticle);
});
nextButton.addEventListener('click', () => {
    currentArticle = (currentArticle + 1) % articles.length;
    updateArticle(currentArticle);
});

// Initialize with the first article
updateArticle(currentArticle);

// Start auto-switching the carousel
resetAutoSwitchTimer();