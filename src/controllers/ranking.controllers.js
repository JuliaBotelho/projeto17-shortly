import { connectionDB } from "../database/db.js";

export async function retrieveRanks(req, res) {

    try {
        const rankData = await connectionDB.query('SELECT users.id, users.name, COUNT(urls.userid) AS "linksCount", SUM(urls.visits) AS "visitCount" FROM urls JOIN users ON users.id = urls.userid GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;')

        res.send(rankData.rows).status(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}