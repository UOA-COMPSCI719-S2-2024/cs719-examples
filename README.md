# CS719 Example Code

This repository contains example code which you can run and play around with. **Important:** It is likely that this repo will be updated throughout the semester. Please `git pull` regularly - _especially_ if instructed to do so by your lectuerer!

This is my change.

## Index by topic

### Topic 1: HTML

1. [**html-basics**](./example-1-1-html-basics/): Shows off some basic HTML elements such as headings, paragraphs, and lists, and demonstrates the difference between block-level and inline elements.

2. [**html-tables**](./example-1-2-html-tables/): Shows the structure of an HTML table, including table sections (`tbody`, `thead`, `tfoot`), rows and cells.

3. [**html-forms**](./example-1-3-html-forms/): Shows off a plethora of HTML form elements which can be used to allow users to input data into the page. The data can be either submitted to a server, or processed with client-side JavaScript code (see Topic 3 below).

### Topic 2: CSS

1. [**css-selectors**](./example-2-1-css-selectors/): Shows off a variety of commonly-used CSS selectors. CSS selectors, as their name implies, lets you use rules to _select_ which elements will be styled by a particular set of styling rules.

2. [**css-box-model**](./example-2-2-css-box-model/): Shows several examples of margins, borders, and padding, which are very important aspects of CSS layouts, used by themselves and / or in conjunction with flex and grid (see below).

3. [**image-filters**](./example-2-3-image-filters/): Shows how images can be filtered to look differently within the browser itself, no image software required, for certain image transformations.

4. [**flexbox**](./example-2-4-flexbox/): Shows a layout created using Flexbox, which can be used to layout page elements in a row or column.

5. [**grid**](./example-2-5-grid/): Shows off CSS grid, which can be used to layout page elements in a two-dimensional grid.

6. [**grid-named-areas**](./example-2-6-grid-named-areas/): Shows off named areas, which are part of CSS grid which can be used to precisely designate which page elements go into which grid rows / columns. In addition, shows off _media queries_, which can be used in conjunction with named areas and other CSS techniques to enable responsive design. Finally, shows how grid and flexbox can be used together in the same page layout - with the main page layout being dictated by a grid, with individual sections being laid out according to flex.

### Topic 3: JavaScript

1. [**basic-javascript**](./example-3-1-basic-javascript/): Shows off some basic JavaScript code, focusing on how to import script files, and when various JavaScript code will be executed.

2. [**modifying-elements-with-js**](./example-3-2-modifying-elements-with-js/): Shows how we can use `document.querySelector()` to find HTML elements on a page, then modify various properties of those elements such as `innerHTML`, `style`, and `src`. Also contains an example of a JavaScript function which takes some input arguments and returns a value.

3. [**simple-calculator**](./example-3-3-simple-calculator/): A simple HTML / JavaScript application that lets users enter two numbers in a pair of `<input>`s, then click a button to calculate and display the sum of those inputs.

4. [**conditionals**](./example-3-4-conditionals/): Shows off JavaScript `if`-`else` statements with an example application letting the user enter their age. A different message will be displayed to the user depending on the age they enter.

5. [**creating-elements**](./example-3-5-creating-elements/): Shows how we can use `document.createElement()` to create any HTML element, then `appendChild()` to add it to our page. When the user clicks a button, a new `<li>` displaying a random number will be added to a `<ul>` which already exists on the page.

6. [**loops**](./example-3-6-loops/): Contains examples of a couple of kinds of looping strategies in JavaScript. Uses a `for`-loop to create 100 new list items when the page first loads. Also uses `document.querySelectorAll()` to find all list items on a page, then uses the JavaScript array `forEach()` function to loop through and set each one to a random color.

7. [**dynamic-click-handlers**](./example-3-7-dynamic-click-handlers/): Shows that we can add event handlers - such as for mouse clicks - to dynamically-generated HTML elements. This extends the previous example to allow users to individually change the color of each list item by clicking the individual item.

