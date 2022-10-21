import { STATUS_CODE } from "../enums/status.code.js";
import { publishSchema } from "../schemas/schemas.js";
import {connection} from '../database/db.js'

async function validateNewPost(req, res, next) {
  try {
    const validation = publishSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const message = validation.error.details.map((value) => value.message);
      res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
      return;
    }
    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function validateId(req, res, next){
  const {id, type} = req.body;
  try {
    const existId = (await connection.query(`SELECT posts.likes FROM posts WHERE id = $1`, [id])).rows;
    if(existId.length === 0) return res.sendStatus(STATUS_CODE.NOT_FOUND);
    if(type !== 'like' && type !== 'noLike') return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    res.locals.like = existId[0].likes;
    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { validateNewPost, validateId };
