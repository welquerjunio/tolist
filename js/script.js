const localStorageKey = 'to-do-list-wj'

//validation exist task
function validateExistsNewTask(){
    const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    const inputValue = document.getElementById('input-new-task').value
    const exists = values.find(x => x.name == inputValue)
    return !exists ? false:true
}
//create new task
function newTask(){
    let input = document.getElementById('input-new-task')
    input.style.border = ''
    
    //validation
    if(!input.value){
        input.style.border = '1px solid red'
        alert('Digite uma nova task no campo abaixo')
    }
    else if(validateExistsNewTask()){
        alert('Já existe uma task com essa descrição')

    }
    else{
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i=0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onClick='removeItem("${values[i]['name']}")'>
        <img src="./img/remove-item.svg">
        </button></li>`
    }

}
console.log(showValues)
//Remove task
function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()

}

showValues()