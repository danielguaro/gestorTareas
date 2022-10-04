export class TodoList {
	constructor() {
		// this.todos = [];
		this.cargarLocalStorage();
	}

	nuevoTodo(todo) {
		this.todos.push(todo);
		this.guardarLocalSotarge();
	}

	eliminarTodo(id) {
		// // arreglo.splice(puntoDePartida, cantidadABorrar)
		// for (let todo in this.todos) {
		// 	console.log(this.todos[todo]['id']);
		// 	if (this.todos[todo]['id'] == id) {
		// 		this.todos.splice(todo, 1);
		// 		break;
		// 	}
		// }
		//Otra forma
		// // arreglo.filter(()=>)
		this.todos = this.todos.filter((todo) => todo.id != id);
		this.guardarLocalSotarge();
	}

	marcarCompletado(id) {
		for (let todo of this.todos) {
			// console.log('todo.id', todo.id);
			if (todo.id == id) {
				todo.completado = !todo.completado;
				this.guardarLocalSotarge();
				console.log('id', id);
				break;
			}
		}
	}

	eliminarCompletados() {
		this.todos = this.todos.filter((todo) => !todo.completado);
		this.guardarLocalSotarge();
	}

	guardarLocalSotarge() {
		localStorage.setItem('todo', JSON.stringify(this.todos));
	}

	cargarLocalStorage() {
		this.todos = localStorage.getItem('todo')
			? JSON.parse(localStorage.getItem('todo'))
			: [];
	}
}
