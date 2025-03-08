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

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call setActiveNavLink on page load
setActiveNavLink();

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
        description: "Generate cryptographically secure passphrases using true random number simulation. This implementation follows the classic Diceware method, creating memorable yet strong passwords by combining randomly selected words. Perfect for securing accounts while maintaining human-memorability.",
        github: "https://github.com/BrushWild/DicewareV2",
        hasDemo: true,
        demoUrl: "https://brushwild.github.io/DicewareV2/",
        categories: ["web"]
    },
    {
        title: "Dummy Project",
        image: `images/github.svg`,
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Curae mollis congue torquent; libero neque felis pharetra.",
        github: "https://github.com/BrushWild",
        categories: ["web", "game"]
    }
];

function rollDice(imgElement) {
    let currentRoll = 1;
    const rollInterval = setInterval(() => {
        currentRoll = (currentRoll % 6) + 1;
        imgElement.src = `images/dice/dice-${currentRoll}.svg`;
    }, 150);

    return rollInterval;
}

let activeFilter = 'all';

function filterProjects(category) {
    // console.log(`Filtering projects for category: ${category}`);
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // console.log(`Found ${projectCards.length} total project cards`);
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
    // console.log(`Updated active state of filter buttons`);
    
    activeFilter = category;
    
    // Filter projects
    let visibleCount = 0;
    projectCards.forEach(card => {
        const projectCategories = card.dataset.filter.split(',');
        if (category === 'all' || projectCategories.includes(category)) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // console.log(`Filtering complete: ${visibleCount} projects visible out of ${projectCards.length}`);
}

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
            projectElement.dataset.filter = project.categories.join(',');

            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" width="128" height="128">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-buttons">
                    <a href="${project.github}" target="_blank" class="btn primary">View on GitHub</a>
                    ${project.hasDemo ? `<a href="${project.demoUrl}" target="_blank" class="btn secondary">Try Me!</a>` : ''}
                </div>
            `;

            // Add dice rolling animation for Diceware Password Generator cards
            if (project.title === "Diceware Password Generator") {
                const diceImage = projectElement.querySelector('img');
                let rollInterval;

                projectElement.addEventListener('mouseenter', () => {
                    rollInterval = rollDice(diceImage);
                });

                projectElement.addEventListener('mouseleave', () => {
                    if (rollInterval) {
                        clearInterval(rollInterval);
                        diceImage.src = `images/dice/dice-${getRandomInt(1, 6)}.svg`;
                    }
                });
            }

            container.appendChild(projectElement);
        });

        // Apply initial filter
        filterProjects(activeFilter);
        
        console.log('Successfully loaded all projects');
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Add event listeners to filter buttons
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProjects(button.dataset.filter);
        });
    });
});

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);