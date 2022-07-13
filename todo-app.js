const todoList = [
    {name: 'Finish task', done: true},
    {name: 'Play games', done: false},
];

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

function createTodoItem(title, done) {
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

    if (done === true) item.classList.add('list-group-item-success');

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
    storageArr.forEach((item) => {
        const createDataItem = createTodoItem(item);
        todoAppList.append(createDataItem.item)
        buttonSuccess(createDataItem);
        buttonFalse(createDataItem);
    });

    let arrTodoName;
    let arrTodoDone;

    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        for (let [key, value] of Object.entries(obj)) {
            if (key === 'name') {
                arrTodoName = value;
            } else if (key === 'done') {
                arrTodoDone = value;
            };
        };
        const todoArrItem = createTodoItem(arrTodoName, arrTodoDone);
        todoAppList.append(todoArrItem.item);
        buttonSuccess(todoArrItem);
        buttonFalse(todoArrItem);
    };

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

        storageArr.push(todoAppForm.input.value);
        localStorage.setItem('items', JSON.stringify(storageArr));
    
        buttonSuccess(todoAppItem);
        buttonFalse(todoAppItem);

        todoAppForm.input.value = '';
        formBtn.disabled = true;
    });
};

function buttonSuccess(todoItem) {
    todoItem.btnSuccess.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success');
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

