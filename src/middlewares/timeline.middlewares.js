import { STATUS_CODE } from "../enums/status.code.js";
import { publishSchema, likesSchema } from "../schemas/schemas.js";
import {connection} from '../database/db.js';

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

async function validateExistPost(req, res, next) {
  const { id } = req.params;
  try {
    const result = await connection.query(`SELECT * FROM posts WHERE posts.id = $1;`, [id]);
    if (result.rows.length === 0) {
      res.sendStatus(STATUS_CODE.NOT_FOUND);
      return;
    }
    
    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function validateLikes(req, res, next){
 const {userId, type} = req.body;

  try {
    const validation = likesSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const message = validation.error.details.map((value) => value.message);
      res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
      return;
    }
    const likeExist = ( await connection.query(`
    SELECT * FROM likes WHERE "userId" = $1;
    `, [userId])).rows;

    if(likeExist.length !== 0 && type === 'like') return res.sendStatus(STATUS_CODE.CONFLICT);
    if(likeExist.length === 0 && type === 'noLike') return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    next();
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}


export { validateNewPost, validateExistPost, validateLikes };
