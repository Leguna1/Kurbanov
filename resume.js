// Define the contents for each section using arrays
const experienceData = [
  {
    title: "Customer Service Agent",
    company: "Transcom AB, Örebro | 2021 - 2023",
    responsibilities: 
	[
      "As a customer service agent, my main responsiblities was to welcome incoming calls, help the customers with any kind of problem ranging from billing issues, technical issues to making the right decision when it came to purchasing products and subscriptions.",
      "Most part of my time at Transcom, I worked on phone but also worked as a chat agent about six months."
    ]
  },
  {
    title: "Field Sales Agent",
    company: "Innovative Sales AB, Stockholm | 2019 - 2020",
    responsibilities: 
	[
      "I worked as a field salesperson about a year, my main responsiblities was to visit potential customers at their home and introduce Telenor's subscriptions for both mobile, broadband and tv-channels. This job all over Sweden, alot traveling with a team different city each month. It was fun and I was happy until covid-pandemic forced us to retreat and consider remote works."
    ]
  },
  {
    title: "Appointment Booker",
    company: "Aldovo AB, Örebro | 2019 - 2020",
    responsibilities: 
	[
      "My main responsiblities as appointment booker was to make cold calls and inform people about new dentist clinic at town and help them book an appointment if they could use one. I learned alot about using my voice as a tool and get comfortable with communication over phone."
    ]
  },
  {
    title: "Recruiter",
    company: "The Red Cross Organisation, Örebro | 2018 - 2018",
    responsibilities: 
	[
      "After returning to my home town I signed up work with charity, my responsiblity here was to find people who was willing to donate. I worked both on market places and pitched by passers and visited people at their home. I had a good feeling at this job but couldnt help but wonder what else I could do."
    ]
  },
  {
    title: "Field Sales Agent",
    company: "Viasat AB, Stockholm | 2017 - 2017",
    responsibilities: 
	[
      "My responsiblities at Viasat was to sell tv-channel subscription around Stockholm, together with my team we visited people at their home and presented company's tv-channel solutions. Initially I signed up for this job mostly because I had a poor first time experience 2014, and I kinda wanted a rematch to prove myself something."
    ]
  },
  {
    title: "Customer Service Agent",
    company: "Transcom WorldWide AB, Riga | 2016 - 2017",
    responsibilities: 
	[
      "I had a feeling for adventure, to see new places so I took the opportunity to work as customer service agent, my main responsiblities was to welcome Netflix customer who had billing or technical issues. I worked almost half a year before had enough fun and wanted to return home."
    ]
  },
  {
    title: "Field Sales Agent",
    company: "Viafield AB, Stockholm | 2014 - 2016",
    responsibilities: 
	[
      "It is here I really learned about sales and managed to shake off the shyness I had in meeting with new people, I worked about 18 months, traveled to all over the Sweden, different cities each week or every month with the teams I was given. My main responsiblities was to visit people at their home and negotiate new terms for tv-channel, broadband and homephone subscriptions."
    ]
  },
  {
    title: "Event Sales Agent",
    company: "Viasat Field AB, Stockholm | 2014 - 2014",
    responsibilities: 
	[
      "About two weeks after graduation from high-school, I managed to land my first job as a salesman. It was really challenging because I was quite one but the people I had chance to work with was really friendly and helpful, despite all the help I got making the sales numbers proved to difficult for me and I stayed only 3 months."
    ]
  },
];

const educationData = 
[
  {
    degree: "Primary School",
    school: "Klockarhagsskolan, Hällefors, Örebro Municipality | 2007 - 2011"
	
  },
  {
    degree: "High School",
    school: "Karolinska Skolan, Örebro | 2011 - 2014"
  },
  {
    degree: "Undergraduate",
    school: "Business School, Örebro | 2020 - 2021"
  },
  {
    degree: "Undergraduate",
    school: "Forsberg's Skolan, Stockholm | 2023 - 2025"
  },
];

const skillsData = [
  "Unity (C#), Unreal (Blueprints, C++)",
  "Agile Development",
  "Object-Oriennted Programming",
  "Gameplay Systems, AI/Combat Design",
  "Optimization, Version Control (Git)",
  "Problem-solving and debugging",
  "Good Communication & People-skills"
];

const interestsData = [
  "Gaming, Fantasy Novels",
  "AI and Gameplay Systems",
  "Philosophy, psychology",
  "Anime, Movies"
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
  // Education Section
  const educationSection = document.getElementById('education');
  educationData.forEach(item => {
    const educationDiv = document.createElement('div');
    educationDiv.innerHTML = `
      <h3>${item.degree}</h3>
      <p class="school">${item.school}</p>
    `;
    educationSection.appendChild(educationDiv);
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
