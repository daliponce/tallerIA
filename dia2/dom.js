// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Respuesta breve: usa document.getElementById('miId') o document.querySelector('#miId').
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.

// Selección por ID (ejemplos):
const btnCambiarColor = document.getElementById('btnCambiarColor');
const miCaja = document.getElementById('miCaja');


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"
// Respuesta breve: usa element.addEventListener('click', callback)

// Añadimos un listener que cambia el color de fondo al hacer click.
if (btnCambiarColor && miCaja) {
	btnCambiarColor.addEventListener('click', () => {
		miCaja.style.backgroundColor = 'red';
	});
}



// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"
// Respuesta breve: elemento.style.backgroundColor = 'valor';


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

const btnCambiarTexto = document.getElementById('btnCambiarTexto');
if (btnCambiarTexto && miCaja) {
	btnCambiarTexto.addEventListener('click', () => {
		miCaja.textContent = '¡Hola DOM!';
	});
}

// Ejemplo de HTML mínimo para probar (poner en el mismo directorio `index.html`):
// <button id="btnCambiarColor">Cambiar Color</button>
// <button id="btnCambiarTexto">Cambiar Texto</button>
// <div id="miCaja" style="width:200px;height:100px;border:1px solid #000;">Caja</div>


// ============================================================================
// 🌡️ CONVERSOR DE TEMPERATURAS
// ============================================================================

/**
 * Función que convierte una temperatura en Celsius a Fahrenheit y Kelvin
 * 
 * @param {number} celsius - Temperatura en grados Celsius
 * @returns {object} - Objeto con las temperaturas convertidas en Fahrenheit y Kelvin
 * 
 * Ejemplo de uso:
 * const resultado = conversorTemperaturas(25);
 * console.log(resultado); 
 * // { celsius: 25, fahrenheit: 77, kelvin: 298.15 }
 */
function conversorTemperaturas(celsius) {
	// Validar que el parámetro sea un número
	if (typeof celsius !== 'number') {
		return 'Error: Debes ingresar un número válido';
	}

	// Convertir Celsius a Fahrenheit
	// Fórmula: °F = (°C × 9/5) + 32
	const fahrenheit = (celsius * 9/5) + 32;

	// Convertir Celsius a Kelvin
	// Fórmula: K = °C + 273.15
	const kelvin = celsius + 273.15;

	// Retornar un objeto con todos los valores
	return {
		celsius: celsius,
		fahrenheit: Math.round(fahrenheit * 100) / 100, // Redondear a 2 decimales
		kelvin: Math.round(kelvin * 100) / 100 // Redondear a 2 decimales
	};
}

// ============================================================================
// EJEMPLOS DE USO
// ============================================================================

// Ejemplo 1: Convertir 0°C
console.log('0°C convertido:');
console.log(conversorTemperaturas(0));
// Resultado: { celsius: 0, fahrenheit: 32, kelvin: 273.15 }

// Ejemplo 2: Convertir 25°C (temperatura ambiente)
console.log('\n25°C convertido:');
console.log(conversorTemperaturas(25));
// Resultado: { celsius: 25, fahrenheit: 77, kelvin: 298.15 }

// Ejemplo 3: Convertir 100°C (punto de ebullición del agua)
console.log('\n100°C convertido:');
console.log(conversorTemperaturas(100));
// Resultado: { celsius: 100, fahrenheit: 212, kelvin: 373.15 }

// Ejemplo 4: Convertir -40°C (mismo valor en Celsius y Fahrenheit)
console.log('\n-40°C convertido:');
console.log(conversorTemperaturas(-40));
// Resultado: { celsius: -40, fahrenheit: -40, kelvin: 233.15 }
    