//Ejercicio: detector de palindromos 
//Objetivo: crear una logica compleja encapsulada en una funcion.
//Un palindromo es una palabra o frase que se lee igual de adelante hacia atras que de atras hacia adelante, ignorando espacios, signos de puntuacion y mayusculas/minusculas.
//ejemplos de plalindromos: "Anillina", "Reconocer", "Oso", "ojo"
//Crea una funcon llamada esPalindromo que reciba un texto y devuelva true si es un palindromo y false si no lo es.
function esPalindromo(texto) {                             // Crea una función que recibe un texto y devuelve true si es palíndromo
    if (typeof texto !== 'string') return false;           // Valida que la entrada sea un string
    const normalized = texto
        .toLowerCase()                                     // Pasa a minúsculas
        .normalize('NFD')                                  // Descompone caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '')                   // Elimina acentos
        .replace(/[^a-z0-9]/g, '');                        // Elimina espacios y puntuación
    const reversed = normalized.split('').reverse().join(''); // Invierte la cadena normalizada
    return normalized !== '' && normalized === reversed;      // True si no está vacía y es igual al invertido
}

// Ejemplos de uso
console.log(esPalindromo('Anillina'));    // true
console.log(esPalindromo('Reconocer'));   // true
console.log(esPalindromo('Oso'));         // true
console.log(esPalindromo('A man, a plan, a canal: Panama')); // true
