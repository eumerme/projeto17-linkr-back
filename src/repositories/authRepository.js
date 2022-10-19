import { connection } from "../database/db.js";

function register(name, email, passwordHash, imageUrl){
    connection.query(`INSERT INTO users (name, email, password, "imageUrl") VALUES ($1, $2, $3, $4);`, 
    [name, email, passwordHash, imageUrl]);
}

export { register };