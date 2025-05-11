document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');

    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        
        // Ocultar el botón de login y mostrar el de logout
        loginBtn.classList.add('d-none');
        logoutBtn.classList.remove('d-none');
        
        // Mostrar mensaje de bienvenida
        const welcomeText = document.createElement('span');
        welcomeText.className = 'me-3';
        welcomeText.textContent = `Benvingut ${username}`;
        loginBtn.parentNode.insertBefore(welcomeText, loginBtn);
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(loginModal);
        modal.hide();
        
        // Limpiar el formulario
        loginForm.reset();
    });

    // Manejar el logout
    logoutBtn?.addEventListener('click', function() {
        // Ocultar el botón de logout y mostrar el de login
        logoutBtn.classList.add('d-none');
        loginBtn.classList.remove('d-none');
        
        // Eliminar el mensaje de bienvenida
        const welcomeText = document.querySelector('.me-3');
        welcomeText?.remove();
    });

    // Actualizar breadcrumb según la página actual
    function updateBreadcrumb() {
        const path = window.location.pathname;
        const breadcrumb = document.querySelector('.breadcrumb');
        
        if (!breadcrumb) return;

        if (path === '/' || path === '/index.html') {
            breadcrumb.innerHTML = '<li class="breadcrumb-item active" aria-current="page">Inicio</li>';
        } else {
            const pathParts = path.split('/').filter(part => part);
            let breadcrumbHtml = '<li class="breadcrumb-item"><a href="/">Inicio</a></li>';
            
            pathParts.forEach((part, index) => {
                const isLast = index === pathParts.length - 1;
                const text = part.split('.')[0].charAt(0).toUpperCase() + part.split('.')[0].slice(1);
                
                if (isLast) {
                    breadcrumbHtml += `<li class="breadcrumb-item active" aria-current="page">${text}</li>`;
                } else {
                    breadcrumbHtml += `<li class="breadcrumb-item"><a href="/${pathParts.slice(0, index + 1).join('/')}">${text}</a></li>`;
                }
            });
            
            breadcrumb.innerHTML = breadcrumbHtml;
        }
    }

    // Manejar la paginación
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    const itemsPerPage = 4; // Número de items por página
    const items = document.querySelectorAll('.row.row-cols-1 .col');
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageText = e.target.textContent;

            if (pageText === 'Anterior' && currentPage > 1) {
                currentPage--;
            } else if (pageText === 'Siguiente' && currentPage < Math.ceil(items.length / itemsPerPage)) {
                currentPage++;
            } else if (!isNaN(pageText)) {
                currentPage = parseInt(pageText);
            }

            // Actualizar estado activo de los botones
            paginationLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.textContent === currentPage.toString()) {
                    link.parentElement.classList.add('active');
                }
            });

            showPage(currentPage);
        });
    });

    // Mostrar la primera página inicialmente
    showPage(1);

    // Llamar a la función de actualización del breadcrumb
    updateBreadcrumb();
});