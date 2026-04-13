/* ===========================
   MANIPULAÇÃO DE INTERFACE E RENDERIZAÇÃO
   =========================== */

/* ===========================
   INICIALIZAÇÃO DA INTERFACE
   =========================== */

function preencherDatalistCidades() {
    const datalist = document.getElementById('cities-list');
    
    if (!datalist) {
        console.error('❌ Elemento cities-list não encontrado');
        return;
    }

    // Usar lista completa de cidades ou obter do banco de dados de rotas
    datalist.innerHTML = '';
    
    const cidades = (typeof CIDADES_BRASIL !== 'undefined' && CIDADES_BRASIL.length > 0) 
        ? CIDADES_BRASIL 
        : obterTodasAsCidades();

    // Adicionar cidades
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        datalist.appendChild(option);
    });
    
    console.log('✅ Datalist preenchido com', cidades.length, 'cidades');
}

/* ===========================
   EVENTOS DE ATUALIZAÇÃO
   =========================== */

function atualizarDistancia() {
    const origem = elementos.origin.value.trim();
    const destino = elementos.destination.value.trim();

    // Limpar resultado anterior
    limparResultados();

    // Validar se ambos os campos estão preenchidos
    if (!origem || !destino) {
        elementos.distance.value = '';
        estado.distancia = 0;
        bloquearCalculo();
        return;
    }

    // Se modo manual está ativo, permitir qualquer entrada
    if (estado.distanciaManual) {
        elementos.distance.readOnly = false;
        desbloquearCalculo();
        return;
    }

    // Verificar se a rota existe no banco de dados
    const rotaExiste = validarRota(origem, destino);

    if (rotaExiste) {
        const distancia = obterDistancia(origem, destino);
        estado.origem = origem;
        estado.destino = destino;
        estado.distancia = distancia;
        elementos.distance.value = distancia;
        elementos.distance.readOnly = true;
        desbloquearCalculo();
    } else {
        // Rota não existe, bloquear
        elementos.distance.readOnly = true;
        elementos.distance.value = '';
        elementos.distance.placeholder = 'Ative "Inserir distância" para usar cidades não mapeadas';
        bloquearCalculo();
    }
}

// Adicionar listeners de input aos campos de origem e destino
function setupInputListeners() {
    console.log('Configurando listeners de input...');
    if (typeof elementos === 'undefined') {
        console.error('elementos ainda nao esta definido');
        return;
    }
    
    if (elementos.origin) {
        elementos.origin.addEventListener('input', atualizarDistancia);
        console.log('Listener adicionado ao campo origin');
    }
    if (elementos.destination) {
        elementos.destination.addEventListener('input', atualizarDistancia);
        console.log('Listener adicionado ao campo destination');
    }
}

function alternarModoDistancia(event) {
    estado.distanciaManual = event.target.checked;

    if (estado.distanciaManual) {
        // Modo manual ativo
        elementos.distance.readOnly = false;
        elementos.distance.placeholder = 'Digite a distância em km';
        elementos.distance.value = '';
        elementos.distance.focus();
        desbloquearCalculo();
    } else {
        // Modo automático — volta para readonly
        elementos.distance.readOnly = true;
        elementos.distance.placeholder = 'Será preenchida automaticamente ao selecionar cidades';
        elementos.distance.value = '';
        bloquearCalculo();
    }
}

/* ===========================
   CONTROLE DE BOTÕES
   =========================== */

function desbloquearCalculo() {
    const botao = (elementos && elementos.calcularBtn) ? elementos.calcularBtn : elementos.form.querySelector('button[type="submit"]');
    if (botao) botao.disabled = false;
}

function bloquearCalculo() {
    const botao = (elementos && elementos.calcularBtn) ? elementos.calcularBtn : elementos.form.querySelector('button[type="submit"]');
    if (botao) botao.disabled = true;
}

/* ===========================
   EXIBIÇÃO DE RESULTADOS
   =========================== */

