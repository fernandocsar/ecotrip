// Arquivo de inicializacao segura do datalist
// Este arquivo garante que tudo esta carregado antes de preencher o datalist

function inicializarDatalistSafe() {
    // Esperar que rotas.js tenha carregado
    if (typeof RotasDB === 'undefined') {
        console.log('Aguardando RotasDB...');
        setTimeout(inicializarDatalistSafe, 100);
        return;
    }
    
    if (typeof obterTodasAsCidades !== 'function') {
        console.log('Aguardando obterTodasAsCidades...');
        setTimeout(inicializarDatalistSafe, 100);
        return;
    }
    
    const datalist = document.getElementById('cities-list');
    if (!datalist) {
        console.log('Aguardando elemento cities-list...');
        setTimeout(inicializarDatalistSafe, 100);
        return;
    }
    
    // Tudo pronto! Preencher datalist
    const cidades = obterTodasAsCidades();
    datalist.innerHTML = '';
    
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        datalist.appendChild(option);
    });
    
    console.log('✅ Datalist inicializado com ' + cidades.length + ' cidades');
}

// Iniciar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarDatalistSafe);
