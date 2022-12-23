import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";

export async function createNewLog(req, res) {
    const loggedUser = { ...res.locals.loggedUser };
    try {
        const userPass = await connectionDB.query('SELECT password FROM users WHERE email = $1;', [loggedUser.email]);
        const passwordCheck = bcrypt.compareSync(loggedUser.password, userPass.rows[0].password);

        if (!passwordCheck) {
            return res.status(401).send("A senha está incorreta.");
        }

        const userData = await connectionDB.query('SELECT id FROM users WHERE email = $1;',[loggedUser.email]);
        console.log(userData.rows[0].id)
        const userSessionExists = await connectionDB.query('SELECT id FROM sessions WHERE userid = $1;',[Number(userData.rows[0].id)]);
        if(userSessionExists){
            await connectionDB.query('DELETE FROM sessions WHERE userid = $1;',[userData.rows[0].id]);
        }
        const newToken = uuidV4(); 
        await connectionDB.query('INSERT INTO sessions (userid, token) VALUES ($1, $2);',[userData.rows[0].id, newToken]);

        res.status(200).send(newToken);
        
    } catch(err){
        res.status(500).send(err.message);
    }
}


