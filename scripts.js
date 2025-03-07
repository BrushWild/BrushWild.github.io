// Theme toggle functionality with enhanced animation
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.material-symbols-rounded');

// Set initial theme (dark mode by default)
document.documentElement.setAttribute('data-theme', 'dark');

// Function to toggle theme with smooth transition
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const newIcon = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
    
    // Add transition class for smooth animation
    document.documentElement.classList.add('theme-transition');
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newIcon;
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 1000);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Add click event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
}

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuBtn.querySelector('.material-symbols-rounded');

menuBtn.style.display = 'block';

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    // Toggle between menu and close icons
    menuIcon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        menuIcon.textContent = 'menu';
    }
});

// Contact form submission handler
function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Initialize EmailJS with your public key
    emailjs.init("NSY4j2wW3Slq4vLYL");

    // Send email using EmailJS
    emailjs.send("service_4kwzyxd", "template_r38w6p8", {
        to_email: "asneakymonkey+githubio@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
    }).then(
        function(response) {
            console.log("SUCCESS", response);
            event.target.reset();
            alert('Message sent successfully!');
        },
        function(error) {
            console.log("FAILED", error);
            alert('Failed to send message. Please try again.');
        }
    );

    return false;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const projects = [
    {
        title: "Diceware Password Generator",
        image: `images/dice/dice-${getRandomInt(1, 6)}.svg`,
        description: "Generate diceware passwords for your diceware password manager.",
        github: "https://github.com/BrushWild/DicewareV2",
        hasDemo: true,
        demoUrl: "https://brushwild.github.io/DicewareV2/"
    },
    {
        title: "Diceware Password Generator",
        image: `images/dice/dice-${getRandomInt(1, 6)}.svg`,
        description: "Generate diceware passwords for your diceware password manager.",
        github: "https://github.com/BrushWild/DicewareV2",
        hasDemo: true,
        demoUrl: "https://brushwild.github.io/DicewareV2/"
    }
    // {
    //     title: "Project 2",
    //     image: "images/project2.jpg",
    //     description: "Description of project 2.",
    //     github: "https://github.com/yourusername/project2"
    // },
    // {
    //     title: "Project 3",
    //     image: "images/project3.jpg",
    //     description: "Description of project 3.",
    //     github: "https://github.com/yourusername/project3"
    // }
];

function loadProjects() {
    console.log('Initializing project loading...');
    const container = document.querySelector(".projects-grid");
    if (!container) {
        console.error("Projects grid container not found!");
        return;
    }

    try {
        console.log(`Found ${projects.length} projects to load`);
        console.log('Clearing existing content...');
        container.innerHTML = ""; // Clear existing content

        projects.forEach((project, index) => {
            console.log(`Loading project ${index + 1}/${projects.length}: ${project.title}`);
            const projectElement = document.createElement("div");
            projectElement.classList.add("project-card");

            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" width="128" height="128">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-buttons">
                    <a href="${project.github}" target="_blank" class="btn primary">View on GitHub</a>
                    ${project.hasDemo ? `<a href="${project.demoUrl}" target="_blank" class="btn secondary">Try Demo</a>` : ''}
                </div>
            `;

            container.appendChild(projectElement);
        });
        console.log('Successfully loaded all projects');
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);