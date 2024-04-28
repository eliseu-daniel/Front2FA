document.addEventListener('DOMContentLoaded', function() {
    // Seletor para o botão "Criar"
    const createButton = document.querySelector('.CreateSecretKey');
    
    // Adiciona um ouvinte de evento de clique ao botão "Criar"
    createButton.addEventListener('click', function() {
        // Faz a solicitação para a API para gerar um código
        fetch('http://localhost:3333/secret', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.code) {
                // Preenche os campos de entrada com os números gerados pela API
                const inputs = document.querySelectorAll('.CreateKey');
                inputs.forEach((input, index) => {
                    input.value = data.code[index];
                });
            } else {
                console.error('Erro ao gerar código:', data);
            }
        })
        .catch(error => console.error('Erro ao chamar a API:', error));
    });


});