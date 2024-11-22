// Toggle menu function
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('menu').classList.remove('active'); // Cierra el menú tras hacer clic
    });
});
let currentSlide = 0;
let chartInstance = null; // Para el gráfico de IMC
let progressChart = null; // Para el gráfico de progreso
let progressData = JSON.parse(localStorage.getItem('progressData')) || []; // Cargar progreso desde localStorage

// Función para avanzar en el carrusel
function nextSlide(index) {
    const carousel = document.querySelector(".carousel-container");
    currentSlide = index;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Función para generar el gráfico de IMC
function createIMCChart(imc, idealIMC) {
    const ctx = document.getElementById('imc-chart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['IMC Actual', 'IMC Ideal'],
            datasets: [{
                label: 'Índice de Masa Corporal',
                data: [imc, idealIMC],
                backgroundColor: ['#42A5F5', '#66BB6A'],
                borderColor: ['#1E88E5', '#43A047'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Función para registrar el progreso
function registerProgress(e) {
    e.preventDefault();
    const month = parseInt(document.getElementById("month").value);
    const currentWeight = parseFloat(document.getElementById("current-weight").value);

    if (month < 1 || month > 12) {
        alert("Por favor, ingresa un mes válido entre 1 y 12.");
        return;
    }

    // Verificar si ya existe un registro para el mes
    const existingEntry = progressData.find(entry => entry.month === month);

    if (existingEntry) {
        existingEntry.currentWeight = currentWeight;
    } else {
        progressData.push({ month, currentWeight });
    }

    progressData.sort((a, b) => a.month - b.month); // Ordenar por mes
    localStorage.setItem('progressData', JSON.stringify(progressData)); // Guardar en localStorage
    updateProgressChart();
}

// Función para actualizar el gráfico de progreso
function updateProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    if (progressChart) progressChart.destroy();

    const labels = progressData.map(data => `Mes ${data.month}`);
    const weights = progressData.map(data => data.currentWeight);

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Peso Actual (kg)',
                data: weights,
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                borderColor: '#42A5F5',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

// Función para generar el plan de entrenamiento
async function generateTrainingPlan() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const fitnessGoal = document.getElementById("fitness-goal").value;
    const sessions = parseInt(document.getElementById("sessions").value);

    const imc = (weight / (height * height)).toFixed(1);
    const idealIMC = 22;

    createIMCChart(imc, idealIMC);

    const planContainer = document.getElementById("entrenamiento-plan");
    planContainer.innerHTML = `
        <h3>Tu Plan de Entrenamiento</h3>
        <p>IMC Actual: ${imc}</p>
    `;

    let categoryId;
    switch (fitnessGoal) {
        case "perder peso": categoryId = 10; break;
        case "ganar músculo": categoryId = 8; break;
        case "mantener": categoryId = 12; break;
        default: return;
    }

    try {
        const response = await fetch(`https://wger.de/api/v2/exercise/?category=${categoryId}&language=2&status=2`);
        const data = await response.json();

        for (let i = 1; i <= sessions; i++) {
            const exercises = data.results.slice((i - 1) * 4, i * 4)
                .map(ex => `<li>${ex.name}</li>`).join("");

            planContainer.innerHTML += `
                <div class="day-plan">
                    <h4>Día ${i}</h4>
                    <ul>${exercises}</ul>
                </div>
            `;
        }
    } catch (error) {
        planContainer.innerHTML += `<p>Error al cargar el plan.</p>`;
    }
}

document.getElementById("progress-form").addEventListener("submit", registerProgress);
if (progressData.length > 0) updateProgressChart();
