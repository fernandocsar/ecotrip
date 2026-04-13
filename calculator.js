// Cálculo de emissão
function calcularEmissao(event) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }
    
    const origem = elementos.origin.value.trim();
    const destino = elementos.destination.value.trim();
    let distancia = parseFloat(elementos.distance.value);

    // Se distância não foi preenchida manualmente, tentar obter do banco de rotas
    if ((isNaN(distancia) || distancia <= 0) && typeof obterDistancia === 'function') {
        const rotaDist = obterDistancia(origem, destino);
        if (rotaDist !== null && !isNaN(rotaDist) && rotaDist > 0) {
            distancia = rotaDist;
            elementos.distance.value = distancia;
        }
    }
    
    // Validações
    if (!origem || !destino) {
        alert('Por favor, preencha origem e destino');
        return;
    }
    
    if (isNaN(distancia) || distancia <= 0) {
        alert('Por favor, insira uma distância válida');
        return;
    }
    
    const transporte = estado.transporteSelecionado;
    const emissaoPorKm = EMISSOES_CO2[transporte];
    const emissaoTotal = distancia * emissaoPorKm;
    
    // Atualizar estado
    estado.origem = origem;
    estado.destino = destino;
    estado.distancia = distancia;
    
    // Exibir resultados
    exibirResultados(origem, destino, distancia, transporte, emissaoTotal, emissaoPorKm);
    exibirComparacao(distancia, emissaoTotal);
    exibirCreditosCarbono(emissaoTotal);
}

