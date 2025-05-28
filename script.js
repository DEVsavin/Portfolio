document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 50) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

   
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

  
    const projectList = document.getElementById('project-list');
    const username = 'DEVsavin';

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                projectList.innerHTML = `<p>Erro ao carregar projetos: ${data.message}</p>`;
                return;
            }

            projectList.innerHTML = ''; 

            data.forEach(repo => {
                const projectItem = document.createElement('div');
                projectItem.classList.add('project-item');

                const projectName = document.createElement('h3');
                projectName.textContent = repo.name;

                const projectDescription = document.createElement('p');
                projectDescription.textContent = repo.description || 'Sem descrição disponível.';

                const projectLink = document.createElement('a');
                projectLink.href = repo.html_url;
                projectLink.textContent = 'Ver no GitHub';
                projectLink.target = '_blank';
                projectLink.classList.add('project-link');

                projectItem.appendChild(projectName);
                projectItem.appendChild(projectDescription);
                projectItem.appendChild(projectLink);
                projectList.appendChild(projectItem);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios do GitHub:', error);
            projectList.innerHTML = `<p>Erro ao carregar projetos: ${error.message}</p>`;
        });
});