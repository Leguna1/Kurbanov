const carouselContainer = document.querySelector('.carousel-container');
const articleTitleContainer = document.querySelector('.child-container-1')
const articleTextContainer = document.querySelector('.child-container-3')
const prevButton = document.querySelector('.prev-article-button');
const nextButton = document.querySelector('.next-article-button');


let currentArticle = 0;
let currentCardIndex = 0;
let autoSwitchInterval;
let isModalOpen = false; // Flag to track modal state
const articles = 
[
    {
        title: "Project X",
        text: "This is my 8-weeks long examination project, done in Unreal Engine 5 with Blueprint only. First 3-4 weeks I focused on creating damage system, projectiles, enemy AIs and different attacks. Then next two weeks I learned about level design and widgets, targeting logic, re-created the attacks for the player only with cooldowns, stats component with attack power, defence power and leveling which was used for both player and AI. Last two weeks I mainly focused on animations, vfx and sounds and population of enemies and in the end I added a spellbook and a simple mini-map. This project was bigger than I imagined and I knew my aim was too big but I tried do as much as possible. I tried to include inventory system too but failed to complete it but still I gained alot confidence and level-design, animations, widgets and creating different component systems are now less intimidating.",
        images: [
            "ProjectX1.1.png",
            "BarbarianKingLightingTrail.png",
            "MeleeEnemyBT.png",
            "ArcherEnemyBT.png",
            "BarbarianKingBT.png",
        ]
    },
	
    {
        title: "UE5 Project #2",
        text: "This was a 4 weeks long 2 man project, and my second attempt to create an action-rpg game in Unreal with Blueprints. First couple of weeks I learned about behavior trees, interfaces, enums and structs to create a simple enemy AI with sight, hearing and damage senses. All they did was chase and fight the player. I also tried to learn about quest system and managed to implement a simple quest system with location, kill, interaction objectives. I also created a very simple ability system with stealth, healing and attack abilities and the challenges I had here was ability system with cooldowns effects and sounds but I learned about materials and niagara system. The game loop was about 5 min long, player would accept a quest and fight the enemies with magic bolt, stealth and healing then fight the boss in the end to win.",
        images: [
            "ShaolinTemple.png",
            "TheFirstQuest.png",
			"EnemyMinions.png",
			"MysticPortal.png",
			"AICoreBT.png",
        ]
    },
	
    {
        title: "Hello Unreal",
        text: "This was my first Unreal Engine project ever, everything was so new and I was completely lost but we had to learn it quickly and create a local multiplayer game within 4 weeks time. My game idea was inspired by Sorceress's Garden from Runescape, a mini-game where the player has to sneak in to a garden and steal fruits without using any abilities against guards armed with magic powers. The player wouldnt take any damage but gets teleported out of the garden if he gets hit by a missile, to make it more competitive players would have to collect most gems along the way while trying to avoid sight-line of guards and looking for the big gems. In this project I spent a good deal of time being lost and trying out everything I could think of but managed with basic locomotion, projectiles and scoring system in the end and learned little about animations, materials and niagara system and some more.",
        images: [
            "GuardianGardenBackground.png",
            "GuardianGarden.png",
			"GuardianGarden2.png",
        ]
		
    },
	
	{
		title: "OpenGL",
		text: "This is my first real C++ project, the purpose of this 3 weeks long project was to learn C++ and know how game engines are made under the hood by doing it myself from scratch with OpenGL. The program has classes with single responsiblity, one storage class for vertices and indices data, one class take the data and binds them together and applies transform and colors etc. Most challenging part during this project was setting up was all the errors and debugging each step over and over again but I learned alot and wanted work with C++ more in the future mostly because doing things from scratch means the result will be the way I want it and I learn during each step of the process."
		images: [
		"openGL.png",
		"openGLmain.png",
		]
	},
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