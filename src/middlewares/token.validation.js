import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/status.code.js";
import * as authRepository from "../repositories/auth.repository.js";

async function tokenValidation(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const { rows: isValidToken } = await authRepository.selectUserToken(
      verifyToken.userId,
      token
    );
    if (isValidToken.length === 0) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    res.locals.userId = verifyToken.userId;
    res.locals.token = token;
    next();
  } catch (error) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
}

export { tokenValidation };
