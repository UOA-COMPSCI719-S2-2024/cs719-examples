<script>
  // We can import CSS files to make the CSS within available to our app.
  import "$lib/css/app.css";

  // Will contain the results of the load() function in +layout.js.
  export let data;

  const people = data.people;
</script>

<h1>Svelte data fetching example</h1>

<div class="container">
  <div>
    <h2>People</h2>
    <!-- Display a list of all people loaded from trex-sandwich. -->
    {#each people as person (person.id)}
      <!-- For each one, display a hyperlink. When clicked, navigate to /:id, where :id
        is the person's id. -->
      <a href={`/${person.id}`} class="person">
        <h3>{person.firstName} {person.lastName}</h3>
        <p>{person.info}</p>
      </a>
    {/each}
  </div>

  <!-- If we're navigating to a person's "friends" page, it will be displayed here. -->
  <slot />
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    & > div {
      border: 1px dashed lightgray;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .person {
    display: block;
    text-decoration: none;
    color: inherit;
    text-align: center;
    cursor: pointer;
    width: 100%;
    border: 0;
    margin: 0;
    padding: 0.2rem;

    &:nth-child(odd) {
      background-color: rgb(182, 212, 238);
    }

    &:hover {
      background-color: rgb(138, 161, 180);
    }
  }
</style>
