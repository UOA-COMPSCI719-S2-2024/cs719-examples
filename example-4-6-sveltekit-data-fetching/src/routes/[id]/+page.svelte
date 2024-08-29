<script>
  export let data;
  $: name = data.name;
  $: friends = data.friends;
</script>

<div>
  <h2>{name}'s friends</h2>
  <ul>
    {#each friends as friend (friend.id)}
      <li>{friend.firstName} {friend.lastName}</li>
    {/each}
  </ul>
</div>
