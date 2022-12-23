const myModal = new bootstrap.Modal("#registerModal")
let logged = sessionStorage.getItem("logged")
const sessao = localStorage.getItem("session")

checkLogged()

//LOGAR SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault()

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const checarSessao = document.getElementById("session-check").checked

    const conta = pegarConta(email)

    if(!conta){
       alert("Ops! Verifique o usuário ou a senha.")
       return
    }

    if(conta){
        if(conta.senha !== senha){
            alert("Ops! Verifique o usuário ou a senha.")
            return
        }

        salvarSessao(email, checarSessao)

        window.location.href = "home.html"
    }
})


//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Endereço de e-mail inválido")
        return
    }

    if(senha.length < 4){
        alert("Sua senha deve conter pelo menos 4 dígitos.")
        return
    }


salvarConta({
    login: email,
    senha: senha,
    transactions:[]
})

myModal.hide()

alert("Conta criada com sucesso!")

})

function checkLogged(){
    if(sessao){
        sessionStorage.setItem("logged", sessao)
        logged = sessao
    }

    if(logged){
        salvarSessao(logged, sessao)
        window.location.href = "home.html"
    }
}

function salvarConta(data){
    localStorage.setItem(data.login, JSON.stringify(data))
}

function salvarSessao(data, sessaoSalva){
    if(sessaoSalva){
        localStorage.setItem("session", data)
    }

    sessionStorage.setItem("logged", data)
}


function pegarConta(key){
    const conta = localStorage.getItem(key)

    if(conta){
        return JSON.parse(conta)
    }

    return ""
}