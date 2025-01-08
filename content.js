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
        title: "Project X",
        text: "This is my 8-weeks long examination project, done in Unreal Engine 5 with Blueprint only. First 3-4 weeks I focused on creating damage system, projectiles, enemy AIs and different attacks. Then next two weeks I learned about level design and widgets, targeting logic, re-created the attacks for the player only with cooldowns. Last two weeks I mainly focused on animations, vfx and sounds and population of enemies and in the end I added a spellbook. This project was bigger than I imagined and I knew my aim was too big but I tried do as much as possible. I wanted to include inventory system too but failed to complete it but still I gained alot confidence and level-design, animations, widgets and creating different component systems are now less intimidating.",
        images: [
            "ProjectX1.1.png",
            "BarbarianKingLightingTrail.png",
            "MeleeEnemyBT.png",
            "ArcherEnemyBT.png",
            "BarbarianKingBT.png",
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