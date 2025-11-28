/* Rick and Morty - Buscador Vanilla JS
	 - Grid de 3 columnas con paginación
	 - Búsqueda por nombre, botón y tecla Enter
	 - Tarjetas con imagen, nombre, estado, especie y ubicación
*/

(function(){
	const API_URL = 'https://rickandmortyapi.com/api/character';
	const input = document.getElementById('inputCharacter');
	const btnBuscar = document.getElementById('btnBuscar');
	const btnLimpiar = document.getElementById('btnLimpiar');
	const resultado = document.getElementById('resultado');
	const btnPrev = document.getElementById('btnPrev');
	const btnNext = document.getElementById('btnNext');
	const pageInfo = document.getElementById('pageInfo');

	let currentPage = 1;
	let totalPages = 1;
	let currentQuery = '';

	async function fetchPage(page = 1, name){
		resultado.innerHTML = '<div class="muted">Cargando...</div>';
		try{
			const q = name ? `&name=${encodeURIComponent(name)}` : '';
			const res = await fetch(`${API_URL}?page=${page}${q}`);
			if(!res.ok){
				if(res.status === 404){
					resultado.innerHTML = '<div class="muted">No se encontraron personajes.</div>';
					totalPages = 1; updatePager();
					return;
				}
				throw new Error('Error en la API');
			}
			const json = await res.json();
			totalPages = json.info && json.info.pages ? json.info.pages : 1;
			renderGrid(json.results || []);
			updatePager();
		}catch(err){
			resultado.innerHTML = `<div class="muted">Error: ${err.message || err}</div>`;
			totalPages = 1; updatePager();
		}
	}

	function renderGrid(chars){
		resultado.innerHTML = '';
		if(!chars || chars.length === 0){
			resultado.innerHTML = '<div class="muted">No hay personajes para mostrar.</div>';
			return;
		}
		const grid = document.createElement('div'); grid.className = 'grid';
		chars.forEach(c => {
			const card = document.createElement('div'); card.className='card';
			card.innerHTML = `
				<img src="${c.image||''}" alt="${c.name}">
				<div class="name">${c.name}</div>
				<div class="meta">Estado: <strong>${c.status}</strong></div>
				<div class="meta">Especie: <strong>${c.species}</strong></div>
				<div class="meta">Ubicación: <strong>${(c.location && c.location.name) || 'Desconocida'}</strong></div>
			`;
			grid.appendChild(card);
		});
		resultado.appendChild(grid);
	}

	function updatePager(){
		pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
		btnPrev.disabled = currentPage <= 1;
		btnNext.disabled = currentPage >= totalPages;
		btnPrev.style.opacity = btnPrev.disabled ? '.5' : '1';
		btnNext.style.opacity = btnNext.disabled ? '.5' : '1';
	}

	// handlers
	btnBuscar.addEventListener('click', ()=>{
		const q = input.value && input.value.trim();
		currentQuery = q || '';
		currentPage = 1;
		fetchPage(currentPage, currentQuery);
	});

	input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') btnBuscar.click(); });

	btnLimpiar.addEventListener('click', ()=>{
		input.value = '';
		currentQuery = '';
		currentPage = 1;
		fetchPage(currentPage);
	});

	btnPrev.addEventListener('click', ()=>{
		if(currentPage <= 1) return;
		currentPage--; fetchPage(currentPage, currentQuery);
	});
	btnNext.addEventListener('click', ()=>{
		if(currentPage >= totalPages) return;
		currentPage++; fetchPage(currentPage, currentQuery);
	});

	// init
	fetchPage(1);

})();
