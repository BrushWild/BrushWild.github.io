// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.material-symbols-rounded');

// Set initial theme (dark mode by default)
document.documentElement.setAttribute('data-theme', 'dark');

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const newIcon = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newIcon;
    
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

//     // Log form data to console
//     console.log('Form submission:', formData);

//     // Clear form
//     event.target.reset();

//     // Show success message (you can enhance this with a proper UI notification)
//     alert('Message sent successfully!');

//     return false;
// }