import { browser } from "$app/environment";

/**
 * Parses the document.cookie property and returns an object with all cookie data. The cookie names will be
 * property names (keys) in the returned object; the cookie values will be the values associated with those keys.
 *
 * If not running on the browser, just returns an empty object.
 *
 * Handles standard string values, JSON strings, and JSON strings prefixed with "j:" (commonly added by node.js / Express cookie-parser).
 *
 * @author Andrew Meads & ChatGPT (I got ChatGPT to write this, but it got a few things wrong which I had to fix...)
 */
export function parseDocumentCookies() {
  // If we're running on the server, just get outta here, because document.cookie doesn't exist.
  if (!browser) return {};

  const cookies = {};

  // Split cookie string and get all individual name=value pairs
  const cookiePairs = document.cookie.split(";");

  // Iterate over the pairs and split into name and value
  for (let i = 0; i < cookiePairs.length; i++) {
    let [name, value] = cookiePairs[i].split("=");
    // Trim whitespace from name and value
    name = name.trim();
    value = value ? value.trim() : "";

    // Add the cookie, with value parsed from below function.
    cookies[name] = parseValue(value);
  }

  return cookies;
}

/**
 * Parses a cookie value. Tries to parse as JSON first, removing the "j:" prefix if it exists. If that fails,
 * just returns the value itself.
 *
 * @param {string} value the value to parse
 * @returns the parsed value
 */
function parseValue(value) {
  const decodedValue = decodeURIComponent(value);

  // If the string starts with "j:", remove it for the purposes of JSON processing.
  const possibleJSONString = decodedValue.startsWith("j:")
    ? decodedValue.substring(2)
    : decodedValue;

  // Return JSON value. If that fails, just return as a string.
  try {
    return JSON.parse(possibleJSONString);
  } catch {
    return decodedValue;
  }
}

/**
 * Sets / modifies the client-side cookie with the given name to the given value and (optionally) other data.
 * 
 * We aren't actually using this function anywhere in this code example, but feel free to use it yourself (please cite!)
 *
 * @param {string} name the name of the cookie
 * @param {any} value the new value of the cookie
 * @param {{expires: Date, path: string, jsonPrefix: boolean}} options extra optional configuration options for setting
 *  expiry date (defaults to one week from today), path (defaults to "/"), and json string prefix behaviour (defaults
 *  to appending "j:" to JSON strings for compatibility with node.js / Express).
 * 
 * @author Andrew Meads
 */
export function setCookie(name, value, options = {}) {
  const expires = options.expires ?? new Date(Date.now() + 604800000);
  const path = options.path ?? "/";
  const jsonPrefix = options.jsonPrefix !== undefined ? options.jsonPrefix : true;

  // Prepare value
  let stringifiedValue;
  if (typeof value === "string") {
    // If value is a simple string, just URL-encode it.
    stringifiedValue = encodeURIComponent(value);
  } else {
    // If value is an object or array, JSON stringify it, then (optionally) prefix it, then encode it.
    stringifiedValue = JSON.stringify(value);
    if (jsonPrefix) stringifiedValue = "j:" + stringifiedValue;
    stringifiedValue = encodeURIComponent(stringifiedValue);
  }

  // Get cookie string; set cookie
  const cookieString = `${name}=${stringifiedValue};expires=${expires.toUTCString()};path=${path}`;
  document.cookie = cookieString;
}
