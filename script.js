let message = document.querySelector('.message'),
    addButton = document.querySelector('.buttonAdd'),
    task = document.querySelector('.task'),
    check = document.querySelector('.check'),
    todo = document.querySelector('.todo');


let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}

addButton.addEventListener('click', function(){
    if(!message.value) return;
    let newToDo = {
        todo: message.value,
        checked: false,
        important: false,
        done: false,
    };

    todoList.push(newToDo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
    message.value = '';
});

message.addEventListener("keypress", (keyPressed) =>{
    if(!message.value) return;
    const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            let newToDo = {
                todo: message.value,
                checked: false,
                important: false,
                done: false,
            };
        
            todoList.push(newToDo);
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
            message.value = '';
        }
});

function displayMessage(){
    let displayMessage = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <div class="todo__item">
                <input type='checkbox' class='check' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class="task ${item.important ? 'important' : ''}">${item.todo}</label>
            </div>
            <img id='item_${i}' class='trash' src="icon/delete.svg" alt="">
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
};

todo.addEventListener('click', function(event){
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.metaKey){
                todoList.splice(i, 1);
            }else{
                item.important = !item.important;
            }
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function (item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


// todo.addEventListener('click', function(event){
//     let id = event.target.getAttribute('id');
//     let selector = todo.querySelector('[id=' + id + ']');

//     todoList.forEach(function(item, i){
//         if(){
//             todoList.splice(i, 1);
//         }
//         displayMessage();
//     });
// });

// Если значение ${i} у сообщения такое же как у корзины splice