const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Intersection Observer for reveal effect
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe statically added reveal elements
document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});


// Skills List
const skills = [
    "Python", "SQL", "Power BI", "Machine Learning",
    "Data Visualisation", "Pandas", "NumPy",
    "Excel", "Git", "Data Cleaning"
];

const skillsList = document.getElementById("skillsList");
skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    li.classList.add("reveal");
    skillsList.appendChild(li);
    revealObserver.observe(li);
});

// Fetch GitHub Projects
const githubUsername = "Ankur-Halder";
fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
        const projectsGrid = document.getElementById("projectsGrid");
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("project-card", "reveal");
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description provided."}</p>
                <a href="${repo.html_url}" target="_blank" class="repo-link">> View Repository</a>
            `;
            projectsGrid.appendChild(card);
            // Observe the newly created card
            revealObserver.observe(card);
        });
    })
    .catch(err => console.error(err));