8. [**js-objects**](./example-3-8-js-objects/): Shows a complex JavaScript object, representing a person. Shows how to access individual properties of that object - including _nested_ properties.

9. [**topic3-comprehensive**](./example-3-9-topic3-comprehensive/): Shows off many JavaScript fundamentals (and some HTML and CSS too), bundled into one simple website which displays personnel data. The data is created as an array of JavaScript objects, which is then iterated over and passed around to create various HTML table elements, displaying each person in its own table row. The functionality is broken down into several functions - showing how the use of functions, plus good code comments, can make each individual part of the code easier to understand.

### Topic 4: Svelte

1. [**intro-to-svelte**](./example-4-1-intro-to-svelte/): Contains basic Svelte examples, including components, props & exports, event handling, reactivity, styling, and logic blocks.

2. [**binding**](./example-4-2-binding/): Contains more advanced Svelte exmaples, including custom events and data binding.

3. [**stores**](./example-4-3-stores/): Contains examples showing how Svelte stores can be created and used. Stores are a great way to take certain application state "out of" the component hierarchy and share it amongst many different components, while maintaining reactivity. This example shows off both writable & derived stores, and the use of the `$` syntax to access and modify stores almost as if they were plain variables.

4. [**multi-page-apps**](./example-4-4-multi-page-apps/): Contains examples showing how the SvelteKit filesystem-based router can be used to provide multi-page apps. Includes information on routes, file & directory structure, layouts and `<slot>`s, hyperlinks, route parameters, and more.

### Topic 5: Node.js, Express, and APIs

1. [**the-simplest-server**](./example-5-1-the-simplest-server/): Contains a project showing now [Node.js](https://nodejs.org/en) can be used to create a simple HTTP server, with no additional dependencies. In practice, using Node by itself for this purpose is very uncommon; we usually use an additional framework such as Express (see below) on top of this.

2. [**intro-to-express**](./example-5-2-intro-to-express/): Contains a basic Node.js / [Express](https://expressjs.com/) server with a couple of _routes_ (around getting people info from a "database") and _middleware_ configurations. Contains many comments explaining what each piece does.

3. [**express-routers**](./example-5-3-express-routers/): Contains an Express server building on example 6 by organizing route handler code using Express routers. All Express servers provided (and made by you) throughout the course will follow this general layout.

4. [**rest-services**](./example-5-4-rest-services/): Contains an example RESTful Customer / Order API, written using node.js and Express.

5. [**rest-services-with-middleware**](./example-5-5-rest-services-with-middleware/): Expands on the previous exmaple by using custom middleware to extract common functionality (searching for a customer with a particular id and returning a 404 Not Found response if the customer doesn't exist) into its own reusable middleware function.

6. [**rest-services-with-validation**](./example-5-6-rest-services-with-validation/): Expands on the previous exmaple by adding validation of incoming client requests using the [Yup](https://www.npmjs.com/package/yup) package.

### Topic 6: Backend - Frontend connectivity

1. [**svelte-express**](./example-6-1-svelte-express/): Shows how we can use a SvelteKit frontend with a node.js / Express backend.

2. [**svelte-express-comprehensive**](./example-6-2-svelte-express-comprehensive/): A more advanced version of the previous example, this time also showing how we can send non-`GET` requests from the frontend.

3. [**cookies**](./example-6-3-cookies/): Shows how we can interact with HTTP cookies from both the frontend and backend.

### Topic 7: Databases

### Topic 8: The Full Stack

1. [**fullstack**](./example-8-1-fullstack/): Shows a full-stack application, including an SQLite database, node.js / Express backend, and SvelteKit frontend.

### Topic 9: Extra / supplementary material

1. [**file-uploads**](./example-9-1-file-uploads/): A bonus example showing how we can allow users to upload files using the `FormData` object on the frontend, and the `multer` package on the backend. **Hint:** Useful for your final project!!
