import { writable } from "svelte/store";

const INITIAL_TODOS = [
	{ task: "Finish Lecture", dueDate: "2023-12-03", isComplete: true },
	{ task: "Finish Lab", dueDate: "2023-12-03", isComplete: false },
	{ task: "Celebrate Christmas", dueDate: "2023-12-25", isComplete: false }
];

export const todoStore = writable(INITIAL_TODOS);

// Uncomment this line to see a console log message whenever the todos store is modified in any way.
// todoStore.subscribe((todos) => console.log(todos));
