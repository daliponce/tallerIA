/* Pokédex Vanilla JS
	 - Grid de 20 Pokémon por página con paginación (Prev / Next)
	 - Buscador por nombre con botón
	 - Modal con detalles completos
	 - Inyecta estilos dinámicos (gradientes, animaciones)
*/

const API_BASE = 'https://pokeapi.co/api/v2';
const PAGE_LIMIT = 20;

// Selección de elementos existentes en `API/index.html` (creados previamente)
const input = document.getElementById('inputPokemon') || (()=>{
	const i = document.createElement('input'); i.id='inputPokemon'; document.body.appendChild(i); return i;
})();
const btnBuscar = document.getElementById('btnBuscar') || (()=>{ const b=document.createElement('button'); b.id='btnBuscar'; b.textContent='Buscar'; document.body.appendChild(b); return b; })();
const btnRandom = document.getElementById('btnRandom');
const btnLimpiar = document.getElementById('btnLimpiar');
const resultado = document.getElementById('resultado') || (()=>{ const d=document.createElement('div'); d.id='resultado'; document.body.appendChild(d); return d; })();

// insertar estilos adicionales (grid, tarjetas, modal)
;(function injectStyles(){
	const css = `
		/* Grid */
		#resultado .grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:14px}
		.pkm-card{background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8)); border-radius:12px; padding:10px; text-align:center; box-shadow:0 8px 20px rgba(30,30,60,0.08); cursor:pointer; transition:transform .18s ease, box-shadow .18s ease; border:1px solid rgba(0,0,0,0.04)}
		.pkm-card:hover{transform:translateY(-6px) scale(1.02); box-shadow:0 18px 36px rgba(30,30,60,0.12)}
		.pkm-card img{width:96px; height:96px; object-fit:contain; display:block; margin:6px auto}
		.pkm-name{font-weight:700; text-transform:capitalize; color:#222}
		.pkm-id{font-size:12px; color:var(--muted)}
		/* pagination */
		.pager{display:flex; gap:10px; justify-content:center; margin-top:16px}
		.pager .btn{padding:8px 12px}
		/* modal */
		.pkm-modal-overlay{position:fixed; inset:0; background:rgba(10,10,20,0.6); display:flex; align-items:center; justify-content:center; z-index:9999}
		.pkm-modal{width:90%; max-width:820px; background:var(--card); border-radius:14px; padding:18px; box-shadow:0 20px 50px rgba(10,10,30,0.5); transform:translateY(12px); animation:pop .18s ease both}
		@keyframes pop{from{opacity:0; transform:translateY(20px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)}}
		.modal-grid{display:grid; grid-template-columns:200px 1fr; gap:14px; align-items:start}
		.types{display:flex; gap:8px; flex-wrap:wrap}
		.type-badge{padding:6px 10px; border-radius:999px; background:linear-gradient(90deg,#ffd7a8,#ffc09f); font-weight:700}
		.stats{display:grid; grid-template-columns:repeat(2,1fr); gap:8px}
		.stat{display:flex; justify-content:space-between; padding:6px 8px; background:rgba(0,0,0,0.03); border-radius:8px}
		.close-btn{position:absolute; right:14px; top:10px}
		@media(max-width:640px){ .modal-grid{grid-template-columns:1fr; text-align:center} }
	`;
	const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

// estado de paginación
let currentOffset = 0;

// util: obtener datos de un pokemon por nombre o id
async function fetchPokemon(nameOrId){
	try{
		const res = await fetch(`${API_BASE}/pokemon/${encodeURIComponent(nameOrId)}`);
		if (!res.ok) throw res;
		return await res.json();
	}catch(e){
		return null;
	}
}

// obtener página (lista) y obtener detalles para cada item
async function loadPage(offset = 0){
	resultado.innerHTML = '<div class="muted">Cargando página...</div>';
	try{
		const listRes = await fetch(`${API_BASE}/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`);
		if(!listRes.ok) throw new Error('Lista no disponible');
		const listJson = await listRes.json();
		const promises = listJson.results.map(r => fetch(r.url).then(res=>res.json()));
		const details = await Promise.all(promises);
		renderGrid(details, listJson.count);
	}catch(err){
		resultado.innerHTML = `<div class="muted">Error al cargar la lista: ${err.message || err}</div>`;
	}
}

function renderGrid(pokemons, totalCount){
	resultado.innerHTML = '';
	const grid = document.createElement('div'); grid.className = 'grid';
	pokemons.forEach(p => {
		const card = document.createElement('div'); card.className = 'pkm-card';
		card.innerHTML = `
			<div class="pkm-id">#${p.id}</div>
			<img src="${(p.sprites && (p.sprites.other['official-artwork'].front_default || p.sprites.front_default)) || ''}" alt="${p.name}">
			<div class="pkm-name">${p.name}</div>
		`;
		card.addEventListener('click', ()=> showModal(p));
		grid.appendChild(card);
	});
	resultado.appendChild(grid);

	// paginación
	const pager = document.createElement('div'); pager.className = 'pager';
	const prev = document.createElement('button'); prev.className='btn btn-ghost'; prev.textContent='← Anterior';
	const next = document.createElement('button'); next.className='btn btn-primary'; next.textContent='Siguiente →';
	prev.disabled = currentOffset === 0; prev.style.opacity = prev.disabled ? '.5' : '1';
	prev.addEventListener('click', ()=>{
		if (currentOffset === 0) return; currentOffset = Math.max(0, currentOffset - PAGE_LIMIT); loadPage(currentOffset);
	});
	next.addEventListener('click', ()=>{
		if (currentOffset + PAGE_LIMIT >= totalCount) return; currentOffset += PAGE_LIMIT; loadPage(currentOffset);
	});
	pager.appendChild(prev);
	const info = document.createElement('div'); info.className='muted'; info.style.alignSelf='center'; info.textContent = `Mostrando ${currentOffset+1} - ${Math.min(currentOffset+PAGE_LIMIT, totalCount)} de ${totalCount}`;
	pager.appendChild(info);
	pager.appendChild(next);
	resultado.appendChild(pager);
}

// modal con info completa
function showModal(p){
	// si p es string/number, obtener detalle
	(async ()=>{
		const data = (typeof p === 'string' || typeof p === 'number') ? await fetchPokemon(p) : p;
		if(!data){ alert('No se pudo obtener información'); return; }

		const overlay = document.createElement('div'); overlay.className='pkm-modal-overlay';
		const modal = document.createElement('div'); modal.className='pkm-modal'; modal.style.position='relative';
		const close = document.createElement('button'); close.className='btn close-btn'; close.textContent='Cerrar'; close.addEventListener('click', ()=> overlay.remove());
		modal.appendChild(close);

		const image = data.sprites && (data.sprites.other['official-artwork'].front_default || data.sprites.front_default);
		const types = data.types.map(t=>t.type.name);
		const abilities = data.abilities.map(a=>a.ability.name);
		const stats = data.stats.map(s=>({name:s.stat.name, value:s.base_stat}));

		modal.innerHTML += `
			<div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
				<img src="${image||''}" alt="${data.name}" style="width:140px;height:140px;object-fit:contain;border-radius:12px;background:linear-gradient(90deg,rgba(255,255,255,0.6),rgba(255,255,255,0.3))">
				<div style="flex:1;text-align:left">
					<h2 style="margin:0 0 6px;text-transform:capitalize">${data.name} <span style='font-weight:600;color:var(--muted)'>#${data.id}</span></h2>
					<div class="types">${types.map(t=>`<span class='type-badge'>${t}</span>`).join('')}</div>
					<p class='muted' style='margin-top:8px'>Peso: ${data.weight} • Altura: ${data.height}</p>
				</div>
			</div>
			<div style='margin-top:6px'>
				<h3 style='margin:6px 0'>Habilidades</h3>
				<div class='muted'>${abilities.join(', ')}</div>
			</div>
			<div style='margin-top:10px'>
				<h3 style='margin:6px 0'>Estadísticas</h3>
				<div class='stats'>${stats.map(s=>`<div class='stat'><div>${s.name}</div><div><strong>${s.value}</strong></div></div>`).join('')}</div>
			</div>
		`;

		overlay.appendChild(modal);
		overlay.addEventListener('click', (ev)=>{ if(ev.target === overlay) overlay.remove(); });
		document.body.appendChild(overlay);
	})();
}

// búsqueda por nombre desde input
async function handleSearch(){
	const q = input.value && input.value.trim();
	if(!q){
		// si vacío: recargar página actual
		loadPage(currentOffset);
		return;
	}
	resultado.innerHTML = '<div class="muted">Buscando...</div>';
	const data = await fetchPokemon(q.toLowerCase());
	if(!data){ resultado.innerHTML = '<div class="muted">Pokémon no encontrado.</div>'; return; }
	// mostrar modal y destacar
	showModal(data);
}

// eventos
btnBuscar.addEventListener('click', handleSearch);
input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') handleSearch(); });
if(btnRandom) btnRandom.addEventListener('click', ()=>{
	const randomId = Math.floor(Math.random()*1000)+1; // rango grande para variedad
	fetchPokemon(randomId).then(d=>{ if(d) showModal(d); else alert('No encontrado'); });
});
if(btnLimpiar) btnLimpiar.addEventListener('click', ()=>{ input.value=''; loadPage(0); currentOffset = 0; });

// iniciar
loadPage(0);
