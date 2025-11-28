//Ejercicio: area y volumenes
//objetivo: crear multiples funciones y reutilizables 
// Crea una funcion para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo dado su radio.
 *
 * Devuelve el resultado usando la fórmula A = π * r² (Math.PI * Math.pow(radio, 2)).
 * Esta implementación usa Math.PI para mayor precisión. Si se pasa un valor no numérico,
 * el resultado será NaN. Si se pasa un radio negativo se devolverá un valor positivo
 * (por el cuadrado), pero en la práctica un radio negativo no tiene sentido físico,
 * por lo que puede ser conveniente validar la entrada antes de llamar a la función.
 *
 * @param {number} radio - Radio del círculo (en las mismas unidades en que se quiere el área).
 *                         Debe ser un número; valores no numéricos producirán NaN.
 * @returns {number} El área del círculo en unidades cuadradas.
 *
 * @example
 * // Área de un círculo de radio 3
 * // Devuelve aproximadamente 28.274333882308138
 * const area = areaCirculo(3);
 *
 * @example
 * // Entrada inválida produce NaN
 * const invalid = areaCirculo('tres'); // NaN
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
// Crea una funcion para calcular el area de un rectangulo dado su base y altura
function areaRectangulo(base, altura) {
    return base * altura;
}
//crea la funcion 'Calcularcolumencilindro' reutilizando la funcion 'areacirculo'
function calcularVolumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}

// ============================================================================
// 📐 CÁLCULO DE DERIVADAS - Función para calcular derivada de polinomios
// ============================================================================

/**
 * Calcula la derivada de una función polinomial de grado n.
 * 
 * La derivada es un polinomio cuyos coeficientes se calculan usando la regla
 * de potencias: si f(x) = a*x^n, entonces f'(x) = a*n*x^(n-1)
 * 
 * Para un polinomio de la forma:
 * f(x) = a₀ + a₁*x + a₂*x² + a₃*x³ + ... + aₙ*xⁿ
 * 
 * Su derivada es:
 * f'(x) = a₁ + 2*a₂*x + 3*a₃*x² + ... + n*aₙ*x^(n-1)
 * 
 * @param {number[]} coeficientes - Array donde cada índice representa el coeficiente
 *                                  del término de grado igual al índice.
 *                                  Ejemplo: [5, 3, 2] representa 5 + 3x + 2x²
 *                                  La derivada sería: [3, 4x] = 3 + 4x
 * 
 * @returns {number[]} Array con los coeficientes de la derivada.
 *                     Si el polinomio es constante, retorna [0]
 *                     (la derivada de una constante es 0).
 * 
 * @example
 * // Derivada de f(x) = 5 + 3x + 2x²
 * // Coeficientes: [5, 3, 2]
 * // f'(x) = 3 + 4x
 * // Coeficientes derivada: [3, 4]
 * const derivada = calcularDerivada([5, 3, 2]);
 * console.log(derivada); // [3, 4]
 * 
 * @example
 * // Derivada de f(x) = 10x³ - 5x² + 3x - 7
 * // Coeficientes: [-7, 3, -5, 10]
 * // f'(x) = 3 - 10x + 30x²
 * // Coeficientes derivada: [3, -10, 30]
 * const derivada = calcularDerivada([-7, 3, -5, 10]);
 * console.log(derivada); // [3, -10, 30]
 * 
 * @example
 * // Derivada de f(x) = 7 (constante)
 * // Coeficientes: [7]
 * // f'(x) = 0
 * // Coeficientes derivada: [0]
 * const derivada = calcularDerivada([7]);
 * console.log(derivada); // [0]
 */
function calcularDerivada(coeficientes) {
    // Validar que la entrada sea un array
    if (!Array.isArray(coeficientes) || coeficientes.length === 0) {
        return [0];
    }
    
    // Si el polinomio es constante (solo un coeficiente), la derivada es 0
    if (coeficientes.length === 1) {
        return [0];
    }
    
    // Crear array para almacenar los coeficientes de la derivada
    // La derivada tendrá un grado menos que el polinomio original
    const derivada = [];
    
    // Aplicar la regla de potencias: d/dx(a*x^n) = a*n*x^(n-1)
    // Iteramos desde el índice 1 hasta el final (saltamos el término constante)
    for (let i = 1; i < coeficientes.length; i++) {
        // El nuevo coeficiente es: coeficiente_actual * grado_actual
        // donde grado_actual = i (la posición en el array)
        derivada.push(coeficientes[i] * i);
    }
    
    // Si la derivada resultó vacía (nunca debería pasar), retornar [0]
    return derivada.length > 0 ? derivada : [0];
}

