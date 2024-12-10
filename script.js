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

// Arrow Scroll Functionality
const scrollArrow = document.getElementById('scrollArrow');

scrollArrow.addEventListener('click', () => {
    const nextSection = document.querySelector('section:nth-of-type(2)'); // Adjust this to target the next section
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});
    // Translation API Functionality
    const API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-ar";
    const API_TOKEN = "Replace with your actual API token"; 

    async function translateText(text) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: text }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            return result[0]?.translation_text || "Translation failed.";
        } catch (error) {
            console.error("Translation Error:", error);
            return "An error occurred during translation.";
        }
    }

    // Translate Button
    const translateButton = document.getElementById("translate-button");
    const contentToTranslate = document.getElementById("content-to-translate");
    const translatedContent = document.getElementById("translated-content");

    translateButton.addEventListener("click", async () => {
        if (!contentToTranslate) {
            console.error("Content to translate not found.");
            return;
        }

        const originalText = contentToTranslate.textContent;
        translatedContent.textContent = "Translating...";

        const translatedText = await translateText(originalText);
        translatedContent.textContent = translatedText;
    });
