//Estos arrays y variables globales sirven para almacenar los planes generados 
//y el progreso del usuario a lo largo de su entrenamiento
let historialPlanes = [];
let progreso = [];
let diasEntrenados = 0;

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

function generarPlan(edad, peso, altura, objetivo, sesiones) {
    console.log(`Datos ingresados: Edad: ${edad}, Peso: ${peso}, Altura: ${altura}, Entrenamientos por semana: ${sesiones}, Objetivo: ${objetivo}`);
    
    const error = validarDatos(edad, peso, altura, sesiones);
    if (error) {
        console.log(error);
        return;
    }

    
    calcularIMC(peso, altura);
    sugerirNutricion(objetivo);

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

    historialPlanes.push(plan);
    console.log(`Plan generado para el objetivo de ${objetivo}:`);
    console.log(plan);
}

function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    console.log(`IMC Calculado: ${imc}`);
}

function sugerirNutricion(objetivo) {
    if (objetivo === "perder peso") {
        console.log("Recomendación: Mantén un déficit calórico.");
    } else if (objetivo === "ganar músculo") {
        console.log("Recomendación: Aumenta la ingesta de proteínas.");
    } else {
        console.log("Recomendación: Mantén una dieta equilibrada.");
    }
}


function ajustarNivel(nivel, entrenamientos) {
    return entrenamientos.map(entreno => `${entreno} - Nivel: ${nivel}`);
}

//Esta función filtra la lista de entrenamientos para devolver 
//solo aquellos que contienen la palabra "intensidad"
function entrenamientosAltaIntensidad(entrenamientos) {
    return entrenamientos.filter(entreno => entreno.includes("intensidad"));
}


function calcularCalorias(entrenamientos) {
    return entrenamientos.reduce((total, entreno) => total + entreno.calorias, 0);
}


function generarPlanPerderPeso(sesiones) {
    const entrenamientos = [
        { nombre: "Cardio de alta intensidad", calorias: 300 },
        { nombre: "Fuerza moderada", calorias: 200 },
        { nombre: "Entrenamiento funcional", calorias: 250 },
        { nombre: "HIIT", calorias: 350 }
    ];

    
    const entrenamientosIntensos = entrenamientosAltaIntensidad(entrenamientos.map(e => e.nombre));
    
    // Calculamos las calorías quemadas en el plan
    const caloriasTotales = calcularCalorias(entrenamientos);
    console.log(`Calorías totales del plan: ${caloriasTotales}`);

    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientosIntensos[(i - 1) % entrenamientosIntensos.length]}\n`;
    }
    return plan;
}

function generarPlanGanarMusculo(sesiones) {
    const entrenamientos = ["Entrenamiento de fuerza: Tren Superior", "Entrenamiento de fuerza: Tren Inferior", "Entrenamiento de resistencia", "Entrenamiento con pesas pesadas", "Entrenamiento de hipertrofia", "Descanso activo"];

    // uso map para ajustar el nivle de entrenamiento
    const planNivelAvanzado = ajustarNivel("Avanzado", entrenamientos);

    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${planNivelAvanzado[(i - 1) % planNivelAvanzado.length]}\n`;
    }
    return plan;
}

function generarPlanMantener(sesiones) {
    const entrenamientos = ["Cardio de baja intensidad", "Entrenamiento funcional", "Yoga o pilates", "Entrenamiento con peso corporal", "Entrenamiento de flexibilidad", "Descanso activo"];

    
    const planNivelIntermedio = ajustarNivel("Intermedio", entrenamientos);

    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${planNivelIntermedio[(i - 1) % planNivelIntermedio.length]}\n`;
    }
    return plan;
}

const edadSimulada = parseInt(prompt("Introduce tu edad:"));
const pesoSimulado = parseFloat(prompt("Introduce tu peso (kg):"));
const alturaSimulada = parseFloat(prompt("Introduce tu altura (en metros):"));
const objetivoSimulado = prompt("Introduce tu objetivo (perder peso, ganar músculo, mantener):").toLowerCase();
const sesionesSimuladas = parseInt(prompt("¿Cuántas sesiones de entrenamiento por semana (3 a 5)?"));

generarPlan(edadSimulada, pesoSimulado, alturaSimulada, objetivoSimulado, sesionesSimuladas);
