

const tabelaCorpo = document.getElementById("tabelaCorpo")
const TabelaProdutos = document.getElementById("TabelaProdutos")
const CadastroProdutos = document.getElementById("CadastroProdutos")

const alerta = document.createElement("div")
CadastroProdutos.appendChild(alerta)

let descricao = document.getElementById("descricaoInput")
let preco = document.getElementById("precoInput")
let qntd = document.getElementById("qntdInput")

let produtos = (JSON.parse(localStorage.getItem("produtos"))   || [] );
RenderizarTabela()


function existe(desc) {

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].descricao == desc.trim) {
            return true
        }
    }

    return false
}
function qntdValida(qntd) {

    if (qntd.value.includes(".") && qntd < 0) {
        return false
    }
    return true
}
function precoValido(preco) {

    if (preco < 0) {
        return false
    }

    return true
}



function CadastrarProduto() {

    existe(descricao.value)
    qntdValida(qntd)
    precoValido(parseFloat(preco.value))

    if (!existe(descricao) && descricao.value.trim() != "" && preco.value != "" && qntd.value != "" && qntdValida(qntd) && precoValido(preco)) {

        let produto = {
            descricao: descricao.value.trim(),
            preco: parseFloat(preco.value),
            qntd: parseInt(qntd.value),
            valor: parseFloat(preco.value) * parseInt(qntd.value)
        }  // parseFloat converte para número decimal e a parseInt para inteiro

        produtos.push(produto)

        localStorage.setItem("produtos", JSON.stringify(produtos))

        console.log(produtos)

        alert("O produto foi castrado com sucesso!")

        FecharCadastro()
        RenderizarTabela()
    }
    else {
        AlertaCadastroInvalido()
    }
}

function MostrarCadastro() {
    TabelaProdutos.classList.add("hidden")
    CadastroProdutos.classList.remove("hidden")
}

function FecharCadastro() {
    alerta.innerHTML = ""

    descricao.value = ""
    preco.value = ""
    qntd.value = ""
    CadastroProdutos.classList.add("hidden")
    TabelaProdutos.classList.remove("hidden")
}


function RenderizarTabela() {
    tabelaCorpo.innerHTML = ""

    for (let i = 0; i < produtos.length; i++) {
        const linha = document.createElement("tr")
        linha.innerHTML = `
                <td> ${produtos[i].descricao.trim()} </td>
                <td> ${produtos[i].preco} </td>
                <td> ${produtos[i].qntd} </td>
                <td> ${produtos[i].valor} </td>
                <button onclick="RemoverProduto(${i})" id="botaoRemoverProduto" class="botaoMenor">Remover produto</button>
        `
        tabelaCorpo.appendChild(linha)
    }
}

function RemoverProduto(indice) {
    produtos.splice(indice, 1)

    localStorage.removeItem("produtos", JSON.stringify(produtos))

    console.log(produtos)

    RenderizarTabela()
}

function AlertaCadastroInvalido() {

    if (qntd.value.includes(".") || qntd.value < 0) {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Digite uma quantidade válida (número inteiro e positivo).</p>
        `
    }
    else if (preco.value < 0) {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Digite um preço válido (número real e positivo).</p>
        `
    }
    else if (descricao.value.trim() == "" || preco.value == "" || qntd.value == "") {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Todos os campos devem ser preenchidos.</p>
        `
    }
    else if (existe(descricao)) {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">Um produto com essa descrição já foi cadastrado.</p>
        `
    }
    else {
        alerta.innerHTML = " "
        alerta.innerHTML += `
        <p class="alerta">????</p>
        `
    }
}


