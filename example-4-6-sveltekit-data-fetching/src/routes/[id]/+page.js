/**
 * This function will be called by SvelteKit when this route loads (or when the [id] changes).
 * It will load the friends of the person with the given id.
 */
export async function load({ fetch, params, parent }) {
  // Any "parent" data, such as that in the root layout load() function, will be available here.
  // We are using this to find the person with the matching id, which we already loaded before.
  const parentData = await parent();
  const person = parentData.people.find((p) => p.id == params.id);
  const name = person.firstName;

  // In addition, we are fetching more data, getting the friends of that person.
  const friendsResponse = await fetch(
    `https://people-db.trex-sandwich.com/people/${params.id}/friends`
  );
  const friends = await friendsResponse.json();

  // Return the original person's name, and that person's friends.
  return { name, friends };
}
