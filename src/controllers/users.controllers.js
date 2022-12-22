export async function retrieveData(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Sua sessão expirou");
    }

    const tokenExists = await connectionDB.query('SELECT token FROM sessions WHERE token = $1',[token]);
    if (tokenExists.rows.length === 0){
        res.sendStatus(404)
        return
    }

    const userData = await connectionDB.query('SELECT users.id FROM users JOIN sessions ON sessions.userid = users.id WHERE token = $1',[token]);
    const userId = userData.rows[0];
}