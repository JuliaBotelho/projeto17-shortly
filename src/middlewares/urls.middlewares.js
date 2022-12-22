import { urlSchema } from "../models/url.schema.js";
import{ connectionDB } from "../database/db.js"

export async function checkNewUrl(req,res,next){
    const newUrl = req.body;
    const { authorization } = req.headers;

    const errors = urlSchema.validate(newUrl);
    if(errors.error){
        res.status(422).send(errors.error.details.map(d => d.message))
        return
    };

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Sua sessão expirou");
    }

    const tokenExists = await connectionDB.query('SELECT token FROM sessions WHERE token = $1;',[token]);
    if (tokenExists.rows.length === 0){
        res.sendStatus(404)
        return
    }

    const userData = await connectionDB.query('SELECT users.id FROM users JOIN sessions ON sessions.userid = users.id WHERE token = $1;',[token]);
    const userId = userData.rows[0];

    res.locals.userId = userId;
    res.locals.newUrl = newUrl;
    next();
}