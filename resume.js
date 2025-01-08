// Define the contents for each section using arrays
const experienceData = [
  {
    title: "Software Engineer",
    company: "Company ABC | 2018 - 2022",
    responsibilities: [
      "Developed and maintained software solutions.",
      "Collaborated with cross-functional teams to ensure smooth product delivery.",
      "Implemented new features based on client requirements."
    ]
  },
  {
    title: "Junior Developer",
    company: "Company XYZ | 2016 - 2018",
    responsibilities: [
      "Assisted in software development and maintenance.",
      "Worked on debugging and troubleshooting issues.",
      "Contributed to code reviews and improving development processes."
    ]
  }
];

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University XYZ | 2014 - 2018"
  }
];

const skillsData = [
  "Proficient in Java, Python, and JavaScript",
  "Experience with web development frameworks like React and Angular",
  "Database management with MySQL and MongoDB",
  "Strong problem-solving and debugging skills"
];

const interestsData = [
  "Open-source software development",
  "AI and Machine Learning",
  "Traveling and photography"
];

// Dynamically populate the sections with data from arrays
function populateResume() {
  // Experience Section
  const experienceSection = document.getElementById('experience');
  experienceData.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');
    jobDiv.innerHTML = `
      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>
      <ul>
        ${job.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
      </ul>
    `;
    experienceSection.appendChild(jobDiv);
  });

  // Education Section
  const educationSection = document.getElementById('education');
  educationData.forEach(item => {
    educationSection.innerHTML = `
      <h2>Education</h2>
      <p>${item.degree}</p>
      <p class="school">${item.school}</p>
    `;
  });

  // Skills Section
  const skillsSection = document.getElementById('skills');
  skillsSection.innerHTML = `
    <h2>Skills</h2>
    <ul>
      ${skillsData.map(skill => `<li>${skill}</li>`).join('')}
    </ul>
  `;

  // Interests Section
  const interestsSection = document.getElementById('interests');
  interestsSection.innerHTML = `
    <h2>Interests</h2>
    <ul>
      ${interestsData.map(interest => `<li>${interest}</li>`).join('')}
    </ul>
  `;
}

// Generate the resume when the page loads
window.onload = populateResume;

// Download button functionality
document.getElementById("download-pdf").addEventListener("click", function () {
  const content = document.getElementById("resume");

  const options = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate and download the PDF
  html2pdf().set(options).from(content).save();
});
