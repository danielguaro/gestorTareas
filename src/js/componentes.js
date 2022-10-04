import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
	<li class="${todo.completado ? 'completed' : ''} " data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}/>
			<label>${todo.tarea}</label></label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template" />
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);

	return div.firstElementChild;
};

txtInput.addEventListener('keyup', (event) => {
	// console.log(event.target.value);
	// console.log(event.keyCode); // Código de la tecla presionada
	if (event.keyCode === 13 && txtInput.value.length > 0) {
		// txtInput.value == event.target.value
		const nuevoTodo = new Todo(event.target.value);
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHtml(nuevoTodo);
		console.log(todoList);
		txtInput.value = '';
	}
});

//event click
divTodoList.addEventListener('click', (event) => {
	// console.log(event.target.localName); //input, label, button, etc
	const nombreElemento = event.target.localName;
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');
	console.log(nombreElemento, todoElemento, todoId);
	if (nombreElemento.includes('input')) {
		// Significa que hizo click en el checkbox
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed');
	}

	//
	if (nombreElemento.includes('button')) {
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElemento);
	}

	// console.log(todoList);
});

btnBorrar.addEventListener('click', () => {
	todoList.eliminarCompletados();
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];
		console.log(elemento);
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}

	console.log(todoList);
});

ulFiltros.addEventListener('click', (event) => {
	// console.log(event.target.text); // devuelve el texto que tenga el elemento
	const filtro = event.target.text;
	// console.log(!filtro); //true si se da click en undefined
	if (!filtro) {
		return;
	}

	anchorFiltros.forEach((event) => event.classList.remove('selected'));
	event.target.classList.add('selected');

	for (let elemento of divTodoList.children) {
		// console.log('elemento', elemento);
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');
		if (completado && filtro === 'Pendientes') {
			elemento.classList.add('hidden');
		} else if (!completado && filtro === 'Completados') {
			elemento.classList.add('hidden');
		}
		// else if (filtro === 'Todos') {
		// 	elemento.classList.remove('hidden');
		// }
	}
});

// switch (filtro) {
// 	case 'Pendientes':
// 		if (completado) {
// 			elemento.classList.add('hidden');
// 		}
// 		break;
// 	case 'Completados':
// 		if (!completado) {
// 			elemento.classList.add('hidden');
// 		}
// 		break;
// }
