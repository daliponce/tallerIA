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


// ============================================================================
// 📊 ANALIZADOR DE TEXTO
// ============================================================================

/**
 * VARIABLES GLOBALES para el analizador de texto
 * Se obtienen los elementos del DOM por su ID
 */
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const charNoSpaceCount = document.getElementById('charNoSpaceCount');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const copyBtn = document.getElementById('copyBtn-analizador');
const clearBtn = document.getElementById('clearBtn-analizador');
const notification = document.getElementById('notification-analizador');

// ========================================================================
// FUNCIÓN: Contar caracteres (incluyendo espacios)
// ========================================================================
/**
 * Cuenta el número total de caracteres en el texto incluyendo espacios
 * Simplemente retorna la longitud del string
 * 
 * @param {string} text - Texto a analizar
 * @returns {number} - Número total de caracteres
 */
function countCharacters(text) {
	// Retorna la longitud del texto tal como está
	return text.length;
}

// ========================================================================
// FUNCIÓN: Contar caracteres (sin espacios)
// ========================================================================
/**
 * Cuenta el número de caracteres excluyendo espacios, tabulaciones y saltos de línea
 * Usa expresión regular para eliminar todos los espacios en blanco
 * 
 * @param {string} text - Texto a analizar
 * @returns {number} - Número de caracteres sin espacios
 */
function countCharactersWithoutSpaces(text) {
	// /\s/g busca todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
	// .replace(/\s/g, '') los reemplaza con nada (los elimina)
	return text.replace(/\s/g, '').length;
}

// ========================================================================
// FUNCIÓN: Contar palabras
// ========================================================================
/**
 * Cuenta el número de palabras en el texto
 * Considera múltiples espacios consecutivos como un solo separador
 * 
 * @param {string} text - Texto a analizar
 * @returns {number} - Número de palabras
 */
function countWords(text) {
	// Valida si el texto está vacío o contiene solo espacios
	if (text.trim().length === 0) {
		return 0;
	}

	// trim() elimina espacios al inicio y final
	// split(/\s+/) divide el texto por uno o más espacios en blanco
	// Esto maneja correctamente múltiples espacios consecutivos
	const words = text.trim().split(/\s+/);
	return words.length;
}

// ========================================================================
// FUNCIÓN: Contar oraciones
// ========================================================================
/**
 * Cuenta el número de oraciones basándose en puntuación
 * Considera puntos (.), signos de interrogación (?) y exclamación (!) como finales de oración
 * 
 * @param {string} text - Texto a analizar
 * @returns {number} - Número de oraciones
 */
function countSentences(text) {
	// Valida si el texto está vacío
	if (text.trim().length === 0) {
		return 0;
	}

	// /[.!?]+/g busca uno o más caracteres que sean: punto, exclamación o interrogación
	// match() retorna un array con todas las coincidencias o null si no hay ninguna
	const sentences = text.match(/[.!?]+/g);

	// Si no hay puntuación (sentences es null), retorna 0, si hay retorna la cantidad
	return sentences ? sentences.length : 0;
}

// ========================================================================
// FUNCIÓN: Calcular tiempo de lectura
// ========================================================================
/**
 * Calcula el tiempo estimado de lectura basado en 200 palabras por minuto
 * Retorna un string formateado de forma legible
 * 
 * @param {number} words - Número de palabras
 * @returns {string} - Tiempo formateado (ej: "2 min 30 seg", "< 1 min", "45 seg")
 */
function calculateReadingTime(words) {
	// Velocidad promedio de lectura: 200 palabras por minuto
	const wordsPerMinute = 200;

	// Calcula los minutos totales dividiendo palabras entre velocidad
	const minutes = Math.floor(words / wordsPerMinute);

	// Calcula los segundos restantes
	// (words % wordsPerMinute) da el residuo de palabras
	// Se divide entre velocidad y se multiplica por 60 para convertir a segundos
	const seconds = Math.round((words % wordsPerMinute) / wordsPerMinute * 60);

	// Devuelve el tiempo formateado según los casos
	if (minutes === 0 && seconds === 0) {
		return '< 1 min';
	} else if (minutes === 0) {
		return `${seconds} seg`;
	} else if (seconds === 0) {
		return `${minutes} min`;
	} else {
		return `${minutes} min ${seconds} seg`;
	}
}

