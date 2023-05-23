import { getDBConnection } from './storage';

export class Task {
	id: number;
	title: string;
	done: boolean;

	public constructor(id: number, title: string, done: boolean) {
		this.id = id;
		this.title = title;
		this.done = done;
	}
}

export async function getAllTasks(): Promise<Array<Task>> {
	let db = await getDBConnection();
	await db.open();

	const query = 'SELECT * FROM task;';
	const res = await db.query(query);

	let values = new Array<Task>;
	for (let value of res.values) {
		let task = new Task(value.id, value.title, value.done);
		values.push(task);
	}

	db.close()
	return values;
}
