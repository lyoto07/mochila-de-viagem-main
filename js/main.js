const form = document.getElementById("novoItem");
const lista = document.querySelector("#lista");

                                //é so o parametro
form.addEventListener('submit', (evento) =>{
    //os dados estão sendo enviados para a propria pagina por isso é preciso interromper o comportamento padrão, 
    evento.preventDefault();

    //traz um objeto com tudo que esta rodando
    //console.log(evento);

    //forma mais direta, vai no objeto e pega o array em uma posição x (na posição 0 é o nome e na posição 1 a quantidade) porem é uma forma fixa
   // console.log(evento.target[1].value);

    // uma forma dinamica de pegar os dados do input / por ser input se passa value
    // console.log(evento.target.elements['nome'].value);
    // console.log(evento.target.elements['quantidade'].value);

    criaElemento(evento.target.elements['nome'].value,evento.target.elements['quantidade'].value);
})

function criaElemento(nome, quantidade){
    //cada item é um li, então o js vai criar um elemento li
    const novoItem = document.createElement('li');
    //vai ser atribuido no li criado uma classe item
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    //vai receber a quantidade 
    numeroItem.innerHTML = quantidade;

    // console.log(numeroItem);
    // console.log(novoItem);
    //é criado um objeto pois criamos um elemento do html pelo js, nao pode adicionar um elemento dentro do outro como se fosse html
    // novoItem.innerHTML = numeroItem + nome;

    //insere um elemento criado dentro do outro
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);
} 