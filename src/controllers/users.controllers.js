import { connectionDB } from "../database/db.js";

export async function retrieveData(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Sua sessão expirou");
    }

    const tokenExists = await connectionDB.query('SELECT token FROM sessions WHERE token = $1', [token]);
    if (tokenExists.rows.length === 0) {
        res.sendStatus(404)
        return
    }

    const userData = await connectionDB.query('SELECT users.id FROM users JOIN sessions ON sessions.userid = users.id WHERE token = $1', [token]);
    const user = userData.rows[0].id;

    try {
        const userSet = await connectionDB.query('SELECT users.id, users.name, SUM(urls.visits) AS "visitCount" FROM users JOIN urls ON urls.userid = users.id WHERE users.id = $1 GROUP BY users.id;',[user])

        const urlObjects = await connectionDB.query('SELECT urls.id, urls.shorturl AS "shortUrl", urls.url, urls.visits AS "visitCount" FROM urls WHERE urls.userid = $1;',[user])

        const objToGo = {
            id: userSet.rows[0].id,
            name: userSet.rows[0].name,
            visitCount: userSet.rows[0].visitCount,
            shortenedUrls: urlObjects.rows
        }
        res.status(200).send(objToGo)
    } catch (err) {
        res.status(500).send(err.message);
    }

}