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