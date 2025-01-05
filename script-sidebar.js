// Definujeme kroky
const sidebarSteps = [
    { id: 1, title: 'Vstupní parametry' },
    { id: 2, title: 'Výběr nádrže a poklopu' },
    { id: 3, title: 'Nástavce' },
    { id: 4, title: 'Filtrace' },
    { id: 5, title: 'Bezpečnostní přepad' },
    { id: 6, title: 'Čerpadla' },
    { id: 7, title: 'Příslušenství k čerpadlu' },
    { id: 8, title: 'Hladinoměry' },
    { id: 9, title: 'Geigery' },
    { id: 10, title: 'Potrubí' },
    { id: 11, title: 'Vsakovací objekt' },
    { id: 12, title: 'Seznam položek' }
];

// Aktuální krok
let currentStep = 1;

// Funkce pro vykreslení kroků
function renderSteps() {
    const stepsList = document.getElementById('stepsList');
    if (!stepsList) {
        console.error('Element stepsList nebyl nalezen');
        return;
    }

    stepsList.innerHTML = sidebarSteps.map(((step, index) => `
            ${index !== 0 && index < currentStep ? '<div class="destovka-step-line"></div>' : ''}
            <div class="destovka-step ${step.id === currentStep ? 'destovka-step-active' : ''} 
                ${step.id < currentStep ? 'destovka-step-completed' : ''}">
                <div class="destovka-step-number">
                    ${step.id < currentStep ? '✓' : step.id}
                </div>
                <div class="destovka-step-title">${step.title}</div>
            </div>
        `)
    ).join('');
}

// Funkce pro změnu kroku - bude volána z hlavní aplikace
function setStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= sidebarSteps.length) {
        currentStep = stepNumber;
        renderSteps();
    }
}

// První vykreslení kroků
renderSteps();

// Export funkce pro použití v hlavní aplikaci
window.destovkaSidebar = {
    setStep: setStep
};