/**
 * Evalúa un polinomio en un punto específico x.
 * 
 * Dado un polinomio f(x) = a₀ + a₁*x + a₂*x² + ... + aₙ*xⁿ
 * y un valor x, retorna f(x).
 * 
 * @param {number[]} coeficientes - Array de coeficientes del polinomio,
 *                                  donde el índice es el grado.
 *                                  Ejemplo: [2, 3, 1] representa 2 + 3x + x²
 * 
 * @param {number} x - Valor en el que evaluar el polinomio.
 * 
 * @returns {number} El valor de f(x).
 * 
 * @example
 * // f(x) = 2 + 3x + x²
 * // f(2) = 2 + 3*2 + 2² = 2 + 6 + 4 = 12
 * const resultado = evaluarPolinomio([2, 3, 1], 2);
 * console.log(resultado); // 12
 * 
 * @example
 * // f(x) = 5 - 2x + 3x²
 * // f(1) = 5 - 2*1 + 3*1² = 5 - 2 + 3 = 6
 * const resultado = evaluarPolinomio([5, -2, 3], 1);
 * console.log(resultado); // 6
 */
function evaluarPolinomio(coeficientes, x) {
    // Validar entrada
    if (!Array.isArray(coeficientes) || coeficientes.length === 0) {
        return 0;
    }
    
    let resultado = 0;
    
    // Suma cada término: coeficiente * x^grado
    for (let i = 0; i < coeficientes.length; i++) {
        resultado += coeficientes[i] * Math.pow(x, i);
    }
    
    return resultado;
}

/**
 * Función auxiliar para representar un polinomio como string legible.
 * 
 * Útil para visualizar el polinomio de forma clara.
 * 
 * @param {number[]} coeficientes - Array de coeficientes del polinomio.
 * 
 * @returns {string} Representación en texto del polinomio.
 * 
 * @example
 * // Polinomio: 5 + 3x + 2x²
 * // Salida: "5 + 3x + 2x²"
 * const texto = formatearPolinomio([5, 3, 2]);
 * console.log(texto);
 * 
 * @example
 * // Polinomio con coeficientes negativos: -7 + 3x - 5x² + 10x³
 * // Salida: "-7 + 3x - 5x² + 10x³"
 * const texto = formatearPolinomio([-7, 3, -5, 10]);
 * console.log(texto);
 */
function formatearPolinomio(coeficientes) {
    if (!Array.isArray(coeficientes) || coeficientes.length === 0) {
        return '0';
    }
    
    const terminos = [];
    
    for (let i = 0; i < coeficientes.length; i++) {
        const coef = coeficientes[i];
        
        // Saltar términos con coeficiente 0
        if (coef === 0) continue;
        
        let termino = '';
        
        if (i === 0) {
            // Término constante
            termino = coef.toString();
        } else if (i === 1) {
            // Término lineal (x)
            if (coef === 1) {
                termino = 'x';
            } else if (coef === -1) {
                termino = '-x';
            } else {
                termino = `${coef}x`;
            }
        } else {
            // Términos de grado mayor
            if (coef === 1) {
                termino = `x^${i}`;
            } else if (coef === -1) {
                termino = `-x^${i}`;
            } else {
                termino = `${coef}x^${i}`;
            }
        }
        
        terminos.push(termino);
    }
    
    if (terminos.length === 0) {
        return '0';
    }
    
    // Unir términos con + y -
    let resultado = terminos[0];
    for (let i = 1; i < terminos.length; i++) {
        if (terminos[i].startsWith('-')) {
            resultado += ' ' + terminos[i];
        } else {
            resultado += ' + ' + terminos[i];
        }
    }
    
    return resultado;
}

