import express from "express";

const router = express.Router();

/**
 * On a GET request to /api/cookies, this simply sends a JSON representation of all incoming cookies back
 * in the response body.
 */
router.get("/", (req, res) => {
  console.log("Incoming cookies from browser:");
  console.log(req.cookies);

  // Just send the JSON representation of all the cookies back to the browser so we can see them.
  return res.json(req.cookies);
});

/**
 * On a POST request to /api/cookies, we will create a new cookie with the name, value, and httpOnly status in the request body.
 *
 * Not doing proper error handling.... we assume everything is sent OK.
 */
router.post("/", (req, res) => {
  const { name, value, httpOnly } = req.body;

  // Actually create the new cookie
  res.cookie(name, value, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires 7 days from now (give it a time, in milliseconds)
    path: "/", // This is the default; will be accessible on your whole website.
    httpOnly
  });

  return res.sendStatus(204);
});

export default router;
