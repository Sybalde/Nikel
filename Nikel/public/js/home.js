const myModal = new bootstrap.Modal("#transactionModal")
let logged = sessionStorage.getItem("logged")
const sessao = localStorage.getItem("session")
let dados = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout)
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = transactions.html
})

document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault()

    const valor = parseFloat(document.getElementById("value-input").value)
    const descricao = document.getElementById("description-input").value
    const data = document.getElementById("date-input").value
    const tipo = document.querySelector('input[name="type-input"]:checked').value

    dados.transactions.unshift({
        dValor: valor,
        dTipo: tipo,
        dDescricao: descricao,
        dData: data
    })

    salvarDados(dados)
    e.target.reset()
    myModal.hide()
    pegarEntradas()
    pegarSaidas()
    pegarTotal()

    alert("Lançamento adicionado com sucesso!")

})

checkLogged()

function checkLogged(){
    if(sessao){
        sessionStorage.setItem("logged", sessao)
        logged = sessao
    }

    if(!logged){
        window.location.href = "index.html"
        return
    }

    const dadosUsuario = localStorage.getItem(logged)
    if(dadosUsuario){
        dados = JSON.parse(dadosUsuario)
    }
    pegarEntradas()
    pegarSaidas()
    pegarTotal()
}

function logout(){
    sessionStorage.removeItem("logged")
    localStorage.removeItem("session")

    window.location.href = "index.html"
}


function pegarEntradas(){
    const transactions = dados.transactions

    const cashIn = transactions.filter((item) => item.dTipo === "1")
    if(cashIn.length){
        let cahsInHtml = ``
        let limite = 0

        if(cashIn.length > 5 ){
            limite = 5
        } else{
            limite = cashIn.length
        }

        for (let i = 0; i < limite; i++) {

                 cahsInHtml += 

                        `
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h3 class="fs-2">R$ ${cashIn[i].dValor.toFixed(2)}</h3>
                                    <div class="container p-0">
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <p>${cashIn[i].dDescricao}</p>
                                            </div>
                                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                                ${cashIn[i].dData}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
            
        }

        document.getElementById("cash-in-list").innerHTML = cahsInHtml
    }

    
}


function pegarSaidas(){
    const transactions = dados.transactions

    const cashIn = transactions.filter((item) => item.dTipo === "2")
    if(cashIn.length){
        let cahsInHtml = ``
        let limite = 0

        if(cashIn.length > 5 ){
            limite = 5
        } else{
            limite = cashIn.length
        }

        for (let i = 0; i < limite; i++) {

                 cahsInHtml += 

                        `
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h3 class="fs-2">R$ ${cashIn[i].dValor.toFixed(2)}</h3>
                                    <div class="container p-0">
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <p>${cashIn[i].dDescricao}</p>
                                            </div>
                                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                                ${cashIn[i].dData}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
            
        }

        document.getElementById("cash-out-list").innerHTML = cahsInHtml
    }

}

function pegarTotal(){
    const transactions = dados.transactions
    let total = 0

    transactions.forEach((item) =>{
        if(item.dTipo === "1"){
            total += item.dValor
        }else{
            total -= item.dValor
        }
    })

    document.getElementById("total").innerHTML =`${total.toFixed(2)}`
    

}



function salvarDados(data){
    localStorage.setItem(data.login, JSON.stringify(data))
}