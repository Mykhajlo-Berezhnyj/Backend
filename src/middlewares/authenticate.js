import createHttpError from "http-errors";
import { Session } from "../db/models/session.js";
import { User } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    next(createHttpError(401, "Please provide Authorization header"));
    return;
  }
  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer.toLowerCase() !== "bearer" || typeof token !== "string") {
    next(createHttpError(401, "Authorization header should be of type Bearer"));
    return;
  }
  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, "Session not found"));
    return;
  }

  const isAccesTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccesTokenExpired) {
    next(createHttpError(401, "Session expired"));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }
  req.user = user;
  next();
};
