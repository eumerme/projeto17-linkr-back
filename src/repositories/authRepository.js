import { connection } from "../database/db.js";

function register(name, email, passwordHash){
    connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, 
    [name, email, passwordHash]);
}

export { register };