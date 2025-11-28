
// Constants
const API_BASE = 'https://openlibrary.org/search.json';
const COVER_BASE = 'https://covers.openlibrary.org/b/id';
const ITEMS_PER_PAGE = 9;

// State
let currentQuery = '';
let currentPage = 1;
let totalResults = 0;

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const gridContainer = document.getElementById('book-grid');
const paginationControls = document.getElementById('pagination-controls');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

const featuredSection = document.getElementById('featured-section');
const featuredGrid = document.getElementById('featured-grid');
const searchResultsSection = document.getElementById('search-results-section');

// --- API Logic ---

async function fetchFamousBooks() {
    try {
        // Fetch classic literature sorted by edition count (popularity)
        const response = await fetch(`${API_BASE}?q=classic+literature&sort=editions&limit=8`);
        const data = await response.json();

        renderFeaturedGrid(data.docs);
    } catch (error) {
        console.error('Error fetching famous books:', error);
        featuredGrid.innerHTML = '<div class="loading">Error al cargar libros famosos.</div>';
    }
}

async function searchBooks(query, page = 1) {
    if (!query) return;

    // Switch view
    featuredSection.style.display = 'none';
    searchResultsSection.style.display = 'block';

    showLoading();

    try {
        // Open Library API uses 1-based indexing for pages
        const response = await fetch(`${API_BASE}?q=${encodeURIComponent(query)}&page=${page}&limit=${ITEMS_PER_PAGE}`);
        const data = await response.json();

        totalResults = data.numFound;
        renderGrid(data.docs);
        updatePagination();

    } catch (error) {
        console.error('Error fetching books:', error);
        gridContainer.innerHTML = '<div class="loading">Error al buscar libros. Intenta de nuevo.</div>';
    }
}

// --- Rendering ---

function showLoading() {
    gridContainer.innerHTML = '<div class="loading">Buscando libros...</div>';
    paginationControls.style.display = 'none';
}

function renderFeaturedGrid(books) {
    featuredGrid.innerHTML = '';

    if (!books || books.length === 0) {
        featuredGrid.innerHTML = '<div class="loading">No se encontraron libros.</div>';
        return;
    }

    books.forEach(book => {
        const card = createCard(book);
        featuredGrid.appendChild(card);
    });
}

function renderGrid(books) {
    gridContainer.innerHTML = '';

    if (books.length === 0) {
        gridContainer.innerHTML = '<div class="loading">No se encontraron resultados.</div>';
        return;
    }

    books.forEach(book => {
        const card = createCard(book);
        gridContainer.appendChild(card);
    });

    paginationControls.style.display = 'flex';
}

function createCard(book) {
    const card = document.createElement('div');
    card.className = 'card';

    // Data extraction
    const title = book.title || 'Sin título';
    const author = book.author_name ? book.author_name[0] : 'Autor desconocido';
    const coverId = book.cover_i;
    const genre = book.subject ? book.subject[0] : 'General';

    // Image URL
    const imageUrl = coverId
        ? `${COVER_BASE}/${coverId}-L.jpg`
        : 'https://via.placeholder.com/300x400?text=Sin+Portada';

    card.innerHTML = `
        <div class="card-header-gloss"></div>
        <div class="card-img-container">
            <img src="${imageUrl}" alt="${title}" class="card-img" loading="lazy">
        </div>
        <div class="card-info">
            <div class="card-genre">${genre}</div>
            <div class="card-title">${title}</div>
            <div class="card-author">${author}</div>
        </div>
    `;

    return card;
}

function updatePagination() {
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

// --- Event Listeners ---

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        currentQuery = query;
        currentPage = 1;
        searchBooks(currentQuery, currentPage);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        searchBooks(currentQuery, currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        searchBooks(currentQuery, currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// --- Init ---
fetchFamousBooks();
