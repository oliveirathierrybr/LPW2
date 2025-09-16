// Aplicar máscaras aos campos
document.addEventListener('DOMContentLoaded', function() {
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
    
    // Máscara para CPF
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
    
    // Validação do formulário
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Mostrar mensagem de sucesso
            document.getElementById('successMessage').style.display = 'block';
            
            // Limpar formulário
            form.reset();
            
            // Esconder mensagem após 3 segundos
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        }
    });
    
    // Validação em tempo real
    document.getElementById('nome').addEventListener('blur', validateNome);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('telefone').addEventListener('blur', validateTelefone);
    document.getElementById('cpf').addEventListener('blur', validateCPF);
    document.getElementById('nascimento').addEventListener('blur', validateNascimento);
});

// Funções de validação
function validateNome() {
    const nome = document.getElementById('nome').value;
    const errorElement = document.getElementById('nomeError');
    
    if (nome.length < 3) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const errorElement = document.getElementById('emailError');
    
    if (!email.includes('@')) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function validateTelefone() {
    const telefone = document.getElementById('telefone').value;
    const errorElement = document.getElementById('telefoneError');
    
    // Verifica se tem pelo menos 14 caracteres (formato completo: (11) 99999-9999)
    if (telefone.length < 14) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function validateCPF() {
    const cpf = document.getElementById('cpf').value;
    const errorElement = document.getElementById('cpfError');
    
    // Verifica se tem 14 caracteres (formato completo: 123.456.789-00)
    if (cpf.length < 14) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function validateNascimento() {
    const nascimento = new Date(document.getElementById('nascimento').value);
    const errorElement = document.getElementById('nascimentoError');
    
    if (!nascimento) {
        errorElement.style.display = 'block';
        return false;
    }
    
    // Calcular idade
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    if (idade < 18) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function validateForm() {
    const isNomeValid = validateNome();
    const isEmailValid = validateEmail();
    const isTelefoneValid = validateTelefone();
    const isCPFValid = validateCPF();
    const isNascimentoValid = validateNascimento();
    
    return isNomeValid && isEmailValid && isTelefoneValid && isCPFValid && isNascimentoValid;
}