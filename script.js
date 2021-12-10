let listaFilmes = [
    {
        nome: "The Insisible Man",
        ano: 1933,
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_Invisible_Man_%281933_poster_-_Style_B%29.jpg/1200px-The_Invisible_Man_%281933_poster_-_Style_B%29.jpg"
    },
    {
        nome: "Space Jam",
        ano: 1996,
        poster: "https://1.bp.blogspot.com/-YbXd8jlMWYw/YDQg45h4KtI/AAAAAAAAqtc/Dk33rfc0aWUXSQokKgED3QW6IexuFhinQCLcBGAsYHQ/s900/space%2Bjam%2Bposter.jpg"
    },
    {
        nome: "+ Velozes + Furiosos",
        ano: 2001,
        poster: "https://upload.wikimedia.org/wikipedia/pt/2/20/2_Fast_2_Furious_2003.jpg"
    },
    {
        nome: "Venom",
        ano: 2018,
        poster: "https://upload.wikimedia.org/wikipedia/pt/b/b7/Venom_2018.jpg"
    },
    {
        nome: "The Mask",
        ano: 1994,
        poster: "https://upload.wikimedia.org/wikipedia/pt/f/fe/Themaask.jpg"
    },
    {
        nome: "Velozes e Furiosos 1",
        ano: 2001,
        poster: "https://br.web.img2.acsta.net/medias/nmedia/18/87/23/46/19873389.jpg"
    }
]

// Indica onde no HTML vai aparecer o texto
let elementoFilmeNovo = document.getElementById("filmeNovo")
let elementoSelecao = document.getElementById("deletar")

Ordenar();
imprimirFilmes();
listaDeletar();

// Imprime os pôsteres na tela
function imprimirFilmes() {
    // Variável onde irá ser o impresso o código
    let codigoImprimir = ""

    for (let i = 0; i < listaFilmes.length; i++) {
        codigoImprimir += `<div class="filme"><img src="${listaFilmes[i].poster}" title="${listaFilmes[i].nome}">`
        codigoImprimir += `<div class="legenda">${listaFilmes[i].nome} (${listaFilmes[i].ano})</div></div>`
    }

    elementoFilmeNovo.innerHTML = codigoImprimir
}

// Função para adicionar novo filme
function Adicionar() {
    let filme = document.getElementById("filme").value 
    let ano = document.getElementById("ano").value 
    let poster = document.getElementById("poster").value 

    // Verifica se o título ou a URL já existem
    if (listaFilmes.findIndex((i) => i.nome == filme) >= 0 || listaFilmes.findIndex((i) => i.poster == poster) >= 0) {
        alert("Esse filme/poster já se encontra no catálogo.")
    } else if (poster.endsWith(".jpg") || 
    poster.endsWith(".JPG") ||
    poster.endsWith(".jpeg") ||
    poster.endsWith(".JPEG") ||
    poster.endsWith(".gif") ||
    poster.endsWith(".GIF") ||
    poster.endsWith(".png") ||
    poster.endsWith(".PNG") ||
    poster.endsWith(".svg") ||
    poster.endsWith(".SVG") ||
    poster.endsWith(".bmp") ||
    poster.endsWith(".BMP") ||
    poster.endsWith(".webp") ||
    poster.endsWith(".WEBP")) {
        // else if para verificar se a URL é válida com uma extensão de imagem
        // Adiciona as informações do filme no Array dos Filmes
        var j = listaFilmes.length;
        listaFilmes[j] = { nome: filme };
        listaFilmes[j].ano = ano;
        listaFilmes[j].poster = poster;

        // Função re-ordenar o array de filmes
        Ordenar()
        // Re-imprimir os posteres na tela
        imprimirFilmes()
        // Refaz a lista para a seleção 
        listaDeletar()
    } else {
        // Aviso de erro
        alert("URL da imagem inválida (extensões aceitas: .jpg, .jpeg, .png, .gif, .bmp, .svg e .webp)")
    }

    // Limpa os campos
    document.getElementById("filme").value = ""
    document.getElementById("ano").value = ""
    document.getElementById("poster").value = ""
}

// Função para listar os filmes no menu para Deletar
function listaDeletar(){
    // Variável que vai imprimir os filmes 
    let codigoLista = '<option selected disabled value="">Selecione um filme para deletar</option>'

    for(let i = 0; i < listaFilmes.length; i++) {
        // Ordem crescente
        codigoLista += `<option value="${i}">${listaFilmes[i].nome} (${listaFilmes[i].ano})</option>`
    }

    elementoSelecao.innerHTML = codigoLista
}

// Função para deletar o filme
function Deletar() {
    let selecao = parseInt(document.getElementById("deletar").value)

    if (selecao >= 0){
        listaFilmes.splice(selecao, 1)
        // Selecao : indica o indice do elemento a ser removido
        // 1 : quantidade de elementos a ser removido

        // Re-imprime os posteres na tela
        imprimirFilmes();
        // Refaz a lista para a seleção
        listaDeletar();
    }
}

// Função para ordernar os filmes/array
function Ordenar() {
    if (document.getElementById("cresc").checked) {
        listaFilmes.sort(function (a, b) {
            return a.ano - b.ano
        })
    } else if (document.getElementById("decresc").checked) {
        listaFilmes.sort(function (a, b){
            return b.ano - a.ano
        })
    } else {
        listaFilmes.sort(function (a, b){
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
        })
    }

    imprimirFilmes()
    listaDeletar()
}