function exibirResultados(origem, destino, distancia, transporte, emissaoTotal, emissaoPorKm) {
    // Mostrar seção de resultados
    elementos.resultsSection.classList.remove('hidden');

    // Calcular valores formatados
    const emissaoEmToneladas = (emissaoTotal / 1000).toFixed(2);
    const emissaoEmKg = (emissaoTotal / 1000).toFixed(2);

    // HTML dos resultados
    const htmlResultados = `
        <h2>📊 Resultado da Emissão</h2>
        <div class="resultado-container">
            <div class="resultado-item">
                <span class="label">Rota:</span>
                <span class="valor">${origem} → ${destino}</span>
            </div>
            <div class="resultado-item">
                <span class="label">Distância:</span>
                <span class="valor">${distancia} km</span>
            </div>
            <div class="resultado-item">
                <span class="label">Modo de Transporte:</span>
                <span class="valor">${traduzirTransporte(transporte)}</span>
            </div>
            <div class="resultado-item">
                <span class="label">Emissão por km:</span>
                <span class="valor">${emissaoPorKm}g CO₂</span>
            </div>
            <div class="resultado-destaque">
                <span class="label">Total de CO₂ emitido:</span>
                <span class="valor-grande">${emissaoTotal.toFixed(0)}g (${emissaoEmToneladas} ton)</span>
            </div>
        </div>
    `;

    elementos.resultsContent.innerHTML = htmlResultados;

    // Scroll para resultados
    elementos.resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function exibirComparacao(distancia, emissaoTotal) {
    // Cálculos de emissão para cada transporte
    const emissaoCarro = distancia * EMISSOES_CO2['carro'];
    const emissaoOnibus = distancia * EMISSOES_CO2['onibus'];
    const emissaoBicicleta = distancia * EMISSOES_CO2['bicicleta'];
    const emissaoCaminhao = distancia * EMISSOES_CO2['caminhao'];

    let transporteSelecionado = estado.transporteSelecionado;

    // Armazenar dados para interatividade
    window.dadosComparacao = {
        distancia: distancia,
        transporteSelecionado: transporteSelecionado,
        emissoes: {
            carro: emissaoCarro,
            onibus: emissaoOnibus,
            bicicleta: emissaoBicicleta,
            caminhao: emissaoCaminhao
        },
        emissaoAtual: emissaoTotal
    };

    const htmlComparacao = `
        <h2>🔄 Comparação com Outros Transportes</h2>
        <p style="color: var(--cor-texto-claro); font-size: 0.9rem; margin-bottom: var(--espaco-md);">Clique em um veículo para comparar</p>
        <div class="comparacao-container" id="comparacao-container">
            <div class="comparacao-item ${transporteSelecionado === 'carro' ? 'ativo' : ''}" data-transporte="carro">
                <span class="emoji">🚗</span>
                <span class="transporte">Carro</span>
                <span class="emissao">${emissaoCarro.toFixed(0)}g</span>
            </div>
            <div class="comparacao-item ${transporteSelecionado === 'onibus' ? 'ativo' : ''}" data-transporte="onibus">
                <span class="emoji">🚌</span>
                <span class="transporte">Ônibus</span>
                <span class="emissao">${emissaoOnibus.toFixed(0)}g</span>
            </div>
            <div class="comparacao-item ${transporteSelecionado === 'bicicleta' ? 'ativo' : ''}" data-transporte="bicicleta">
                <span class="emoji">🚴</span>
                <span class="transporte">Bicicleta</span>
                <span class="emissao">${emissaoBicicleta.toFixed(0)}g</span>
            </div>
            <div class="comparacao-item ${transporteSelecionado === 'caminhao' ? 'ativo' : ''}" data-transporte="caminhao">
                <span class="emoji">🚚</span>
                <span class="transporte">Caminhão</span>
                <span class="emissao">${emissaoCaminhao.toFixed(0)}g</span>
            </div>
        </div>
        <div id="diferenca-container"></div>
    `;

    elementos.comparisonSection.classList.remove('hidden');
    elementos.comparisonContent.innerHTML = htmlComparacao;

    // Adicionar event listeners aos itens de comparação
    adicionarEventListenersComparacao();

    // Mostrar diferença para o transporte selecionado
    mostrarDiferencaComparacao(transporteSelecionado);
}

function adicionarEventListenersComparacao() {
    const itensComparacao = document.querySelectorAll('.comparacao-item');

    itensComparacao.forEach(item => {
        item.addEventListener('click', () => {
            const transporte = item.dataset.transporte;

            // Remover classe 'ativo' de todos
            itensComparacao.forEach(i => i.classList.remove('ativo'));

            // Adicionar classe 'ativo' ao clicado
            item.classList.add('ativo');

            // Mostrar diferença
            mostrarDiferencaComparacao(transporte);
        });
    });
}

function mostrarDiferencaComparacao(transporteComparado) {
    if (!window.dadosComparacao) return;

    const dados = window.dadosComparacao;
    const emissaoComparada = dados.emissoes[transporteComparado];
    const emissaoAtual = dados.emissaoAtual;
    const diferenca = Math.abs(emissaoComparada - emissaoAtual);
    const percentualDiferenca = ((diferenca / Math.max(emissaoComparada, emissaoAtual)) * 100).toFixed(1);

    let mensagem = '';
    let classe = '';

    if (emissaoComparada > emissaoAtual) {
        mensagem = `<p>✅ Seu transporte emite <strong>${diferenca.toFixed(0)}g MENOS de CO₂</strong> (${percentualDiferenca}%) que ${traduzirTransporte(transporteComparado).toLowerCase()}!</p>`;
        classe = 'economia';
    } else if (emissaoComparada < emissaoAtual) {
        mensagem = `<p>⚠️ Seu transporte emite <strong>${diferenca.toFixed(0)}g MAIS de CO₂</strong> (${percentualDiferenca}%) que ${traduzirTransporte(transporteComparado).toLowerCase()}.</p>`;
        classe = 'alerta';
    } else {
        mensagem = `<p>➖ Seu transporte emite a mesma quantidade de CO₂ que ${traduzirTransporte(transporteComparado).toLowerCase()}.</p>`;
        classe = 'neutro';
    }

    const diferencaContainer = document.getElementById('diferenca-container');
    diferencaContainer.innerHTML = `<div class="${classe}">${mensagem}</div>`;
}

function exibirCreditosCarbono(emissaoTotal) {
    // Equivalências para contextualizar a emissão
    const arvoresNecessarias = (emissaoTotal / 21000).toFixed(1); // 1 árvore absorve 21kg CO2/ano
    const kmCarroEquivalente = (emissaoTotal / EMISSOES_CO2['carro']).toFixed(1);
    const eletricidadeKWh = (emissaoTotal / 230).toFixed(1); // 230g CO2 por kWh

    // Cálculo de créditos de carbono (R$ 50 por tonelada de CO2)
    const precoToneladaCO2 = 50;
    const toneladaCO2 = (emissaoTotal / 1000000).toFixed(4); // Converter g para toneladas
    const creditosCarbono = (toneladaCO2 * precoToneladaCO2).toFixed(2);

    // Cálculo de árvores para compensar
    const arvoresTotalCompensacao = Math.ceil(emissaoTotal / 21000);

    const htmlCreditosCarbono = `
        <h2>🌱 Equivalências, Impacto e Créditos</h2>
        
        <h3 style="margin-top: var(--espaco-lg); color: var(--cor-texto); font-size: 1.2rem;">📊 Equivalências</h3>
        <div class="creditos-container">
            <div class="credito-item">
                <span class="icone">🌳</span>
                <span class="texto">Equivalente a <strong>${arvoresNecessarias} árvores</strong> plantadas (absorção anual)</span>
            </div>
            <div class="credito-item">
                <span class="icone">⚡</span>
                <span class="texto">Equivalente a <strong>${eletricidadeKWh} kWh</strong> de eletricidade</span>
            </div>
            <div class="credito-item">
                <span class="icone">🚗</span>
                <span class="texto">Equivalente a um carro percorrendo <strong>${kmCarroEquivalente} km</strong> com gasolina</span>
            </div>
        </div>

        <h3 style="margin-top: var(--espaco-lg); color: var(--cor-texto); font-size: 1.2rem;">💳 Créditos de Carbono Necessários</h3>
        <div class="creditos-carbono-container">
            <div class="credito-carbono-item">
                <div class="credito-carbono-valor">
                    <span class="icone">📈</span>
                    <span class="valor">${toneladaCO2} ton</span>
                </div>
                <span class="rotulo">Toneladas de CO₂ Emitidas</span>
            </div>
            <div class="credito-carbono-item destaque">
                <div class="credito-carbono-valor">
                    <span class="icone">💰</span>
                    <span class="valor">R$ ${creditosCarbono}</span>
                </div>
                <span class="rotulo">Valor em Créditos de Carbono (R$ 50/ton)</span>
            </div>
            <div class="credito-carbono-item">
                <div class="credito-carbono-valor">
                    <span class="icone">🌲</span>
                    <span class="valor">${arvoresTotalCompensacao}</span>
                </div>
                <span class="rotulo">Árvores Necessárias para Compensar</span>
            </div>
        </div>
        
        <div class="info-creditos">
            <p><strong>💡 Saiba mais:</strong> Um crédito de carbono equivale a 1 tonelada de CO₂. Você pode adquirir créditos para neutralizar a emissão de sua viagem!</p>
        </div>
    `;

    elementos.carbonCreditsSection.classList.remove('hidden');
    elementos.carbonCreditsContent.innerHTML = htmlCreditosCarbono;
}

function limparResultados() {
    elementos.resultsSection.classList.add('hidden');
    elementos.comparisonSection.classList.add('hidden');
    elementos.carbonCreditsSection.classList.add('hidden');
}

/* ===========================
   FUNÇÕES AUXILIARES
   =========================== */

function traduzirTransporte(transporte) {
    const traducoes = {
        'bicicleta': '🚴 Bicicleta',
        'carro': '🚗 Carro',
        'onibus': '🚌 Ônibus',
        'caminhao': '🚚 Caminhão'
    };
    return traducoes[transporte] || transporte;
}