const produtos = []
const precos = []
const quantidades = []
const valores = []

let produto = document.getElementById("produtoInput")
let preco = document.getElementById("precoInput")
let quantidade = document.getElementById("qntdInput")

const tabelaCorpo = document.getElementById("tabelaCorpo")
const TabelaProdutos = document.getElementById("TabelaProdutos")
const CadastroProdutos = document.getElementById("CadastroProdutos")

const alerta = document.createElement("div")
CadastroProdutos.appendChild(alerta)

function CadastrarProduto() {
    let existeProduto = produtos.includes(produto.value)

    let qntd = quantidade.value

    if (qntd.includes(".")) {
        AlertaCadastroInvalido()
    }
    else if (quantidade.value<0  || preco.value<0) {
        AlertaCadastroInvalido()
    }
    else {

        if (existeProduto == false && produto.value.trim() != "" && preco.value != "" && preco.value>0 && quantidade.value != "" && quantidade.value>0) {
            produtos.push(produto.value.trim())
            precos.push(parseFloat(preco.value))
            quantidades.push(parseInt(quantidade.value))
            valores.push(parseFloat(preco.value) * parseInt(quantidade.value)) // parseFloat converte para número decimal e a parseInt para inteiro

            alert("O produto foi castrado com sucesso!")

            FecharCadastro()
            RenderizarTabela()
        }
        else {
            AlertaCadastroInvalido()
        }
    }



    console.log(produtos, precos, quantidades, valores)
}

function MostrarCadastro() {
    document.getElementById("TabelaProdutos").classList.add("hidden")
    document.getElementById("CadastroProdutos").classList.remove("hidden")
}

function FecharCadastro() {
    alerta.innerHTML = ""

    produto.value = ""
    preco.value = ""
    quantidade.value = ""
    document.getElementById("CadastroProdutos").classList.add("hidden")
    document.getElementById("TabelaProdutos").classList.remove("hidden")
}


function RenderizarTabela() {
    tabelaCorpo.innerHTML = ""

    for (let i = 0; i < produtos.length; i++) {
        const linha = document.createElement("tr")
        linha.innerHTML = `
                <td> ${produtos[i]} </td>
                <td> ${precos[i]} R$ </td>
                <td> ${quantidades[i]} </td>
                <td> ${valores[i]} R$ </td>
                <button onclick="RemoverProduto(${i})" id="botaoRemoverProduto" class="botaoMenor">Remover produto</button>
        `
        tabelaCorpo.appendChild(linha)
    }
}

function RemoverProduto(indice) {
    produtos.splice(indice, 1)
    precos.splice(indice, 1)
    quantidades.splice(indice, 1)
    valores.splice(indice, 1)

    console.log(produtos, precos, quantidades, valores)

    RenderizarTabela()
}

function AlertaCadastroInvalido() {
    let qntd = quantidade.value

    if (qntd.includes(".") || qntd<0) {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Digite uma quantidade válida (número inteiro e positivo).</p>
        `
    }
    else if(preco.value<0){
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Digite um preço válido (número real e positivo).</p>
        `
    }
    else if (produto.value.trim() == "" || preco.value == "" || quantidade.value == "") {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Todos os campos devem ser preenchidos.</p>
        `
    }
    else {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Um produto com essa descrição já foi cadastrado.</p>
        `
    }
}


