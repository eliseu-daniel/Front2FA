document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.querySelector('.CreateSecretKey');
    const createError = document.getElementById('createError');
    
    createButton.addEventListener('click', function() {
        createError.textContent = '';
        createError.style.display = 'none';

        console.log('Gerando código...');
        fetch('http://localhost:3333/secret', {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gerar código');
            }
            return response.text();
        })
        .then(data => {
            console.log('Código gerado:', data);
            const generatedCodeInputs = document.querySelectorAll('.generated-code input[type="text"]');
            for (let i = 0; i < data.length; i++) {
                generatedCodeInputs[i].value = data[i];
            }
        })
        .catch(error => {
            console.error('Erro ao gerar código:', error);
            createError.textContent = 'Erro ao gerar código. Verifique a conexão com o servidor.';
            createError.style.color = 'red';
            createError.style.display = 'block';
        });
    });

    const validateButton = document.getElementById('validateButton');
    const validationMessage = document.getElementById('validationMessage');

    validateButton.addEventListener('click', function() {
        const validationInputs = document.querySelectorAll('.validate-section input[type="text"]');
        let validationCode = '';
        validationInputs.forEach(input => {
            validationCode += input.value.trim();
        });

        const secret = document.getElementById('generatedCode1').value;

        console.log('Validando código:', validationCode);
        fetch(`http://localhost:3333/otp/${secret}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: validationCode
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data && data.valid) {
                validationMessage.textContent = 'Código válido.';
                validationMessage.style.color = 'green';
            } else {
                validationMessage.textContent = 'Código inválido.';
                validationMessage.style.color = 'red';
            }
            validationMessage.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao validar código:', error);
            validationMessage.textContent = 'Erro ao validar código. Verifique a conexão com o servidor.';
            validationMessage.style.color = 'red';
            validationMessage.style.display = 'block';
        });
    });
});
