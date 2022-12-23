import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export async function convertToShort(req, res) {
    const { url } = { ...res.locals.newUrl };
    const { id } = { ...res.locals.userId };
    console.log(id)
    const shortenedUrl = nanoid(8);
    const resUrl = { "shortUrl": shortenedUrl }

    try {
        await connectionDB.query('INSERT INTO urls (userid,url,shorturl) VALUES ($1, $2, $3);', [id, url, shortenedUrl]);

        res.send(resUrl).status(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function retrieveUrlId(req, res) {
    const urlId = req.params;
    const uId = Number(urlId.id);

    try {
        const fetchUrl = await connectionDB.query('SELECT id, shorturl, url FROM urls WHERE id = $1;', [uId]);
        if (fetchUrl.rows.length < 1) {
            res.sendStatus(404)
            return
        }

        res.send(fetchUrl.rows[0]).status(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function excludeUrl(req, res) {
    const urlId = req.params;
    const { authorization } = req.headers;

    const uId = Number(urlId.id);

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Sua sessão expirou");
    }

    const tokenExists = await connectionDB.query('SELECT token FROM sessions WHERE token = $1;', [token]);
    if (tokenExists.rows.length === 0) {
        res.sendStatus(404)
        return
    }

    const userData = await connectionDB.query('SELECT users.id FROM users JOIN sessions ON sessions.userid = users.id WHERE token = $1;', [token]);
    const userId = userData.rows[0];

    try {
        const fetchUrl = await connectionDB.query('SELECT * FROM urls WHERE id = $1;', [uId]);

        if (fetchUrl.rows.length < 1) {
            res.sendStatus(404)
            return
        }

        const idMatch = await connectionDB.query('SELECT userid FROM urls WHERE id = $1;', [uId]);
        if (idMatch.rows[0].userid !== userId.id) {
            res.sendStatus(401);
            return
        }
        await connectionDB.query('DELETE FROM urls WHERE id = $1;', [uId]);
        console.log(uId)
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function directToShortUrl(req, res) {
    const shortenedUrl = req.params;
    const shUrl = shortenedUrl.shortUrl;

    try{
        const fetchUrl = await connectionDB.query('SELECT * FROM urls WHERE shorturl = $1;',[shUrl]);
        if(fetchUrl.rows.length < 1){
            res.sendStatus(404);
            return
        }

        const visitsUpdate = Number(fetchUrl.rows[0].visits) + 1;
        const urlId = Number(fetchUrl.rows[0].id);
        const urlToGo = fetchUrl.rows[0].url;

        await connectionDB.query('UPDATE urls SET visits = $1 WHERE id = $2;',[visitsUpdate, urlId]);

        res.redirect(urlToGo);
    }catch (err) {
        res.status(500).send(err.message);
    }
}