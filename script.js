const reactants = document.querySelectorAll('.reactant');
const reactionZone = document.getElementById('reactionZone');
const particleContainer = document.getElementById('particleContainer');
const simulateBtn = document.getElementById('simulateBtn');
const resultDiv = document.getElementById('result');

let selectedReactants = [];

// Maneja el inicio del arrastre
reactants.forEach(reactant => {
    reactant.addEventListener('dragstart', dragStart);
});

// Permitir el arrastre en la zona de reacción
reactionZone.addEventListener('dragover', dragOver);
reactionZone.addEventListener('drop', drop);

// Comienza el arrastre
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

// Permitir el arrastre
function dragOver(e) {
    e.preventDefault();
}

// Soltar el reactivo en la zona de reacción
function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const reactant = document.getElementById(id);
    selectedReactants.push(reactant.textContent);
}

// Simular la reacción
simulateBtn.addEventListener('click', () => {
    const result = simulateReaction(selectedReactants);
    showResult(result);
    animateParticle(result);
});

// Simular la reacción y devolver el resultado
function simulateReaction(reactants) {
    if (reactants.includes('H₂') && reactants.includes('O₂')) {
        return 'H₂O';
    } else if (reactants.includes('Na') && reactants.includes('Cl₂')) {
        return 'NaCl';
    } else if (reactants.includes('CaCO₃') && reactants.includes('HCl')) {
        return 'CaCl₂ + H₂O + CO₂';
    }
    return 'No hay reacción válida';
}

// Mostrar el resultado en el div correspondiente
function showResult(result) {
    resultDiv.textContent = result;
}

// Animar una partícula en el contenedor de partículas
function animateParticle(result) {
    // Crear una nueva partícula
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.backgroundColor = getRandomColor();
    particle.textContent = result; // Mostrar el resultado en la partícula
    particleContainer.appendChild(particle);
    
    // Mover la partícula
    moveParticle(particle);
}

// Mover la partícula de forma rebotante
function moveParticle(particle) {
    const particleContainer = document.getElementById('particleContainer');
    const containerWidth = particleContainer.clientWidth;
    const containerHeight = particleContainer.clientHeight;

    let posX = Math.random() * (containerWidth - 30); // Posición inicial aleatoria
    let posY = Math.random() * (containerHeight - 30);
    let speedX = (Math.random() < 0.5 ? 1 : -1) * 2; // Velocidad en X
    let speedY = (Math.random() < 0.5 ? 1 : -1) * 2; // Velocidad en Y

    function animate() {
        posX += speedX;
        posY += speedY;

        // Rebotar en los bordes
        if (posX <= 0 || posX >= containerWidth - 30) {
            speedX = -speedX; // Cambiar dirección en X
        }
        if (posY <= 0 || posY >= containerHeight - 30) {
            speedY = -speedY; // Cambiar dirección en Y
        }

        // Aplicar la posición a la partícula
        particle.style.transform = `translate(${posX}px, ${posY}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}

// Obtener un color aleatorio para las partículas
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
