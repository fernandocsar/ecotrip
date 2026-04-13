/* ===========================
   BANCO DE DADOS DE ROTAS
   =========================== */

// Variável global para comunicação entre o sistema
const RotasDB = [
    // Rotas com São Paulo, SP
    { origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", distancia: 430 },
    { origem: "Rio de Janeiro, RJ", destino: "São Paulo, SP", distancia: 430 },
    
    { origem: "São Paulo, SP", destino: "Belo Horizonte, MG", distancia: 585 },
    { origem: "Belo Horizonte, MG", destino: "São Paulo, SP", distancia: 585 },
    
    { origem: "São Paulo, SP", destino: "Brasília, DF", distancia: 1015 },
    { origem: "Brasília, DF", destino: "São Paulo, SP", distancia: 1015 },
    
    { origem: "São Paulo, SP", destino: "Salvador, BA", distancia: 2100 },
    { origem: "Salvador, BA", destino: "São Paulo, SP", distancia: 2100 },
    
    { origem: "São Paulo, SP", destino: "Fortaleza, CE", distancia: 2800 },
    { origem: "Fortaleza, CE", destino: "São Paulo, SP", distancia: 2800 },
    
    { origem: "São Paulo, SP", destino: "Recife, PE", distancia: 2700 },
    { origem: "Recife, PE", destino: "São Paulo, SP", distancia: 2700 },
    
    { origem: "São Paulo, SP", destino: "Manaus, AM", distancia: 3700 },
    { origem: "Manaus, AM", destino: "São Paulo, SP", distancia: 3700 },
    
    { origem: "São Paulo, SP", destino: "Curitiba, PR", distancia: 410 },
    { origem: "Curitiba, PR", destino: "São Paulo, SP", distancia: 410 },
    
    { origem: "São Paulo, SP", destino: "Porto Alegre, RS", distancia: 1150 },
    { origem: "Porto Alegre, RS", destino: "São Paulo, SP", distancia: 1150 },
    
    { origem: "São Paulo, SP", destino: "Goiânia, GO", distancia: 900 },
    { origem: "Goiânia, GO", destino: "São Paulo, SP", distancia: 900 },

    // Rotas Rio de Janeiro com outras capitais
    { origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", distancia: 450 },
    { origem: "Belo Horizonte, MG", destino: "Rio de Janeiro, RJ", distancia: 450 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Brasília, DF", distancia: 1200 },
    { origem: "Brasília, DF", destino: "Rio de Janeiro, RJ", distancia: 1200 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Salvador, BA", distancia: 1800 },
    { origem: "Salvador, BA", destino: "Rio de Janeiro, RJ", distancia: 1800 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Fortaleza, CE", distancia: 2400 },
    { origem: "Fortaleza, CE", destino: "Rio de Janeiro, RJ", distancia: 2400 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Recife, PE", distancia: 2300 },
    { origem: "Recife, PE", destino: "Rio de Janeiro, RJ", distancia: 2300 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Curitiba, PR", distancia: 900 },
    { origem: "Curitiba, PR", destino: "Rio de Janeiro, RJ", distancia: 900 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Porto Alegre, RS", distancia: 1600 },
    { origem: "Porto Alegre, RS", destino: "Rio de Janeiro, RJ", distancia: 1600 },

    // Rotas Belo Horizonte com outras capitais
    { origem: "Belo Horizonte, MG", destino: "Brasília, DF", distancia: 715 },
    { origem: "Brasília, DF", destino: "Belo Horizonte, MG", distancia: 715 },
    
    { origem: "Belo Horizonte, MG", destino: "Salvador, BA", distancia: 1500 },
    { origem: "Salvador, BA", destino: "Belo Horizonte, MG", distancia: 1500 },
    
    { origem: "Belo Horizonte, MG", destino: "Fortaleza, CE", distancia: 2200 },
    { origem: "Fortaleza, CE", destino: "Belo Horizonte, MG", distancia: 2200 },
    
    { origem: "Belo Horizonte, MG", destino: "Goiânia, GO", distancia: 600 },
    { origem: "Goiânia, GO", destino: "Belo Horizonte, MG", distancia: 600 },
    
    { origem: "Belo Horizonte, MG", destino: "Curitiba, PR", distancia: 900 },
    { origem: "Curitiba, PR", destino: "Belo Horizonte, MG", distancia: 900 },
    
    { origem: "Belo Horizonte, MG", destino: "Vitória, ES", distancia: 520 },
    { origem: "Vitória, ES", destino: "Belo Horizonte, MG", distancia: 520 },

    // Rotas Brasília com outras capitais
    { origem: "Brasília, DF", destino: "Salvador, BA", distancia: 1850 },
    { origem: "Salvador, BA", destino: "Brasília, DF", distancia: 1850 },
    
    { origem: "Brasília, DF", destino: "Fortaleza, CE", distancia: 2500 },
    { origem: "Fortaleza, CE", destino: "Brasília, DF", distancia: 2500 },
    
    { origem: "Brasília, DF", destino: "Recife, PE", distancia: 2400 },
    { origem: "Recife, PE", destino: "Brasília, DF", distancia: 2400 },
    
    { origem: "Brasília, DF", destino: "Goiânia, GO", distancia: 210 },
    { origem: "Goiânia, GO", destino: "Brasília, DF", distancia: 210 },
    
    { origem: "Brasília, DF", destino: "Manaus, AM", distancia: 3000 },
    { origem: "Manaus, AM", destino: "Brasília, DF", distancia: 3000 },
    
    { origem: "Brasília, DF", destino: "Cuiabá, MT", distancia: 920 },
    { origem: "Cuiabá, MT", destino: "Brasília, DF", distancia: 920 },

    // Rotas Salvador com outras capitais
    { origem: "Salvador, BA", destino: "Fortaleza, CE", distancia: 1080 },
    { origem: "Fortaleza, CE", destino: "Salvador, BA", distancia: 1080 },
    
    { origem: "Salvador, BA", destino: "Recife, PE", distancia: 830 },
    { origem: "Recife, PE", destino: "Salvador, BA", distancia: 830 },
    
    { origem: "Salvador, BA", destino: "Manaus, AM", distancia: 3500 },
    { origem: "Manaus, AM", destino: "Salvador, BA", distancia: 3500 },
    
    { origem: "Salvador, BA", destino: "Aracaju, SE", distancia: 295 },
    { origem: "Aracaju, SE", destino: "Salvador, BA", distancia: 295 },
    
    { origem: "Salvador, BA", destino: "Maceió, AL", distancia: 530 },
    { origem: "Maceió, AL", destino: "Salvador, BA", distancia: 530 },

    // Rotas Fortaleza com outras capitais
    { origem: "Fortaleza, CE", destino: "Recife, PE", distancia: 700 },
    { origem: "Recife, PE", destino: "Fortaleza, CE", distancia: 700 },
    
    { origem: "Fortaleza, CE", destino: "Manaus, AM", distancia: 4200 },
    { origem: "Manaus, AM", destino: "Fortaleza, CE", distancia: 4200 },
    
    { origem: "Fortaleza, CE", destino: "Natal, RN", distancia: 540 },
    { origem: "Natal, RN", destino: "Fortaleza, CE", distancia: 540 },
    
    { origem: "Fortaleza, CE", destino: "Teresina, PI", distancia: 680 },
    { origem: "Teresina, PI", destino: "Fortaleza, CE", distancia: 680 },

    // Rotas Recife com outras capitais
    { origem: "Recife, PE", destino: "Manaus, AM", distancia: 4100 },
    { origem: "Manaus, AM", destino: "Recife, PE", distancia: 4100 },
    
    { origem: "Recife, PE", destino: "João Pessoa, PB", distancia: 180 },
    { origem: "João Pessoa, PB", destino: "Recife, PE", distancia: 180 },
    
    { origem: "Recife, PE", destino: "Maceió, AL", distancia: 310 },
    { origem: "Maceió, AL", destino: "Recife, PE", distancia: 310 },

    // Rotas Curitiba com outras capitais
    { origem: "Curitiba, PR", destino: "Porto Alegre, RS", distancia: 710 },
    { origem: "Porto Alegre, RS", destino: "Curitiba, PR", distancia: 710 },
    
    { origem: "Curitiba, PR", destino: "Goiânia, GO", distancia: 1200 },
    { origem: "Goiânia, GO", destino: "Curitiba, PR", distancia: 1200 },

    // Rotas Porto Alegre com outras capitais
    { origem: "Porto Alegre, RS", destino: "Goiânia, GO", distancia: 1800 },
    { origem: "Goiânia, GO", destino: "Porto Alegre, RS", distancia: 1800 },

    // Rotas Manaus com outras capitais
    { origem: "Manaus, AM", destino: "Belém, PA", distancia: 1500 },
    { origem: "Belém, PA", destino: "Manaus, AM", distancia: 1500 },
    
    { origem: "Manaus, AM", destino: "Boa Vista, RR", distancia: 810 },
    { origem: "Boa Vista, RR", destino: "Manaus, AM", distancia: 810 },
    
    { origem: "Manaus, AM", destino: "Porto Velho, RO", distancia: 1270 },
    { origem: "Porto Velho, RO", destino: "Manaus, AM", distancia: 1270 },

    // Rotas outras capitais
    { origem: "Belém, PA", destino: "São Luis, MA", distancia: 730 },
    { origem: "São Luis, MA", destino: "Belém, PA", distancia: 730 },
    
    { origem: "Goiânia, GO", destino: "Cuiabá, MT", distancia: 820 },
    { origem: "Cuiabá, MT", destino: "Goiânia, GO", distancia: 820 },
    
    { origem: "Cuiabá, MT", destino: "Rio Branco, AC", distancia: 1900 },
    { origem: "Rio Branco, AC", destino: "Cuiabá, MT", distancia: 1900 },
    
    { origem: "Campo Grande, MS", destino: "Cuiabá, MT", distancia: 750 },
    { origem: "Cuiabá, MT", destino: "Campo Grande, MS", distancia: 750 },
    
    { origem: "Palmas, TO", destino: "Brasília, DF", distancia: 850 },
    { origem: "Brasília, DF", destino: "Palmas, TO", distancia: 850 },

    // Rotas cidades de SP com capitais
    { origem: "Campinas, SP", destino: "Rio de Janeiro, RJ", distancia: 500 },
    { origem: "Rio de Janeiro, RJ", destino: "Campinas, SP", distancia: 500 },
    
    { origem: "Campinas, SP", destino: "Belo Horizonte, MG", distancia: 600 },
    { origem: "Belo Horizonte, MG", destino: "Campinas, SP", distancia: 600 },
    
    { origem: "Bauru, SP", destino: "Goiânia, GO", distancia: 950 },
    { origem: "Goiânia, GO", destino: "Bauru, SP", distancia: 950 },
    
    { origem: "Ribeirão Preto, SP", destino: "Brasília, DF", distancia: 820 },
    { origem: "Brasília, DF", destino: "Ribeirão Preto, SP", distancia: 820 },
    
    { origem: "Sorocaba, SP", destino: "Curitiba, PR", distancia: 400 },
    { origem: "Curitiba, PR", destino: "Sorocaba, SP", distancia: 400 },
    
    // Rotas adicionais para expandir para 100
    { origem: "São Paulo, SP", destino: "Campinas, SP", distancia: 100 },
    { origem: "Campinas, SP", destino: "São Paulo, SP", distancia: 100 },
    
    { origem: "São Paulo, SP", destino: "Sorocaba, SP", distancia: 110 },
    { origem: "Sorocaba, SP", destino: "São Paulo, SP", distancia: 110 },
    
    { origem: "São Paulo, SP", destino: "Santos, SP", distancia: 70 },
    { origem: "Santos, SP", destino: "São Paulo, SP", distancia: 70 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Niterói, RJ", distancia: 30 },
    { origem: "Niterói, RJ", destino: "Rio de Janeiro, RJ", distancia: 30 },
    
    { origem: "Rio de Janeiro, RJ", destino: "Duque de Caxias, RJ", distancia: 40 },
    { origem: "Duque de Caxias, RJ", destino: "Rio de Janeiro, RJ", distancia: 40 },
    
    { origem: "Belo Horizonte, MG", destino: "Divinópolis, MG", distancia: 230 },
    { origem: "Divinópolis, MG", destino: "Belo Horizonte, MG", distancia: 230 },
    
    { origem: "Belo Horizonte, MG", destino: "Contagem, MG", distancia: 35 },
    { origem: "Contagem, MG", destino: "Belo Horizonte, MG", distancia: 35 },
    
    { origem: "Salvador, BA", destino: "Feira de Santana, BA", distancia: 110 },
    { origem: "Feira de Santana, BA", destino: "Salvador, BA", distancia: 110 },
    
    { origem: "Fortaleza, CE", destino: "Maracanaú, CE", distancia: 25 },
    { origem: "Maracanaú, CE", destino: "Fortaleza, CE", distancia: 25 },
    
    { origem: "Recife, PE", destino: "Olinda, PE", distancia: 10 },
    { origem: "Olinda, PE", destino: "Recife, PE", distancia: 10 },
    
    { origem: "Brasília, DF", destino: "Taguatinga, DF", distancia: 30 },
    { origem: "Taguatinga, DF", destino: "Brasília, DF", distancia: 30 },
    
    { origem: "Goiânia, GO", destino: "Aparecida de Goiânia, GO", distancia: 20 },
    { origem: "Aparecida de Goiânia, GO", destino: "Goiânia, GO", distancia: 20 },
    
    { origem: "Curitiba, PR", destino: "Ponta Grossa, PR", distancia: 120 },
    { origem: "Ponta Grossa, PR", destino: "Curitiba, PR", distancia: 120 },
    
    { origem: "Porto Alegre, RS", destino: "Gravataí, RS", distancia: 45 },
    { origem: "Gravataí, RS", destino: "Porto Alegre, RS", distancia: 45 },
    
    { origem: "Manaus, AM", destino: "Itacoatiara, AM", distancia: 270 },
    { origem: "Itacoatiara, AM", destino: "Manaus, AM", distancia: 270 },
    
    { origem: "Belém, PA", destino: "Ananindeua, PA", distancia: 30 },
    { origem: "Ananindeua, PA", destino: "Belém, PA", distancia: 30 },
    
    { origem: "Campinas, SP", destino: "Piracicaba, SP", distancia: 160 },
    { origem: "Piracicaba, SP", destino: "Campinas, SP", distancia: 160 },
    
    { origem: "Campinas, SP", destino: "Sorocaba, SP", distancia: 180 },
    { origem: "Sorocaba, SP", destino: "Campinas, SP", distancia: 180 },
    
    { origem: "Santos, SP", destino: "Guarujá, SP", distancia: 20 },
    { origem: "Guarujá, SP", destino: "Santos, SP", distancia: 20 },
    
    { origem: "Niterói, RJ", destino: "São Gonçalo, RJ", distancia: 35 },
    { origem: "São Gonçalo, RJ", destino: "Niterói, RJ", distancia: 35 },
    
    { origem: "Contagem, MG", destino: "Divinópolis, MG", distancia: 195 },
    { origem: "Divinópolis, MG", destino: "Contagem, MG", distancia: 195 },
    
    { origem: "Feira de Santana, BA", destino: "Vitória da Conquista, BA", distancia: 380 },
    { origem: "Vitória da Conquista, BA", destino: "Feira de Santana, BA", distancia: 380 },
    
    { origem: "Maracanaú, CE", destino: "Caucaia, CE", distancia: 50 },
    { origem: "Caucaia, CE", destino: "Maracanaú, CE", distancia: 50 },
    
    { origem: "Olinda, PE", destino: "Jaboatão dos Guararapes, PE", distancia: 25 },
    { origem: "Jaboatão dos Guararapes, PE", destino: "Olinda, PE", distancia: 25 },
    
    { origem: "Taguatinga, DF", destino: "Ceilândia, DF", distancia: 25 },
    { origem: "Ceilândia, DF", destino: "Taguatinga, DF", distancia: 25 },
    
    { origem: "Aparecida de Goiânia, GO", destino: "Anápolis, GO", distancia: 75 },
    { origem: "Anápolis, GO", destino: "Aparecida de Goiânia, GO", distancia: 75 },
    
    { origem: "Ponta Grossa, PR", destino: "Castro, PR", distancia: 80 },
    { origem: "Castro, PR", destino: "Ponta Grossa, PR", distancia: 80 },
    
    { origem: "Gravataí, RS", destino: "Cachoeirinha, RS", distancia: 40 },
    { origem: "Cachoeirinha, RS", destino: "Gravataí, RS", distancia: 40 },
    
    { origem: "Itacoatiara, AM", destino: "Parintins, AM", distancia: 360 },
    { origem: "Parintins, AM", destino: "Itacoatiara, AM", distancia: 360 },
]

// Função para obter rota pelo origem e destino
function obterRota(origem, destino) {
    return RotasDB.find(
        rota =>
            rota.origem.toLowerCase() === origem.toLowerCase() &&
            rota.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Função para obter todas as cidades únicas
function obterTodasAsCidades() {
    const cidades = new Set();
    RotasDB.forEach(rota => {
        cidades.add(rota.origem);
        cidades.add(rota.destino);
    });
    return Array.from(cidades).sort();
}

// Lista completa de 40 cidades brasileiras com UF
const CIDADES_BRASIL = [
    "Aracaju, SE",
    "Belém, PA",
    "Belo Horizonte, MG",
    "Boa Vista, RR",
    "Brasília, DF",
    "Campo Grande, MS",
    "Cuiabá, MT",
    "Curitiba, PR",
    "Fortaleza, CE",
    "Goiânia, GO",
    "João Pessoa, PB",
    "Maceió, AL",
    "Manaus, AM",
    "Natal, RN",
    "Palmas, TO",
    "Porto Alegre, RS",
    "Porto Velho, RO",
    "Recife, PE",
    "Rio Branco, AC",
    "Rio de Janeiro, RJ",
    "Salvador, BA",
    "São Luis, MA",
    "São Paulo, SP",
    "Teresina, PI",
    "Vitória, ES",
    "Americana, SP",
    "Araraquara, SP",
    "Araçatuba, SP",
    "Assis, SP",
    "Avaré, SP",
    "Barretos, SP",
    "Bauru, SP",
    "Birigui, SP",
    "Botucatu, SP",
    "Cachoeira Paulista, SP",
    "Caieiras, SP",
    "Campinas, SP",
    "Carapicuíba, SP",
    "Catanduva, SP",
    "Franca, SP"
];

// Função para validar se uma rota existe
function validarRota(origem, destino) {
    return RotasDB.some(
        rota =>
            rota.origem.toLowerCase() === origem.toLowerCase() &&
            rota.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Função para obter rotas a partir de uma origem
function obterRotasOrigem(origem) {
    return RotasDB.filter(
        rota => rota.origem.toLowerCase() === origem.toLowerCase()
    );
}

// Função para obter rotas para um destino
function obterRotasDestino(destino) {
    return RotasDB.filter(
        rota => rota.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Função para obter a distância entre origem e destino
function obterDistancia(origem, destino) {
    const rota = obterRota(origem, destino);
    return rota ? rota.distancia : null;
}
