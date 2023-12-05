<script>
  /**
   * Welcome to your first Svelte component!
   *
   * Code in this script block runs when the component first loads.
   */
  export let name = "Andrew";
  export let interest;
</script>

<!-- The "HTML" section starts here. We can use a mix of HTML,
	other Svelte components, and {} syntax. -->
<h2>About Me</h2>

<!-- The {} can contain any JavaScript expression, which will be evaluated and displayed.
	In this case, we're displaying the values of the "name" and "interest" variables declared above. -->
<p>My name is {name}, and I like {interest}!</p>

<!-- We can have a style block in a component. If we do, any CSS declared within will only be applied to
	this component. For example, the CSS below will make all paragraphs in this component have bold, green
	text (but will not affect any other paragraphs in our app in any way). -->
<style>
  p {
    color: green;
    font-weight: bold;
  }
</style>
