import { signInSchema } from "../models/signin.schema.js";
import { connectionDB } from "../database/db.js";

export async function checkNewLog(req, res, next) {
    const loggedUser = req.body;
    const errors = signInSchema.validate(loggedUser);
    if (errors.error) {
        res.status(422).send(errors.error.details.map(d => d.message))
        return
    };

    const emailExists = await connectionDB.query('SELECT email FROM users WHERE email = $1', [loggedUser.email]);
    if (emailExists.rows.length === 0) {
        res.sendStatus(409);
        return
    }

    res.locals.loggedUser = loggedUser;
    next();
}