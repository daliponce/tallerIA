// 📦 Ejercicio: Arrays y Objetos

// 1. Arrays (Listas)
// Crea una lista de tus 3 comidas favoritas.
let comidas = ["pizza", "sushi", "tacos"];

// Pídele a la IA: "Cómo agrego un elemento a un array en JS?"
// Respuesta: usa el método push. Ejemplo:
comidas.push("helado"); // agrega "helado" al final del array

// 2. Objetos (Diccionarios/Fichas)
// Crea un objeto que te represente a ti (nombre, edad, si te gusta programar).
let alumno = {
    nombre: "Dali Ponce",
    edad: 18,
    programador: true,
    habilidades: ["Java"],
    estatura: 1.74
};

// Pídele a la IA: "Cómo accedo a la propiedad nombre de mi objeto alumno?"
// Respuesta: usa alumno.nombre
console.log(alumno.nombre); // imprime: Dali Ponce
// Acceder a la primera habilidad ("Java") dentro del array 'habilidades':
console.log("Primera habilidad del alumno:", alumno.habilidades[0]); // imprime: Java

// 3. Array de Objetos
// Crea una lista de 3 alumnos (objetos) con nombre y calificación.
let alumnos = [
    { nombre: "Ana", calificacion: 8 },
    { nombre: "Luis", calificacion: 5 },
    { nombre: "María", calificacion: 7 }
];  

// Reto con IA:
// "Escribe un bucle que recorra el array de alumnos e imprima solo los que aprobaron (calificación > 6)."
for (let i = 0; i < alumnos.length; i++) {
    let a = alumnos[i];
    if (a.calificacion > 6) {
        console.log(a.nombre + " aprobó con " + a.calificacion);
    }
}