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

const listPosts = async (req, res) => {
  try {
    const result = await timelineRepository.listPost();
    return res.status(STATUS_CODE.OK).send(result.rows);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

const likes = (req, res) => {
  const {type, id} = req.body;
  const {like} = res.locals;

  try {

    timelineRepository.updateLikes(id, like, type);

    return res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
};

export { publishPost, listPosts, likes };
