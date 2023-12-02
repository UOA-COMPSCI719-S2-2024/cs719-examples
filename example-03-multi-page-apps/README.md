# CS719 - Multi-page applications

This project contains several examples from the "Svelte II" lecture, along with helpful comments.

In this project, you can see the following:

- **Routes**: Until now, our examples have all had only one _route_, or _page_. In this application, we have several:

  - `/`: The homepage
  - `/about`: The "about me" page
  - `/articles`: Displays a list of articles, and allows the user to select one of them to read.

- **Filesystem-based router**: In this course, we are using [SvelteKit](https://kit.svelte.dev/), which includes a filesystem-based router. With this, we can easily define different routes with folders inside the `routes` directory.

  - `/routes/+page.svelte` is the homepage.
  - `/routes/about/+page.svelte` is the "about me" page.
  - `/routes/articles/+page.svelte` is the "articles" page.
  - `/routes/articles/[id]/+page.svelte` is individual article reader page (see below).

- **Layouts and `<slot>`s**: SvelteKit layouts allow us to define common page layouts which are shared amongst many pages. For example, the root layout ([`/routes/+layout.svelte`](./src/routes/+layout.svelte)) contains a top navbar, which is rendered for all pages in our application. The actual page content is rendered at the `<slot />` location (see) `routes/+layout.svelte` line 25.

- **Nested layouts**: We can have multiple layouts, all of which will be rendered for a matching route. In this application, we have two layouts. `routes/+layout.svelte` is the root layout, and will be rendered for all pages. In addition, we have [`/routes/articles/+layout.svelte`](./src/routes/articles/+layout.svelte), which will _also_ be rendered when we navigate to `/articles` or any sub-routes (e.g. `/articles/1`, `/articles/2`...).

  Let's say we navigate to `/articles`. In that case, we will render the root layout. Inside that, we will render the articles layout. Inside _that_, we will in turn render the [articles page](./src/routes/articles/+page.svelte).

- **Hyperlinks and client-side routing**: There are many links (`<a>` elements) throughout the app - for example, in `/routes/+layout.svelte` line 24. These work just the same as regular HTML links, except that when we navigate to another page within our own app, this navigation will be performed _client-side_. We don't need any roundtrips to the server or page refreshes, leading to a much better user experience.

- **`<svelte:head>`**: Svelte has a `<svelte:head>` element which we can use to define information in our pages which would usually go into the HTML `<head>` section of an HTML document. We can see examples of this in many of the `+page.svelte` files in this app, where we use this for its most common purpose - to change the `<title>` and thus, what text appears in the browser tab.

- **Route parameters**: Let's say we want to include some _dynamic_ routes in our app - these are routes which we don't necessarily know exist when we create our app. For example, in this app, we want to let users browse one or more articles, by supplying the article ID as part of the URL, as a _route parameter_.

  With SvelteKit, we can create a route parameter by naming the route's folder with square brackets `[ ]`. In our app, we can see a folder named `[id]` inside the `routes/articles` folder.

  This has created a route parameter named `id`, which will match any string. For example, navigating to `/articles/1`, `/articles/4`, and `/articles/foo` would all end up displaying the page located at `/articles/[id]/+page.svelte`. We can access this value from our code to display different articles (see below).

- **The `page` store**: In Svelte, _stores_ are ways of defining data which may change - and our pages can react to those changes - without those data being tied to any particular Svelte component. We will explore stores more in another example, but for now, just know that there are a few stores already provided which contain useful data.

  In SvelteKit, one such store is the `page` store, which we can import into our code like so:

  ```js
  import { page } from "$app/stores";
  ```

  This store contains a couple of useful bits of information. When accessing this information, note that we prepend "page" with a dollar sign (i.e. `$page`) - this is how we access all store data (see later examples).

  - **Page URL**: Using the page store, we can get the URL / path name of the user's current page within our application. You can see one use of this in the root layout (`/routes/+layout.svelte`). On line 6, we're grabbing the `url.pathname` from the store, then on line 24, we're using it to conditionally apply the `active` CSS class to our hyperlinks, based on whether the user is currently viewing the corresponding page.

  - **Route params**: Using the page store's `params` property, we can access all route parameters on the user's current page. In [`/routes/articles/[id]/+page.svelte`](/routes/articles/[id]/+page.svelte) line 9, we're getting the `id` param from the `$page.params` property, and using it to find the article to display with the matching `id`.
