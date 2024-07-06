// Load portfolio data from JSON file
async function loadPortfolioData() {
    const response = await fetch('portfolio-data.json');
    return await response.json();
}

// Function to create project elements
function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.innerHTML = `
        <a href="${project.link}" target="_blank">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </a>
    `;
    return projectDiv;
}

// Function to create skill elements
function createSkillElement(skill) {
    const skillSpan = document.createElement('span');
    skillSpan.className = 'skill';
    skillSpan.textContent = skill;
    return skillSpan;
}

document.addEventListener('DOMContentLoaded', async () => {
    const portfolioData = await loadPortfolioData();
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.getElementById('contact-form');
    const projectsContainer = document.getElementById('projects-container');
    const skillsContainer = document.getElementById('skills-container');

    // Populate projects
    portfolioData.projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);

        // Add pop animation on hover
        projectElement.addEventListener('mouseenter', () => {
            projectElement.style.animation = 'pop 0.3s ease';
        });
        projectElement.addEventListener('animationend', () => {
            projectElement.style.animation = '';
        });
    });

    // Populate skills
    portfolioData.skills.forEach(skill => {
        skillsContainer.appendChild(createSkillElement(skill));
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission (for demonstration purposes)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Fade in sections on scroll
    const sections = document.querySelectorAll('section');
    const fadeInSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});