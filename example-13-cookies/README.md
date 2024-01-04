# CS719 - Cookies 🍪

This example shows a webapp with a SvelteKit frontend and node.js / Express backend, which lets you create and view arbitrary cookies. The main key concepts are listed here:

## Viewing cookies in the browser - [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

The browser has a special property - `document.cookie` - which you can use to see _most_ cookies available to your website, within your client-side JavaScript code. This property returns a string which is a semicolon-separated list of cookies. For example, if I had three cookies, then `document.cookie` might return something like this:

```
name=Andrew;likes=Pokemon;cs719=awesome
```

It's useful to be able to parse this string to get the data for individual cookies. We have written a function which does this, which you can find in the frontend's [`src/lib/js/cookie-util.js`](./frontend/src/lib/js/cookie-util.js) file, called `parseDocumentCookies()`. If `document.cookie` returned the above string, then the result of that function would be:

```js
{
  name: "Andrew",
  likes: "Pokemon",
  cs719: "awesome"
}
```

The function also handles more complex cases, where the cookie value is a JSON string, by using `JSON.parse()`. Feel free to examine the function, and copy it _(citing the source!!!)_ into your own apps.

You can see an example where it's used in `+page.svelte`, line 16, then we're displaying all the cookie data on line 53.

## Viewing cookies on the server - [`cookie-parser`](https://www.npmjs.com/package/cookie-parser) package

We can use the `cookie-parser` NPM package in our node.js / Express server to view all cookies sent to the server by the browser. You can see this included in our dependencies in the backend's `package.json` so it will be available when you `npm install`. If you're building your own app, you can use `npm install cookie-parser` to add it.

In the backend's `app.js` line 34, we are adding the cookie parser as middleware so it is available to all our routes. This will make all cookies sent by the browser available to our routes as `req.cookies`, which will be in a format similar to the above example.

We can see an example of its use in `routes/api/api-cookies.js` line 11 where we are simply console logging all cookies coming from the browser. we're also sending the value back to the client as a JSON response to display in the Svelte webapp.

## Creating cookies on the server

With the cookie middleware, we also gain the ability to create new cookies on the server, which will then automatically be sent back to the client. The `res.cookie()` function lets us specify a name (string), value (any object), and other config information including:

- Expiry date
- path ("/" will make the cookie available to the entire website)
- httpOnly - if `true`, the cookie will _not_ be available through the `document.cookie` property on the browser, but will still be sent by the browser in any requests to the server.

We can see an example of cookie creation in `routes/api/api-cookies.js` line 26, where we're creating a new cookie with some default values, and some other values sent by the client. This will automatically add the new cookie info to the `Set-Cookie` header in the response, where the browser will read this header and store the cookie.

## `fetch()`, CORS, and cookies

When dealing with cookies, the default behaviour of fetch requests and CORS handling needs to be modified.

### fetch

When the browser sends a normal request to the server (e.g. when you refresh the page or first navigate to the page), it will send all cookies associate with that page to the server. However, the browser will not usually send cookies when making `fetch()` requests. In order to make the browser send cookies with `fetch()` requests (and also to make the browser add any incoming cookies from the server), we need to specify `credentials: "include"` as a config option. We can see examples of this in two places in the example (both on the frontend):

- `routes/+page.js` line 9
- `lib/components/NewCookieForm.svelte` line 26

However, when including credentials in our `fetch` requests, we need to add additional config to our server as well.

### CORS

CORS is the thing that allows us to make `fetch()` requests to servers on different origins - for example, or Svelte app running on `localhost:5173` making a request to our `node.js` server on `localhost:3000`. Until now, we have configured this on the server to allow requests from _any_ (**\***) origin. However, for security reasons, browsers will _not_ allow setting `credentials: "include"` for `fetch()` requests when we are allowing any origin on the server. Therefore, we must change this behaviour.

In our backend's `app.js` line 24, we can see we're configuring the CORS middleware with some extra info. The `origin` property is an array of all allowed origins - if supplied, then it will only accept requests from those origins, rather than any. And, we must also supply the `credentials` option, with value `true`.
