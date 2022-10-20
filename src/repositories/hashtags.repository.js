import { connection } from "../database/db.js";
import { TABLE } from "../enums/tables.js";

async function listPostbyHashtag(text) {
  const newText = `%${text}%`;
  return connection.query(`SELECT * FROM ${TABLE.POSTS} WHERE text LIKE $1;`, [
    newText,
  ]);
}

export { listPostbyHashtag };
