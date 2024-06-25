import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import fs from "fs";

/** @type Database<sqlite3.Database, sqlite3.Statement> */
let db;

/**
 * Opens the database if it's not already open, then returns it.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} the database
 */
export async function getDatabase() {
  if (!db) {
    db = await openDatabase();
  }
  return db;
}

/**
 * Opens the database identified in the DB_FILENAME env variable.
 * Then, if it didn't already exist, initializes it.
 *
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} the database
 */
async function openDatabase() {
  const dbExists = fs.existsSync(process.env.DB_FILENAME);
  const db = await open({
    filename: process.env.DB_FILENAME,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.exec("PRAGMA foreign_keys = ON");

  if (!dbExists) {
    console.log(`Database ${process.env.DB_FILENAME} doesn't exist.`);
    await initDatabase(db);
  }

  return db;
}

/**
 * Initializes the database using the init script provided in the DB_INIT_SCRIPT env variable.
 *
 * @param {Database<sqlite3.Database, sqlite3.Statement>} db the database to initialize
 */
async function initDatabase(db) {
  const initScript = process.env.DB_INIT_SCRIPT;
  console.log(`Initializing database using init script ${initScript}`);
  const sql = fs.readFileSync(initScript).toString();
  await db.exec(sql);
  console.log("Database initialized successfully!");
}
