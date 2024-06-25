<script>
  import NewTodoForm from "$lib/components/NewTodoForm.svelte";
  import TodoList from "$lib/components/TodoList.svelte";

  // Import the svelte store containing the todo list.
  import { todoStore } from "$lib/js/todo-store.js";

  /**
   * Handles adding a new todo item to the store.
   *
   * @param e contains information in the detail property about the newly added todo item.
   */
  function handleNewTodo(e) {
    const { task, dueDate } = e.detail;
    const newTodo = { task, dueDate, isComplete: false };

    // To add a new item, we can create a new array containing all current items
    // (the ... syntax), plus the new item.
    $todoStore = [...$todoStore, newTodo];
  }
</script>

<h1>Todo List</h1>
This page shows of a more "complete" example, showing how we can build a todo-list app, backed by a Svelte
store.

<div class="container">
  <div>
    <h2>My Todos</h2>
    <!-- Because the TodoList edits the components, we must use bind: rather than simple prop passing,
            to ensure that this page is appropriately notified of any changes to the todo list and its items. -->
    <TodoList bind:todos={$todoStore} />
  </div>
  <div>
    <h2>New todo</h2>
    <NewTodoForm on:submit={handleNewTodo} />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
</style>
