import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT);

    console.log("DECODED USER:", decode);

    req.user = decode;
    return next();
  } catch (err) {
    console.error("JWT ERROR:", err);
    next(err);
  }
};
