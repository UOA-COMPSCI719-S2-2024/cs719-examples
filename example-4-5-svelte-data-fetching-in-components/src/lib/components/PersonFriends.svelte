<script>
  export let id = null;
  let friends = [];

  //   Re-run the fetchFriends() function whenever id changes.
  $: fetchFriends(id);

  /**
   * Asynchronously fetch the friends of the person with the given id from trex-sandwich.
   *
   * @param id the id to fetch. If null, do not try to fetch.
   */
  async function fetchFriends(id) {
    if (id == null) {
      friends = [];
      return;
    }

    // Fetch the friends
    const response = await fetch(`https://people-db.trex-sandwich.com/people/${id}/friends`);

    // Get friends as JS object array
    const data = await response.json();

    //Set the firends variable above, which will cause the UI to update.
    friends = data;
  }
</script>

<ul>
  {#each friends as friend (friend.id)}
    <li>{friend.firstName} {friend.lastName}</li>
  {/each}
</ul>
