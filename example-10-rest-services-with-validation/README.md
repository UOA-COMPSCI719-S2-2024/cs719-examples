# CS719 - REST APIs - Request validation

This project shows off the same customer / orders RESTful API as the previous two examples, but extended to include **request validation** using the [**yup**](https://www.npmjs.com/package/yup) package.

## The case for request validation

It always pays to validate any data sent to us by clients. Even if we have form validation on our website, we don't know that's where the data came from (for example, some leet hacker could be using Postman to pass random data to our APIs!). Therefore, we _always_ want to check incoming data from clients on the server-side, even if we're already checking it client-side.

The previous two examples had no validation whatsoever Here are just a couple of bugs introduced as a result of this:

1. **Weird customers**: Consider the following request body sent to `POST /api/customers`:

   ```json
   {
     "firstName": "Bob",
     "email": 4
   }
   ```

   In this case we're not supplying a `lastName` at all - and `4` hardly looks like a valid email address! However, our previous examples would happily accept this request. This would lead to problems - for example, our "customer search" code assumes that all three of `firstName`, `lastName` and `email` are defined and are strings. If that's not the case, our search code will crash. Whoops.

2. **Changing ids when not allowed**: Consider the following request body sent to `PATCH /api/customers/1`:

   ```json
   {
     "id": 2,
     "firstName": "HAXXXXX"
   }
   ```

   Our previous code will happily overwrite the data of customer `1` with this new object - which will change the `id` - something which we probably shouldnt be allowed to do!

3. **Adding extra data**: Consider another request body sent to `PATCH /api/customers/1`:

   ```json
   {
     "firstName": "HAXXXXX",
     "foo": "Bar"
   }
   ```

   We have an extra value defined here - `foo` - which we probably don't want to add to our database. However, our code will happily treat this as a valid customer data, and add it anyway. Not good!

Clearly, we need some kind of data validation to stop these - and other - errors from occurring!

### Our validation rules

We have the following data validation rules we'd like to apply to various routes in our application.

1. `POST /api/customers`: When creating a new customer, every request should include a `firstName`, `lastName`, and `email`. All three are required, all three should be strings, and `email` should be a valid email address. Any other provided data should be ignored, and not added to the database.

2. `PATCH /api/customers/:customerId`: When updating a customer, the request should _optionally_ include the three properties as above - we don't need to supply all of them (though if we do supply any, they must be valid). Any other provided data should be ignored.

3. `POST /api/customers/:customerId/orders`: When creating a new order for a customer, the request must include an _array_ of order items. There must be at least one item in the array. Each item must have a `product` property (string), and an `amount` (integer, greater than 0).

Several of these rules would be non-trivial to code by ourselves, so we will enlist the help of a popular third-party `npm` package - [**yup**](https://www.npmjs.com/package/yup).

### The Yup package

In [`customers-dao.js`](./src/data/customers-dao.js) line 75, we have defined a Yup _schema_ for a "create customer" request. Then, on line 100, in our route handler, we are calling its `validateSync()` function, supplying an object with two properties as options:

- `abortEarly` will make the validator throw an error as soon as it finds an error with the input data if true. This will make your application a little faster, but may not lead to good error messages for the user if multiple things are wrong with their input.
- `stripUnknown` will remove all unknown properties (such as "foo" in example 3 above). Usually you will want this to be true.

If `validateSync()` returns successfully, then we _know_ that the returned object will match our provided schema. If it doesn't, it will throw an error (which we are handling in our route handlers to return a 422 response).

Another example can be seen in the same file on lines 167 and 194 (updating a customer), and then in `orders-dao.js` lines 52 and 79 (creating a new order). The "create order" schema is particularly complex, but Yup can handle arbitrarily complex schema.

A full deep-dive of this package is beyond the scope of this course. However, you will be expected to perform simple request validation in a practical test, and complex validation in the final project. So we highly encourage you to look into the library further when you can!
