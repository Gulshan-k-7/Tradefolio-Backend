import { TradingOption } from "../models/tradingOption.model.js";
import { User } from "../models/user.model.js";

export const addTradingOption = async (req, res) => {
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

    const { category, name } = req.body;

    if (!category || !name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category and name are required",
      });
    }

    const allowedCategories = ["strategy", "asset", "tradeType", "assetClass"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const cleanedName = name.trim();

    const option = await TradingOption.create({
      user: user._id,
      category,
      name: cleanedName,
      normalizedName: cleanedName.toLowerCase(),
    });

    return res.status(201).json({
      success: true,
      message: "Option added successfully",
      option,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This option already exists",
      });
    }

    console.error("Add trading option error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add option",
    });
  }
};


export const getTradingOptions = async (req, res) => {
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

    const options = await TradingOption.find({
      user: user._id,
    }).sort({
      category: 1,
      name: 1,
    });

    return res.status(200).json({
      success: true,
      options,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch options",
    });
  }
};


export const deleteTradingOption = async (req, res) => {
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

    const option = await TradingOption.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Option deleted successfully",
      optionId: option._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete option",
    });
  }
};

