import { firebaseAuth } from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
  
    if (!authorization ) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authorization.split("Bearer ")[1];

    const decodedToken = await firebaseAuth.verifyIdToken(token);
    console.log("Decoded Firebase token:", decodedToken);
    req.firebaseUser = decodedToken;

    next();
  } catch (error) {
    console.error("Firebase authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};