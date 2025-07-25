//Código de validação de NOME 

const inputNome = document.querySelector('#name-input');
const inputEmail = document.querySelector('#email-input');
const inputAssunto = document.querySelector('#subject-input');
const inputMensagem = document.querySelector('#message-input');
const botaoSubmit = document.querySelector('.submit')

function validaNome(inputNome) {
    const nomeValor = inputNome.value.trim();
    if (nomeValor === "") {
        const mensagem = 'Espaços em branco foram encontrados, digite seu NOME para o campo ser aceito. Caso já tenha preenchido, passe para o campo de texto seguinte';
        inputNome.setCustomValidity(mensagem);

        const spanNome = document.querySelector('.input-name');
        spanNome.classList.add('input-name--erro');
        inputNome.classList.add('spacing-modifier');
        spanNome.innerHTML = 'O campo de nome é ínvalido.';
    }
    else if (nomeValor.length >= 50) {
        const mensagemTamanho = 'Você atingiu o tamanho máximo desse campo de formulário que é de 50 caracteres! Caso já tenha preenchido corretamente, passe para o campo de texto seguinte'
        inputNome.setCustomValidity(mensagemTamanho);

        const spanNome = document.querySelector('.input-name');
        spanNome.classList.add('input-name--erro');
        inputNome.classList.add('spacing-modifier');
        spanNome.innerHTML = 'O campo de nome é ínvalido.';
    }
    else {
        const spanNome = document.querySelector('.input-name');
        spanNome.classList.remove('input-name--erro');
        spanNome.innerHTML = '';
        inputNome.classList.remove('spacing-modifier');
        inputNome.setCustomValidity("");
    }
}

inputNome.addEventListener("blur", (evento) => {
    validaNome(evento.target);
})

//Código de validação de EMAIL 

function validaEmail(inputEmail) {
    const emailValor = inputEmail.value.trim();
    if (emailValor === "") {
        const mensagemEmail = 'O campo não foi preenchido corretamente ou há espaços em branco, digite seu E-MAIL para o campo ser aceito. Caso já tenha preenchido corretamente, passe para o campo de texto seguinte';
        inputEmail.setCustomValidity(mensagemEmail)

        const spanEmail = document.querySelector('.input-email')
        spanEmail.classList.add('input-email--erro');
        inputEmail.classList.add('spacing-modifier');
        spanEmail.innerHTML = 'O campo de e-mail é ínvalido.';
    } 
    else {

        const spanEmail = document.querySelector('.input-email')
        spanEmail.classList.remove('input-email--erro');
        spanEmail.innerHTML = '';
        inputEmail.classList.remove('spacing-modifier');
        inputEmail.setCustomValidity("");
    }
};

inputEmail.addEventListener("blur", (evento) => {
    validaEmail(evento.target);
});

// Código de validação do Campo de ASSUNTO

function validaAssunto(inputAssunto) {
    // Validação de espaço vazio ou em branco
    const assuntoValor = inputAssunto.value.trim();
    if (assuntoValor === "") {
        const mensagemAssunto = 'Espaços em branco foram encontrados, digite o ASSUNTO da mensagem para o campo ser aceito. Caso já tenha preenchido corretamente, passe para o campo de texto seguinte';
        inputAssunto.setCustomValidity(mensagemAssunto)

        const spanAssunto = document.querySelector('.input-text')
        spanAssunto.classList.add('input-text--erro');
        inputAssunto.classList.add('spacing-modifier');
        spanAssunto.innerHTML = 'O campo de assunto é ínvalido.';
    }
    // Validação do tamanho do texto máximo de até 50 caracteres
    else if (assuntoValor.length >= 50) {
        const mensagemTamanho = 'Você atingiu o tamanho máximo desse campo de formulário que é de 50 caracteres! Caso já tenha preenchido corretamente, passe para o campo de texto seguinte'
        inputAssunto.setCustomValidity(mensagemTamanho)

        const spanAssunto = document.querySelector('.input-text')
        spanAssunto.classList.add('input-text--erro');
        inputAssunto.classList.add('spacing-modifier');
        spanAssunto.innerHTML = 'O campo de assunto é ínvalido.';
    }
    else {
        const spanAssunto = document.querySelector('.input-text')
        spanAssunto.classList.remove('input-text--erro');
        spanAssunto.innerHTML = '';
        inputAssunto.classList.remove('spacing-modifier');
        inputAssunto.setCustomValidity("")
    }
};

inputAssunto.addEventListener("blur", (evento) => {
    validaAssunto(evento.target);
});

// Validando campo de MENSAGEM

function validaMensagem(inputMensagem) {
    // Validação de espaço vazio ou em branco
    const mensagemValor = inputMensagem.value.trim();
    if (mensagemValor === "") {
        const mensagemCampoDeMensagem = 'O campo não foi preenchido corretamente ou há espaços em branco, digite a MENSAGEM que deseja enviar para o campo ser aceito. Caso já tenha preenchido corretamente, basta enviar o formulário de contato!';
        inputMensagem.setCustomValidity(mensagemCampoDeMensagem)

        const spanMensagem = document.querySelector('.input-message')
        spanMensagem.classList.add('input-message--erro');
        inputMensagem.classList.add('spacing-modifier');
        spanMensagem.innerHTML = 'O campo de mensagem é ínvalido.';

    } // Validação do tamanho de no máximo 50 caracteres
    else if (mensagemValor.length >= 300) {
        const mensagemTamanho = 'Você atingiu o tamanho máximo desse campo de formulário que é de 300 caracteres! Caso já tenha preenchido corretamente, faça o envio do formulário de contato!'
        inputMensagem.setCustomValidity(mensagemTamanho)

        const spanMensagem = document.querySelector('.input-message')
        spanMensagem.classList.add('input-message--erro');
        inputMensagem.classList.add('spacing-modifier');
        spanMensagem.innerHTML = 'O campo de mensagem é ínvalido.';
    }
    else {
        const spanMensagem = document.querySelector('.input-message')
        spanMensagem.classList.remove('input-message--erro');
        spanMensagem.innerHTML = '';
        inputMensagem.classList.remove('spacing-modifier');
        inputMensagem.setCustomValidity("")
    }
};

inputMensagem.addEventListener("blur", (evento) => {
    validaMensagem(evento.target);
});

// prevenir recarregamento da página, comportamento padrão ao submitar form
botaoSubmit.addEventListener('click', (evento) => {
    evento.preventDefault
})