// ========================================================================
// FUNCIÓN: Actualizar estadísticas en tiempo real
// ========================================================================
/**
 * Actualiza todas las estadísticas en tiempo real
 * Se llama cada vez que el usuario escribe o modifica el texto en el textarea
 * Esta es la función principal que calcula todo
 */
function updateStats() {
	// Obtiene el texto actual del textarea
	const text = textInput.value;

	// Calcula todas las métricas usando las funciones especializadas
	const chars = countCharacters(text);
	const charsNoSpace = countCharactersWithoutSpaces(text);
	const words = countWords(text);
	const sentences = countSentences(text);
	const readTime = calculateReadingTime(words);

	// Actualiza el DOM con los nuevos valores y aplica animación
	updateElement(charCount, chars);
	updateElement(charNoSpaceCount, charsNoSpace);
	updateElement(wordCount, words);
	updateElement(sentenceCount, sentences);
	updateElement(readingTime, readTime);
}

// ========================================================================
// FUNCIÓN: Actualizar elemento con animación
// ========================================================================
/**
 * Actualiza un elemento HTML con un nuevo valor y aplica animación de pulse
 * Solo aplica la animación si el valor realmente cambió
 * 
 * @param {HTMLElement} element - Elemento DOM a actualizar
 * @param {string|number} newValue - Nuevo valor a mostrar
 */
function updateElement(element, newValue) {
	// Convierte el nuevo valor a string para compararlo
	const newValueStr = newValue.toString();
	
	// Si el valor cambió, aplica la animación
	if (element.textContent !== newValueStr) {
		// Remueve la clase de animación si existe
		element.classList.remove('updated');

		// Usa setTimeout para forzar un reflow del navegador
		// Esto permite que CSS reconozca el cambio de clase correctamente
		setTimeout(() => {
			// Actualiza el contenido del elemento
			element.textContent = newValue;
			// Añade la clase para que la animación se ejecute
			element.classList.add('updated');
		}, 10);
	}
}

// ========================================================================
// FUNCIÓN: Mostrar notificación temporal
// ========================================================================
/**
 * Muestra una notificación temporal al usuario (como toast)
 * Se oculta automáticamente después de 3 segundos
 * 
 * @param {string} message - Mensaje a mostrar en la notificación
 * @param {string} type - Tipo de notificación: 'success' (verde) o 'error' (rojo)
 */
function showNotification(message, type = 'success') {
	// Configura el mensaje de la notificación
	notification.textContent = message;
	// Añade la clase 'visible' para mostrar la notificación
	notification.className = 'notification visible';
	
	// Si el tipo es error, añade la clase 'error' para cambiar el color a rojo
	if (type === 'error') {
		notification.classList.add('error');
	}

	// Después de 3 segundos (3000 milisegundos), comienza a ocultarla
	setTimeout(() => {
		// Añade la clase 'hide' para la animación de salida
		notification.classList.add('hide');
		// Después de que termine la animación, remueve las clases
		setTimeout(() => {
			notification.classList.remove('visible', 'hide', 'error');
		}, 400);
	}, 3000);
}

// ========================================================================
// FUNCIÓN: Copiar estadísticas al portapapeles
// ========================================================================
/**
 * Copia todas las estadísticas formateadas y bonitas al portapapeles del usuario
 * Si el usuario no ha escrito nada, muestra un mensaje de error
 */
