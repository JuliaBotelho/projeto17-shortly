import { signUpSchema } from "../models/signup.schema.js";
import { connectionDB } from "../database/db.js";

export async function checkNewUser(req, res, next) {
    const  newUser  = req.body;
    const errors = signUpSchema.validate(newUser);
    if (errors.error) {
        res.status(409).send(errors.error.details.map(d => d.message))
        return
    } 
    if (newUser.password !== newUser.confirmPassword) {
        res.sendStatus(409);
        return
    }

    const emailExists = await connectionDB.query('SELECT email FROM users WHERE email = ($1);', [newUser.email]);
    if (emailExists.rows.length > 0) {
        res.sendStatus(409);
        return
    }

    res.locals.newUser = newUser;
    next();
}


