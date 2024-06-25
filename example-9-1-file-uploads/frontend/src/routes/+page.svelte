<script>
  import { PUBLIC_API_BASE_URL, PUBLIC_SERVER_URL } from "$env/static/public";

  let filesToUpload;
  let messageToSend;

  let serverResponse = null;

  /**
   * Handles form submission. Packages up the fi
   * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; } e the form submit event
   */
  async function handleSubmit(e) {
    // Create a FormData object to send, rather than sending JSON as usual.
    const formData = new FormData();
    formData.append("message", messageToSend);
    formData.append("image-file", filesToUpload[0]);

    // We can send a FormData object directly in the body. Send a POST to our API route, with this data.
    // REMEMBER that this is not JSON we're sending - we're sending multipart form data which is handled
    // by the multer middleware on our server.
    const response = await fetch(`${PUBLIC_API_BASE_URL}/uploads`, {
      method: "POST",
      body: formData
    });

    serverResponse = await response.json();
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Home page</h1>
<p>This is the homepage.</p>

<!-- A form -->
<h2>A file upload form</h2>
<form on:submit|preventDefault={handleSubmit}>
  <label for="imageFile">File to upload:</label>
  <input
    type="file"
    multiple={false}
    name="image-file"
    accept="image/png, image/jpeg"
    bind:files={filesToUpload}
    required
  />
  <label for="message">Message:</label>
  <input type="text" name="message" bind:value={messageToSend} required />
  <button type="submit">Upload</button>
</form>

<h2>Server response</h2>
{#if serverResponse}
  <p><strong>Message:</strong> {serverResponse.message}</p>
  <img src={`${PUBLIC_SERVER_URL}${serverResponse.imageUrl}`} alt={serverResponse.message} />
{:else}
  <p>No response yet 😔</p>
{/if}
