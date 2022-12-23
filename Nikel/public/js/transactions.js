const myModal = new bootstrap.Modal("#transactionModal")
let logged = sessionStorage.getItem("logged")
const sessao = localStorage.getItem("session")
let dados = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout)



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
    pegarTransacoes()

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

    pegarTransacoes()
    
}

function logout(){
    sessionStorage.removeItem("logged")
    localStorage.removeItem("session")

    window.location.href = "index.html"
}

function pegarTransacoes(){
    const transactions = dados.transactions
    let transactionsHtml = ``

    if(transactions.length){
        transactions.forEach((item)=>{
            let type = "Entrada"

            if(item.dtipo === "2"){
                type = "Saída"
            }

            transactionsHtml += 
            `
            <tr>
                <th scope="row">${item.dData}</th>
                <td>${item.dValor.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.dDescricao}</td>
            </tr>`
        })
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml
}

function salvarDados(data){
    localStorage.setItem(data.login, JSON.stringify(data))
}