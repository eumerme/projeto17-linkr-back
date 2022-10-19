import * as timelineRepository from "../repositories/timeline.repository.js";
import { STATUS_CODE } from "../enums/status.code.js";
import { publishSchema } from "../schemas/schemas.js";

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

export { validateNewPost };
