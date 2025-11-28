// Constants
const DOG_API_BASE = 'https://dog.ceo/api';
const CAT_BREEDS_API = 'https://catfact.ninja/breeds?limit=100'; // Get a good chunk of breeds
const CAT_IMAGE_BASE = 'https://cataas.com/cat';
const ITEMS_PER_PAGE = 9;

// State
let currentMode = 'dog'; // 'dog' | 'cat'
let allBreeds = [];
let currentPage = 1;

// DOM Elements
const heroSection = document.getElementById('hero-section');
const heroImg = document.getElementById('hero-img');
const heroName = document.getElementById('hero-name');
const btnRandom = document.getElementById('btn-random');
const gridContainer = document.getElementById('dog-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const btnDogMode = document.getElementById('btn-dog-mode');
const btnCatMode = document.getElementById('btn-cat-mode');

// --- Mode Switching ---

function setMode(mode) {
    currentMode = mode;
    currentPage = 1;
    allBreeds = [];

    // UI Updates
    if (mode === 'dog') {
        btnDogMode.classList.add('active');
        btnCatMode.classList.remove('active');
        btnCatMode.classList.remove('cat-mode');
        heroSection.classList.remove('cat-theme');
        btnRandom.classList.remove('cat-theme');
        btnRandom.textContent = '¡Otro Perro!';
    } else {
        btnCatMode.classList.add('active');
        btnCatMode.classList.add('cat-mode');
        btnDogMode.classList.remove('active');
        heroSection.classList.add('cat-theme');
        btnRandom.classList.add('cat-theme');
        btnRandom.textContent = '¡Otro Gato!';
    }

    // Refresh Data
    fetchRandomHero();
    fetchAllBreeds();
}

// --- Hero Section Logic ---

async function fetchRandomHero() {
    try {
        heroName.textContent = 'Cargando...';

        if (currentMode === 'dog') {
            const response = await fetch(`${DOG_API_BASE}/breeds/image/random`);
            const data = await response.json();
            if (data.status === 'success') {
                heroImg.src = data.message;
                const breed = extractBreedFromUrl(data.message);
                heroName.textContent = formatName(breed);
            }
        } else {
            // Cat Mode
            // Use a timestamp to prevent caching
            const imageUrl = `${CAT_IMAGE_BASE}?t=${Date.now()}`;
            heroImg.src = imageUrl;
            heroName.textContent = 'Gato Aleatorio';
        }
    } catch (error) {
        console.error('Error fetching hero:', error);
        heroName.textContent = 'Error al cargar';
    }
}

// --- Grid & Pagination Logic ---

async function fetchAllBreeds() {
    gridContainer.innerHTML = '<p style="text-align:center; width:100%;">Cargando razas...</p>';

    try {
        if (currentMode === 'dog') {
            const response = await fetch(`${DOG_API_BASE}/breeds/list/all`);
            const data = await response.json();
            if (data.status === 'success') {
                allBreeds = Object.keys(data.message);
            }
        } else {
            // Cat Mode
            const response = await fetch(CAT_BREEDS_API);
            const data = await response.json();
            // catfact.ninja returns { data: [ { breed: 'Abyssinian', ... }, ... ] }
            if (data.data) {
                allBreeds = data.data.map(item => item.breed);
            }
        }
        renderGrid();
    } catch (error) {
        console.error('Error fetching breeds:', error);
        gridContainer.innerHTML = '<p>Error al cargar las razas.</p>';
    }
}

async function getBreedImage(breed) {
    if (currentMode === 'dog') {
        try {
            const response = await fetch(`${DOG_API_BASE}/breed/${breed}/images/random`);
            const data = await response.json();
            return data.message;
        } catch {
            return 'https://via.placeholder.com/300?text=No+Image';
        }
    } else {
        // Cat Mode - Random image for each card (since API doesn't link breed to image)
        // Adding a random param to ensure different images
        return `${CAT_IMAGE_BASE}?width=300&height=200&t=${Math.random()}`;
    }
}

async function renderGrid() {
    gridContainer.innerHTML = ''; // Clear current grid

    // Calculate slice indices
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBreeds = allBreeds.slice(startIndex, endIndex);

    // Update Pagination Controls
    const totalPages = Math.ceil(allBreeds.length / ITEMS_PER_PAGE) || 1;
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= allBreeds.length;

    if (currentBreeds.length === 0) {
        gridContainer.innerHTML = '<p>No se encontraron razas.</p>';
        return;
    }

    // Render cards in parallel
    const cardPromises = currentBreeds.map(async (breed) => {
        const imageUrl = await getBreedImage(breed);
        return createCard(breed, imageUrl);
    });

    const cards = await Promise.all(cardPromises);
    cards.forEach(card => gridContainer.appendChild(card));
}

function createCard(breed, imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';

    const formattedName = formatName(breed);
    const species = currentMode === 'dog' ? 'Perro' : 'Gato';

    card.innerHTML = `
        <img src="${imageUrl}" alt="${formattedName}" class="card-img" loading="lazy">
        <div class="card-info">
            <div class="card-name">${formattedName}</div>
        </div>
    `;

    return card;
}

// --- Helpers ---

function extractBreedFromUrl(url) {
    // Example: https://images.dog.ceo/breeds/husky/n02110185_14479.jpg
    if (!url) return 'Desconocido';
    const parts = url.split('/');
    const breedIndex = parts.indexOf('breeds') + 1;
    return parts[breedIndex] || 'Desconocido';
}

function formatName(name) {
    if (!name) return 'Desconocido';
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// --- Event Listeners ---

btnRandom.addEventListener('click', fetchRandomHero);

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderGrid();
    }
});

nextBtn.addEventListener('click', () => {
    const maxPage = Math.ceil(allBreeds.length / ITEMS_PER_PAGE);
    if (currentPage < maxPage) {
        currentPage++;
        renderGrid();
    }
});

btnDogMode.addEventListener('click', () => {
    if (currentMode !== 'dog') setMode('dog');
});

btnCatMode.addEventListener('click', () => {
    if (currentMode !== 'cat') setMode('cat');
});

// --- Init ---

setMode('dog');
