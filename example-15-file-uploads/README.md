# CS719 - File uploads

This example shows how we can do file uploads, using the [`multer`](https://expressjs.com/en/resources/middleware/multer.html) NPM package on the backend, and the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) object on the frontend.

## Multer

On the backend, we can set up one or more of our API routes to use multer. These routes will no longer accept JSON data from the browser, but instead will accept `multipart/form-data`.

We can see an example in `routes/api/api-upload.js`, where we have a single route handler for `POST` requests. On line 7 we are creating an `upload` middleware using the `multer` package which has been imported. On that line, we are saying that all uploaded files will be put in our "temp" folder to start with.

On line 17, we have our route handler, which uses `upload.single(...)` middleware. This route handler will process a single file upload, named "image-file" (we will see how to name our uploads in the next section).

If we send any other _string_ key / value pairs along with this file, they will be available under `req.body` (see below for an example). The file upload will be available as `req.file`.

In the rest of this function, we can see several useful properties of `req.file`, along with an example of how to move the file somewhere else (in this case, our public "images" folder) after it's been uploaded.

## FormData

On the frontend, we can see an example of sending data - including a text message and a file upload - to the API route above.

In `+page.svelte` line 40, we have an HTML form that includes an `<input type="file">`, allowing the user to specify a file to upload. The upload element is restricted to PNG and JPEG images. The form also has a simple text input, allowing the user to send a message along with the image (just to show how we can send multiple types of data like this).

On line 13, we're handling the form submission. On line 15, we're creating a new `FormData` object, and adding both the text message and the file upload to it. Notice that we're naming these `message` and `image-file`. These names are how we must refer to them on the server-side.

On line 22, we're making a `POST` request to our API route. We can send the `FormData` object directly in the request body, and it will be handled by multer on the backend.