function copyStatistics() {
	// Validar que haya texto antes de copiar
	if (textInput.value.trim().length === 0) {
		showNotification('❌ No hay texto para copiar', 'error');
		return;
	}

	// Construye un string con todas las estadísticas formateadas con emojis
	const stats = `
📊 ESTADÍSTICAS DEL TEXTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Caracteres (con espacios): ${charCount.textContent}
🔤 Caracteres (sin espacios): ${charNoSpaceCount.textContent}
📝 Palabras: ${wordCount.textContent}
📋 Oraciones: ${sentenceCount.textContent}
⏱️  Tiempo de lectura: ${readingTime.textContent}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
	`.trim();

	// Intenta copiar usando la API moderna de Clipboard
	navigator.clipboard.writeText(stats).then(() => {
		// Si es exitoso, muestra notificación de éxito
		showNotification('✅ Estadísticas copiadas al portapapeles');
	}).catch(() => {
		// Si hay error, intenta con el método alternativo (fallback)
		fallbackCopy(stats);
	});
}

// ========================================================================
// FUNCIÓN: Copia alternativa (fallback para navegadores antiguos)
// ========================================================================
/**
 * Método alternativo para copiar texto en navegadores que no soportan Clipboard API
 * Crea un textarea temporal, lo selecciona y usa execCommand
 * 
 * @param {string} text - Texto a copiar al portapapeles
 */
function fallbackCopy(text) {
	// Crea un elemento textarea temporal (invisible)
	const textarea = document.createElement('textarea');
	textarea.value = text;
	document.body.appendChild(textarea);

	// Selecciona todo el texto dentro del textarea
	textarea.select();

	try {
		// Intenta copiar usando el comando deprecated pero compatible
		document.execCommand('copy');
		showNotification('✅ Estadísticas copiadas al portapapeles');
	} catch (err) {
		// Si falla, muestra un mensaje de error
		showNotification('❌ Error al copiar', 'error');
	}

	// Elimina el textarea temporal del documento
	document.body.removeChild(textarea);
}

// ========================================================================
// FUNCIÓN: Limpiar todo (textarea y estadísticas)
// ========================================================================
/**
 * Limpia el textarea y resetea todas las estadísticas a sus valores iniciales
 * También enfoca el textarea para mejor experiencia del usuario
 */
function clearAll() {
	// Limpia completamente el textarea
	textInput.value = '';

	// Resetea todas las estadísticas a 0 o "0 min"
	charCount.textContent = '0';
	charNoSpaceCount.textContent = '0';
	wordCount.textContent = '0';
	sentenceCount.textContent = '0';
	readingTime.textContent = '0 min';

	// Muestra una notificación confirmando la limpieza
	showNotification('🗑️ Texto limpiado correctamente');

	// Enfoca el textarea para que el usuario pueda escribir inmediatamente
	textInput.focus();
}

// ========================================================================
// EVENT LISTENERS - Configurar eventos del analizador
// ========================================================================

// EVENTO: Actualizar estadísticas en tiempo real mientras el usuario escribe
// Se dispara cada vez que hay un cambio en el textarea (input event)
if (textInput) {
	textInput.addEventListener('input', updateStats);
}

// EVENTO: Copiar estadísticas al hacer click en el botón
if (copyBtn) {
	copyBtn.addEventListener('click', copyStatistics);
}

// EVENTO: Limpiar todo al hacer click en el botón
if (clearBtn) {
	clearBtn.addEventListener('click', clearAll);
}

// EVENTO: Copiar estadísticas con el atajo de teclado Ctrl+Enter
// Esto permite copiar de forma rápida sin usar el ratón
if (textInput) {
	textInput.addEventListener('keydown', (e) => {
		// Verifica si se presionó Ctrl (o Cmd en Mac) y Enter simultáneamente
		if (e.ctrlKey && e.key === 'Enter') {
			copyStatistics();
		}
	});
}

// ========================================================================
// INICIALIZACIÓN
// ========================================================================
// Enfoca el textarea al cargar la página para mejor experiencia del usuario
// El usuario puede empezar a escribir inmediatamente sin hacer click
if (textInput) {
	textInput.focus();
}
