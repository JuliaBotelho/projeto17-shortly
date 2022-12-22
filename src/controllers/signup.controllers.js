import bcrypt from "bcrypt";
import { connectionDB } from "../database/db";

export async function createNewUser(req, res) {
    const newUser = { ...res.locals.newUser };

    const cryptoPass = bcrypt.hashSync(newUser.password, 10);

    try {
        await connectionDB.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [newUser.name, newUser.email, cryptoPass]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}