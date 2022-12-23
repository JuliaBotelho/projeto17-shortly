import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const connectionDB = new Pool({
    host:"localhost",
    port: 5432,
    user:"postgres",
    password:"root",
    database:"shortlybank",
});

/* export const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
}) */


/* queries para criação do banco

CREATE DATABASE shortlybank;

CREATE TABLE users (id SERIAL NOT NULL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdat TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());

CREATE TABLE sessions (id SERIAL NOT NULL PRIMARY KEY, userid INTEGER NOT NULL UNIQUE REFERENCES users(id), token TEXT NOT NULL UNIQUE, createdat TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());

CREATE TABLE urls (id SERIAL NOT NULL PRIMARY KEY, userid INTEGER NOT NULL REFERENCES users(id), url TEXT NOT NULL, shorturl TEXT NOT NULL, visits INTEGER DEFAULT 0 NOT NULL, createdat TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW());

*/