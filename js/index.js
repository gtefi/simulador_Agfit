
function validarDatos(edad, peso, altura, sesiones) {
    if (isNaN(edad) || isNaN(peso) || isNaN(altura) || isNaN(sesiones)) {
        return "Error: Edad, peso, altura y sesiones deben ser valores numéricos.";
    }
    if (edad < 15 || edad > 80) {
        return "Error: La edad debe estar entre 15 y 80 años.";
    }
    if (peso < 40 || peso > 200) {
        return "Error: El peso debe estar entre 40kg y 200kg.";
    }
    if (altura < 1 || altura > 2.5) {
        return "Error: La altura debe estar entre 1m y 2.5m.";
    }
    if (sesiones < 3 || sesiones > 5) {
        return "Error: El número de entrenamientos debe estar entre 3 y 5.";
    }
    return null; 
}

// Función para generar el plan de entrenamiento
function generarPlan(edad, peso, altura, objetivo, sesiones) {
    console.log(`Datos ingresados: Edad: ${edad}, Peso: ${peso}, Altura: ${altura}, Entrenamientos por semana: ${sesiones}, Objetivo: ${objetivo}`);
    
    
    const error = validarDatos(edad, peso, altura, sesiones);
    if (error) {
        console.log(error);
        return; 
    }

    
    calcularIMC(peso, altura);

    let plan = '';

  
    if (objetivo === 'perder peso') {
        plan = generarPlanPerderPeso(sesiones);
    } else if (objetivo === 'ganar músculo') {
        plan = generarPlanGanarMusculo(sesiones);
    } else if (objetivo === 'mantener') {
        plan = generarPlanMantener(sesiones);
    } else {
        console.log("Error: Objetivo inválido.");
        return;
    }

    console.log(`Plan generado para el objetivo de ${objetivo}:`);
    console.log(plan);
}


function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    console.log(`IMC Calculado: ${imc}`);
    if (imc < 18.5) {
        console.log("Tu IMC indica que estás por debajo del peso saludable.");
    } else if (imc >= 18.5 && imc < 24.9) {
        console.log("Tu IMC indica que estás en el rango de peso saludable.");
    } else if (imc >= 25 && imc < 29.9) {
        console.log("Tu IMC indica que estás en sobrepeso.");
    } else {
        console.log("Tu IMC indica que estás en obesidad.");
    }
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


const edadSimulada = parseInt(prompt("Introduce tu edad:"));
const pesoSimulado = parseFloat(prompt("Introduce tu peso (kg):"));
const alturaSimulada = parseFloat(prompt("Introduce tu altura (en metros):"));
const objetivoSimulado = prompt("Introduce tu objetivo (perder peso, ganar músculo, mantener):").toLowerCase();
const sesionesSimuladas = parseInt(prompt("¿Cuántas sesiones de entrenamiento por semana (3 a 5)?"));


generarPlan(edadSimulada, pesoSimulado, alturaSimulada, objetivoSimulado, sesionesSimuladas);
