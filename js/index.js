
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


function generarPlan(event) {
    event.preventDefault();

    const edad = parseInt(document.getElementById("age").value);
    const peso = parseFloat(document.getElementById("weight").value);
    const altura = parseFloat(document.getElementById("height").value);
    const objetivo = document.getElementById("goal").value;
    const sesiones = parseInt(document.getElementById("sessions").value);

    console.log(`Edad ingresada: ${edad}`);
    console.log(`Peso ingresado: ${peso}`);
    console.log(`Altura ingresada: ${altura}`);
    console.log(`Objetivo seleccionado: ${objetivo}`);
    console.log(`Sesiones por semana: ${sesiones}`);

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
    document.getElementById("planOutput").innerText = plan;
}


function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    console.log(`IMC Calculado: ${imc}`);
}


function generarPlanPerderPeso(sesiones) {
    const entrenamientos = ["Cardio de alta intensidad", "Fuerza moderada", "Entrenamiento funcional", "HIIT", "Cardio de baja intensidad"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}

function generarPlanGanarMusculo(sesiones) {
    const entrenamientos = ["Entrenamiento de fuerza: Tren Superior", "Entrenamiento de fuerza: Tren Inferior", "Entrenamiento de resistencia", "Entrenamiento con pesas pesadas", "Descanso activo"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}

function generarPlanMantener(sesiones) {
    const entrenamientos = ["Cardio de baja intensidad", "Entrenamiento funcional", "Yoga o pilates", "Entrenamiento con peso corporal", "Descanso activo"];
    let plan = '';
    for (let i = 1; i <= sesiones; i++) {
        plan += `Día ${i}: ${entrenamientos[(i - 1) % entrenamientos.length]}\n`;
    }
    return plan;
}
