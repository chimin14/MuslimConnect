// Sidebar Functionality
const sidebarButton = document.getElementById('sidebarButton');
const drawerNavigation = document.getElementById('drawer-navigation');

// Toggle sidebar visibility
sidebarButton.addEventListener('click', () => {
    drawerNavigation.classList.toggle('hidden-sidebar');
});

// Close sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!drawerNavigation.contains(event.target) && !sidebarButton.contains(event.target)) {
        drawerNavigation.classList.add('hidden-sidebar');
    }
});

// Smooth Scrolling for Navigation Links
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            event.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        drawerNavigation.classList.add('hidden-sidebar');
    });
});

// Dynamic Data Loading from JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateSection('restaurants-container', data.restaurants);
            populateSection('hotels-container', data.hotels);
            populateSection('mosques-container', data.mosques);
            populateSection('events-container', data.events, true); // Events have slightly different structure
        })
        .catch(error => console.error('Error loading data:', error));
});

// Function to Populate Sections
function populateSection(containerId, items, isEvent = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    items.forEach(item => {
        const card = `
            <a href="${item.website || item.link}" target="_blank" rel="noopener noreferrer" class="block">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <img src="${item.image}" alt="${item.name || item.title}" class="w-full h-60 object-cover">
                    <div class="p-6 text-center">
                        <h3 class="font-bold text-xl text-darkGreen">${item.name || item.title}</h3>
                        <p class="text-sm text-gray-700"><strong>${isEvent ? 'Where?' : 'Address:'}</strong> ${item.address || item.location}</p>
                        <p class="text-sm text-gray-700"><strong>${isEvent ? 'When?' : 'Phone:'}</strong> ${item.phone || item.date}</p>
                        ${!isEvent && item.workingTime ? `<p class="text-sm text-gray-700"><strong>Working Time:</strong> ${item.workingTime}</p>` : ''}
                    </div>
                </div>
            </a>
        `;
        container.innerHTML += card;
    });
}
