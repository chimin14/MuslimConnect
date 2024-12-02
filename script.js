// Get the sidebar button and navigation drawer
const sidebarButton = document.getElementById('sidebarButton');
const drawerNavigation = document.getElementById('drawer-navigation');

// Toggle sidebar visibility
sidebarButton.addEventListener('click', () => {
    drawerNavigation.classList.toggle('hidden-sidebar'); // Add or remove the hidden class
});

// Close sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!drawerNavigation.contains(event.target) && !sidebarButton.contains(event.target)) {
        drawerNavigation.classList.add('hidden-sidebar'); // Hide sidebar
    }
});

// Close sidebar when clicking on navigation links
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        // Get the target section ID from the link's href
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            event.preventDefault(); // Prevent default anchor click behavior
            // Scroll smoothly to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close the sidebar
        drawerNavigation.classList.add('hidden-sidebar');
    });
});
