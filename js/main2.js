const form = document.getElementById('novoItem');
const lista = document.querySelector('#lista');

const itens = JSON.parse(localStorage.getItem('itens')) || [];

//passa os elementos que estão no localstorage para ser criado
itens.forEach((element) => {
    criaElemento(element);
});

form.addEventListener('submit', (evento) => {
    //interrompe o comportamento padrão para que o item fique salvo na pagina
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    //esta olhando todos os elementos do array na posição nome um a um para ver se o elemento ja existe
    const existe = itens.find(elemento => elemento.nome === nome.value);

    //objeto
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }
    
    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        //acessa o localStorage pega item com o id correspondente e salva o item atual
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        //ve o tamanho do array para criar passar o valor do elemento criado
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id+1 : 0 ;
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    //transforma em string
    localStorage.setItem('itens', JSON.stringify(itens));

    //limpa o imput
    nome.value = '';
    quantidade.value = '';

})

function criaElemento(item) {
    //criando uma tag <li> no html e adicionando uma classe item
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //criando uma tag <strong> no html e passa a quantidade no html
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    //cria um id dentro do strong 
    numeroItem.dataset.id = item.id;

    //insere o elemento filho no elemento pai e insere o nome no html
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    novoItem.appendChild(botaoDeleta(item.id))

}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText='x';
    //elementos de botao não recebem o addEventListener na leitura da pagina como no formulario linha 11  
    elementoBotao.addEventListener('click', function() {
        //o botão é filho do li
        deletaElemento(this.parentNode, id);
    })
    return elementoBotao;
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function deletaElemento(tag,id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    
    localStorage.setItem('itens', JSON.stringify(itens));
   
}