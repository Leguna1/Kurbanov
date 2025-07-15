const backgroundContainer = document.querySelector('.background-container');
const resumeButton = document.querySelector('.my-button2');

resumeButton.addEventListener('click', () => {
    // Open the resume page in a new tab
    window.open('resumee.html', '_blank');
});
resumeButton.addEventListener('click', () => {
    // Open the resume page in a new tab
    window.open('resume.html', '_blank');
});
function createSnowFlake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    const size = Math.random() * 6 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;

    backgroundContainer.appendChild(snowflake);

    // Remove snowflake when it's out of view
    snowflake.addEventListener('animationend', () => {
      snowflake.remove();
    });
}

setInterval(createSnowFlake, 300); // Create new snowflakes every 300ms