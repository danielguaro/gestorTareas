export class Todo {
	constructor(tarea) {
		this.tarea = tarea;

		this.id = new Date().getTime(); //con el getTime() obtengo números aleatorios
		this.completado = false;
		this.creado = new Date();
	}
}
