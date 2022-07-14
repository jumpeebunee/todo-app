const todoList = [];

function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
};

function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Enter the name of the todo';
    btnWrapper.classList.add('input-group-append');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Create todo';

    btnWrapper.append(btn);
    form.append(input);
    form.append(btnWrapper);

    return {
        form,
        input,
        btn,
    };
};

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItem(title, done, id) {
    const item = document.createElement('li');
    const btnWrapper = document.createElement('div');
    const btnSuccess = document.createElement('button');
    const btnDanger = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = title;
    btnWrapper.classList.add('btn-group', 'btn-group-sm');
    btnSuccess.classList.add('btn', 'btn-success');
    btnSuccess.textContent = 'Done';
    btnDanger.classList.add('btn', 'btn-danger');
    btnDanger.textContent = 'Remove';

    item.id = id ? id : item.id = Math.floor(Math.random() * (50 - 0) + 0);
    if (done) item.classList.add('list-group-item-success');

    btnWrapper.append(btnSuccess, btnDanger);
    item.append(btnWrapper);

    return {
        item,
        btnSuccess,
        btnDanger,
    };

};

function createTodoApp(container, title = 'Todo items', array) {
    
    const todoAppTitle = createAppTitle(title);
    const todoAppForm = createTodoItemForm();
    const todoAppList = createTodoList(); 
 
    container.append(todoAppTitle);
    container.append(todoAppForm.form);
    container.append(todoAppList);

    let storageArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

    let arrLocalName;
    let arrLocalDone;
    let arrlocaId;

    storageArr.map((item => {
        for (let [key, value] of Object.entries(item)) {
            if (key === 'name') {
                arrLocalName = value;
            } else if (key === 'done') {
                arrLocalDone = value;
            } else if (key === 'id') {
                arrlocaId = value;
            };
        };
        const todoLocalItem = createTodoItem(arrLocalName, arrLocalDone, arrlocaId);
        todoAppList.append(todoLocalItem.item);
        buttonSuccess(todoLocalItem);
        buttonFalse(todoLocalItem);
    }));

    const formBtn = todoAppForm.btn;
    formBtn.disabled = true;

    todoAppForm.input.addEventListener('input', () => {
        if (todoAppForm.input.value.length !== 0) {
            formBtn.disabled = false;
        } else {
            formBtn.disabled = true;
        }
    });

    todoAppForm.form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!todoAppForm.input.value) return;

        const todoAppItem = createTodoItem(todoAppForm.input.value);
        todoAppList.append(todoAppItem.item);

        storageArr.push({name:todoAppForm.input.value, done:false, id: todoAppItem.item.id});
        localStorage.setItem('items', JSON.stringify(storageArr));
    
        buttonSuccess(todoAppItem);
        buttonFalse(todoAppItem);

        todoAppForm.input.value = '';   
        formBtn.disabled = true;
    });
};

function changeItemDone(storageArr, todoItem) {
    storageArr.map((item) => {
        if (item.id === todoItem.item.id && item.done === false) {
            item.done = true
        } else if (item.id === todoItem.item.id && item.done === true){
            item.done = false;
        };
    });
    localStorage.setItem('items', JSON.stringify(storageArr));
};

function buttonSuccess(todoItem) {
    todoItem.btnSuccess.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success');
        storageArr = JSON.parse(localStorage.getItem('items'));
        changeItemDone(storageArr, todoItem)
    });
};

function buttonFalse(todoItem) {
    todoItem.btnDanger.addEventListener('click', () => {
        if (confirm('Are you sure?')) {
            todoItem.item.remove();
        } else {
            return;
        };
    });
};


window.createTodoApp = createTodoApp;
window.todoList = todoList;
