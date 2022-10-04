import './styles.css';

import { Todo, TodoList } from './classes/index';

import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// const tarea = new Todo('aprender JS');
// // tarea.completado = true;
// todoList.nuevoTodo(tarea);

// crearTodoHtml(tarea);
// console.log(todoList);

//Ingreso al localStorage
// Agregar un item
// localStorage.setItem('mi-key', 'ABC123');

// setTimeout(() => {
// 	localStorage.removeItem('mi-key');
// }, 2000);

todoList.todos.forEach((todo) => {
	crearTodoHtml(todo);
});

// consejo cuando tengo un forEach() que solo recibe un argumento, puedo obviar el argumento y los parentesis de una función interna Ejemplo
// todoList.todos.forEach(crearTodoHtml);
