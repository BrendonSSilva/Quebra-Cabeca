//definir as areas 
let areas = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null
}

//seleciona os itens que irão ser "arrastados" e adiciona eventos e funções neles
document.querySelectorAll('.item').forEach(item => {
    //dragstart é um evento acionado quando começa a arrastar 
    item.addEventListener('dragstart', dragStart)
    //dragend é um evento que será acionado ao soltar o mouse
    item.addEventListener('dragend', dragEnd)
});

//area 
document.querySelectorAll('.area').forEach(area => {
    //evento que será acionado quando passar por cima de uma área
    area.addEventListener('dragover', dragOver)
    //evento que será acionado quando estiver em uma área e depois sair dela
    area.addEventListener('dragleave', dragLeave)
    //evento que será acionado quando soltar algo em uma área
    area.addEventListener('drop', drop)
})

//funções para areas neutras (areas iniciais)
document.querySelector('.neutralArea').addEventListener('dragover', dragOverneutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

//functions item para adicionar e remover opacidade, efeito no item específico sendo arrastado
function dragStart(e) {
    e.currentTarget.classList.add('dragging')
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging')
}

//functions area
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        //o comportamento padrão do dragOver é negar o drop. Então se deve prevenir este comportamento padrão
        e.preventDefault()
        //enquanto estiver com o dragOver ativo, adicionar esta classe para demonstrar onde o bloco será solto
        e.currentTarget.classList.add('hover')
    }
}
function dragLeave(e) {
    //quando sair de alguma área, remover a classe hover
    e.currentTarget.classList.remove('hover')
}
function drop(e) {
    //quando soltar o bloco em alguma área, remover a classe hover
    e.currentTarget.classList.remove('hover')

    //currentTarget irá pegar o .item que estiver selecionado 
    if (e.currentTarget.querySelector('.item') === null) {
        //seleciona o item que tiver a class dragging
        let dragItem = document.querySelector('.item.dragging');
        //entre dentro do elemento que eu estou e adicione mais um item no final dele
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//funções para as áreas neutras
function dragOverneutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover')
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover')
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//funções de lógica - irá funcionar nos dois drop
function updateAreas() {
    //seleciona todas as areas
    document.querySelectorAll('.area').forEach(area => {
        //pega o atributo que identifica as areas
        let name = area.getAttribute('data-name')
        //se achar alguma area preenchida
        if (area.querySelector('.item') !== null) {
            //seleciona o item e pega o conteúdo dele para preencher no objeto
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    })

    //quando tudo estiver preenchido, verificar se a ordem posta nas caixas está certa e adicionar uma das classes
    if (areas.a === '1' && areas.b === '2' && areas.c === '3' && areas.d === '4' && areas.e === '5' && areas.f === '6') {
        document.querySelector('.areas').classList.remove('incorrect')
        document.querySelector('.areas').classList.add('correct')
    } else if (areas.a !== null && areas.b !== null && areas.c !== null && areas.d !== null && areas.e !== null && areas.f !== null) {
        document.querySelector('.areas').classList.add('incorrect')
    } else {
        document.querySelector('.areas').classList.remove('correct')
        document.querySelector('.areas').classList.remove('incorrect')
    }
}
        
    
