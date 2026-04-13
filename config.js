/* ===========================
   CONFIGURAÇÃO GLOBAL E INICIALIZAÇÃO
   =========================== */

// Configurações de emissão de CO2 (g CO2 por km)
const EMISSOES_CO2 = {
    bicicleta: 0,        // Sem emissão
    carro: 220,          // 220g CO2/km
    onibus: 45,          // 45g CO2/km (por passageiro)
    caminhao: 350        // 350g CO2/km
};

// Lista de cidades disponíveis
// Nota: `rotas.js` já fornece `CIDADES_BRASIL` (rota DB).
// Se por algum motivo não estiver presente, definimos um fallback vazio.
if (typeof CIDADES_BRASIL === 'undefined') {
    // Não declarar com `var` para evitar SyntaxError se outro script
    // já declarou `const CIDADES_BRASIL`. Em vez disso, atribuímos
    // a propriedade no objeto global `window` quando necessário.
    window.CIDADES_BRASIL = [];
}

// Objeto com referências aos elementos do DOM
const elementos = {
    form: document.getElementById('calculadora-form'),
    origin: document.getElementById('origin'),
    destination: document.getElementById('destination'),
    distance: document.getElementById('distance'),
    manualDistance: document.getElementById('manual-distance'),
    calcularBtn: document.getElementById('calcular-btn'),
    transportRadios: document.querySelectorAll('input[name="transport"]'),
    resultsSection: document.getElementById('results'),
    resultsContent: document.getElementById('results-content'),
    comparisonSection: document.getElementById('comparison'),
    comparisonContent: document.getElementById('comparison-content'),
    carbonCreditsSection: document.getElementById('carbon-credits'),
    carbonCreditsContent: document.getElementById('carbon-credits-content')
};

// Estado da aplicação
const estado = {
    origem: '',
    destino: '',
    distancia: 0,
    transporteSelecionado: 'carro',
    distanciaManual: false
};

/* ===========================
   INICIALIZAÇÃO
   =========================== */

function inicializar() {
    console.log('Iniciando calculadora...');
    
    // Verificar se elementos estao prontos
    if (!elementos.origin || !elementos.destination || !elementos.distance) {
        console.error('Elementos do DOM nao encontrados. Aguardando...');
        setTimeout(inicializar, 100);
        return;
    }
    
    // Datalist ja foi preenchido por initDatalist.js
    // Setup de listeners de input (para atualizacao em tempo real)
    if (typeof setupInputListeners === 'function') {
        setupInputListeners();
    }
    
    // Sincronizar transporte selecionado com o radio button checked
    const transporteSelecionadoDOM = document.querySelector('input[name="transport"]:checked');
    if (transporteSelecionadoDOM) {
        estado.transporteSelecionado = transporteSelecionadoDOM.value;
        console.log('Transporte sincronizado:', estado.transporteSelecionado);
    }
    
    // Adicionar event listeners para distância manual
    elementos.distance.addEventListener('input', (e) => {
        if (estado.distanciaManual) {
            estado.distancia = parseFloat(e.target.value) || 0;
        }
    });
    elementos.manualDistance.addEventListener('change', alternarModoDistancia);
    
    // Listener para seleção de transporte
    elementos.transportRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            estado.transporteSelecionado = e.target.value;
            console.log('✅ Transporte selecionado:', e.target.value);
        });
    });
    
    // Listener para submit do formulário
    // Evitar submit padrão e usar botão dedicado
    if (elementos.calcularBtn) {
        elementos.calcularBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Calcular (botão) disparado');
            calcularEmissao();
        });
    } else if (elementos.form) {
        elementos.form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Form submit interceptado');
            calcularEmissao();
        });
    }
    
    console.log('✅ Calculadora EcoTrip inicializada');
}

/* ===========================
   EXECUTAR QUANDO DOM ESTIVER PRONTO
   =========================== */

document.addEventListener('DOMContentLoaded', inicializar);
