<script>
  let username = "";
  let password = "";
  let favouritePokemon = "charmander";
  let bio = "";
  let likesPie = true;
  let favouriteCarBrands = "mg,bmw";

  function handleSubmit(e) {
    alert("Form values logged to console.");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Favourite Pokemon: ${favouritePokemon}`);
    console.log(`Bio: ${bio}`);
    console.log(`Likes pie?: ${likesPie}`);
    console.log(`Favourite car brands: ${favouriteCarBrands}`);
  }
</script>

<div>
  <!-- Using the |preventDefault option will have the same effect as calling
        e.preventDefault() at the top of our submit function. This is a cleaner
        way of doing this in Svelte. -->
  <form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username:</label>
    <input type="text" name="username" bind:value={username} />

    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} />

    <label for="favouritePokemon">Favourite Pokemon:</label>
    <!-- We can bind to a select box's value just as easily as a textbox. -->
    <select bind:value={favouritePokemon} name="favouritePokemon">
      <option value="charmander">Charmander</option>
      <option value="squirtle">Squirtle</option>
      <option value="bulbasaur">Bulbasaur</option>
    </select>

    <!-- Text areas can have their "value" bound too. -->
    <label class="two-col" for="bio">My bio:</label>
    <textarea
      class="two-col"
      aria-multiline="true"
      rows="5"
      cols="50"
      bind:value={bio}
      name="bio"
    />

    <label class="two-col">
      <!-- We can bind to the "checked" property of a checkbox (it's a boolean). -->
      <input type="checkbox" bind:checked={likesPie} /> I {likesPie ? "like" : "don't like"} pie
    </label>

    <label class="two-col" for="cars">Select your favourite car brands</label>
    <!-- We can bind to the value of a multi-select box too. The resulting value will be a
				comma-separated string, e.g. "bmw,tesla" if "BMW" and "Tesla" are both selected. -->
    <select class="two-col" name="cars" bind:value={favouriteCarBrands} multiple>
      <option value="bmw">BMW</option>
      <option value="tesla">Tesla</option>
      <option value="audi">Audi</option>
      <option value="mg">MG</option>
    </select>

    <button class="two-col" type="submit">Submit</button>
  </form>
</div>

<style>
  div {
    display: flex;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 5px;
  }

  .two-col {
    grid-column: 1 / 3;
  }

  label:not(.two-col) {
    justify-self: right;
  }
</style>
