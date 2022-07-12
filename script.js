function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
};

function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('btn');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    btnWrapper.classList.add('input-group-append');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Добавить дело';

    btnWrapper.append(btn);
    form.append(input, btnWrapper);

    return {
        form,
        input,
        btn,
    };
};

function createTodoItem() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
};

function createTodoList() {
    const container = document.querySelector('#todo-app');

    const todoAppTitle = createAppTitle('Список дел');
    const todoAppForm = createTodoItemForm();
    const todoItemList = createTodoItem();
    
    container.append(todoAppTitle);
    container.append(todoAppForm.form);
    container.append(todoItemList);
}

window.addEventListener('load', createTodoList);