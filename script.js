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

function createTodoItem(title) {
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

    btnWrapper.append(btnSuccess, btnDanger);
    item.append(btnWrapper);

    return {
        item,
        btnSuccess,
        btnDanger,
    };
};


function createTodoApp() {
    const container = document.querySelector('#todo-app');

    const todoAppTitle = createAppTitle('Todo list');
    const todoAppForm = createTodoItemForm();
    const todoAppList = createTodoList();
 
    container.append(todoAppTitle);
    container.append(todoAppForm.form);
    container.append(todoAppList);

    todoAppForm.form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!todoAppForm.input.value) return;

        const todoAppItem = createTodoItem(todoAppForm.input.value);
        todoAppList.append(todoAppItem.item);

        todoAppItem.btnSuccess.addEventListener('click', () => {
            todoAppItem.item.classList.toggle('list-group-item-success');
        });

        todoAppItem.btnDanger.addEventListener('click', () => {
            if (confirm('Are you sure?')) {
                todoAppItem.item.remove();
            } else {
                return;
            };
        });
    });
}

window.addEventListener('load', createTodoApp);