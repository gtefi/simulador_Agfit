// Función para el menú desplegable
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// Función para validar los datos de entrada
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

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para generar el plan de entrenamiento y mostrar el IMC
function generarPlan() {
    const edad = parseInt(document.getElementById("age").value);
    const peso = parseFloat(document.getElementById("weight").value);
    const altura = parseFloat(document.getElementById("height").value);
    const objetivo = document.getElementById("goal").value;
    const sesiones = parseInt(document.getElementById("sessions").value);

    const error = validarDatos(edad, peso, altura, sesiones);
    if (error) {
        console.log(error);
        return;
    }

    const imc = calcularIMC(peso, altura);
    mostrarIMC(imc, peso, altura);
    mostrarPlanDeEntrenamiento(objetivo, sesiones);
}

// Función para mostrar el IMC y recomendaciones
function mostrarIMC(imc, peso, altura) {
    const imcActual = document.getElementById("imc-actual");
    const rangoSaludable = document.getElementById("rango-saludable");
    const recomendacionPeso = document.getElementById("recomendacion-peso");

    imcActual.innerText = `Tu IMC actual: ${imc.toFixed(1)}`;

    const imcMin = 18.5;
    const imcMax = 24.9;
    rangoSaludable.innerText = `Rango saludable de IMC: ${imcMin} - ${imcMax}`;

    const pesoMin = imcMin * (altura * altura);
    const pesoMax = imcMax * (altura * altura);

    if (imc < imcMin) {
        const pesoNecesario = pesoMin - peso;
        recomendacionPeso.innerText = `Necesitas ganar aproximadamente ${pesoNecesario.toFixed(1)} kg para estar en el rango saludable.`;
    } else if (imc > imcMax) {
        const pesoNecesario = peso - pesoMax;
        recomendacionPeso.innerText = `Necesitas perder aproximadamente ${pesoNecesario.toFixed(1)} kg para estar en el rango saludable.`;
    } else {
        recomendacionPeso.innerText = "Tu peso está dentro del rango saludable.";
    }
}

// Función para mostrar el plan de entrenamiento
function mostrarPlanDeEntrenamiento(objetivo, sesiones) {
    const planContainer = document.getElementById("training-plan");
    planContainer.innerHTML = ""; // Limpiar el contenido previo

    const ejercicios = {
        "perder peso": ["Cardio de alta intensidad", "HIIT", "Entrenamiento funcional", "Circuito de resistencia", "Cardio moderado"],
        "ganar músculo": ["Fuerza tren superior", "Fuerza tren inferior", "Hipertrofia", "Resistencia", "Descanso activo"],
        "mantener": ["Cardio ligero", "Entrenamiento funcional", "Pilates", "Estiramientos", "Descanso activo"]
    };

    for (let i = 0; i < sesiones; i++) {
        const dia = i + 1;
        const ejercicio = ejercicios[objetivo][i % ejercicios[objetivo].length];

        const diaElement = document.createElement("div");
        diaElement.innerHTML = `
            <p>Día ${dia}: ${ejercicio}</p>
            <button onclick="marcarCompletado(${dia})">Marcar como completado</button>
        `;
        planContainer.appendChild(diaElement);
    }
}

// Función para marcar un día como completado
function marcarCompletado(dia) {
    alert(`Día ${dia} completado!`);
}
