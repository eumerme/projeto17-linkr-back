import { STATUS_CODE } from "../enums/status.code.js";
import * as timelineRepository from "../repositories/timeline.repository.js";

async function publishPost(req, res) {
  const { userId } = res.locals;
  const { comment, url } = req.body;

  try {
    await timelineRepository.publishNewPost(userId, comment, url);
    res.sendStatus(STATUS_CODE.CREATED);
    return;
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

export { publishPost };
