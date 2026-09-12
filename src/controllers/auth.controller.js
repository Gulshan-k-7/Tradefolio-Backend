import { User } from "../models/user.model.js";

export const syncUser = async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;

    const provider =
      firebaseUser.firebase?.sign_in_provider === "google.com"
        ? "google"
        : firebaseUser.firebase?.sign_in_provider === "password"
          ? "password"
          : "unknown";

    const user = await User.findOneAndUpdate(
      {
        firebaseUid: firebaseUser.uid,
      },
      {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.name || "",
        email: firebaseUser.email,
        photoURL: firebaseUser.picture || "",
        provider,
        lastLoginAt: new Date(),
      },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Sync user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to sync user",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUid: req.firebaseUser.uid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};