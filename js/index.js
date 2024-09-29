
function validarDatos(edad, peso, altura, sesiones) {
    if (isNaN(edad) || isNaN(peso) || isNaN(altura) || isNaN(sesiones)) {
        return "Error: Todos los campos deben ser numéricos.";
    }
    if (edad < 15 || edad > 80) {
        return "Error: La edad debe estar entre 15 y 80 años.";
    }
    if (peso < 40 || peso > 200) {
        return "Error: El peso debe estar entre 40kg y 200kg.";
    }
    if (altura < 1.2 || altura > 2.5) {
        return "Error: La altura debe estar entre 1.2m y 2.5m.";
    }
    if (sesiones < 3 || sesiones > 6) {
        return "Error: El número de entrenamientos debe estar entre 3 y 6.";
    }
    return null; 
}


function generarPlan() {
    const edad = parseInt(prompt("Introduce tu edad:"));
    const peso = parseFloat(prompt("Introduce tu peso (kg):"));
    const altura = parseFloat(prompt("Introduce tu altura (m):"));
    const sesiones = parseInt(prompt("¿Cuántas veces a la semana quieres entrenar? (mínimo 3, máximo 5)?"));
    const objetivo = prompt("¿Cuál es tu objetivo? (perder peso, ganar músculo, mantener)").toLowerCase();


    console.log(`Edad ingresada: ${edad}`);
    console.log(`Peso ingresado: ${peso} kg`);
    console.log(`Altura ingresada: ${altura} m`);
    console.log(`Entrenamientos por semana: ${sesiones}`);
    console.log(`Objetivo elegido: ${objetivo}`);


    const error = validarDatos(edad, peso, altura, sesiones);
    if (error) {
        console.log(error);
        return;
    }


    const imc = peso / (altura * altura);
    console.log("IMC Calculado: " + imc);

    let plan = '';


    if (objetivo === "perder peso") {
        plan = generarPlanPerderPeso(sesiones);
    } else if (objetivo === "ganar músculo") {
        plan = generarPlanGanarMusculo(sesiones);
    } else if (objetivo === "mantener") {
        plan = generarPlanMantener(sesiones);
    } else {
        console.log("Error: Objetivo inválido.");
        return;
    }

    console.log(`Plan generado para el objetivo de ${objetivo}:`);
    console.log(plan);
}


function generarPlanPerderPeso(sesiones) {
    const entrenamientos = ["Cardio de alta intensidad", "Fuerza moderada", "Entrenamiento funcional", "HIIT", "Cardio de baja intensidad", "Entrenamiento con pesas ligeras"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}


function generarPlanGanarMusculo(sesiones) {
    const entrenamientos = ["Entrenamiento de fuerza: Tren Superior", "Entrenamiento de fuerza: Tren Inferior", "Entrenamiento de resistencia", "Entrenamiento con pesas pesadas", "Entrenamiento de hipertrofia", "Descanso activo"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}


function generarPlanMantener(sesiones) {
    const entrenamientos = ["Cardio de baja intensidad", "Entrenamiento funcional", "Yoga o pilates", "Entrenamiento con peso corporal", "Entrenamiento de flexibilidad", "Descanso activo"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}


generarPlan();
