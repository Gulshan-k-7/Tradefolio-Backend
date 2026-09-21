import { Backtest } from "../models/backtest.model.js";
import { User } from "../models/user.model.js";

export const createBacktestEntry = async (req, res) => {
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

    const { strategy, symbol, month, side, result, riskReward } = req.body;

    if (!strategy || !symbol || !month || !side || !result) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const rr = Number(riskReward);

   

    const entry = await Backtest.create({
      user: user._id,
      strategy,
      symbol,
      month,
      side,
      result,
      riskReward: rr || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Backtest entry added",
      entry,
    });
  } catch (error) {
    console.error("Create backtest error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add backtest entry",
    });
  }
};


export const getBacktestEntries = async (req, res) => {
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

    const entries = await Backtest.find({
      user: user._id,
    }).sort({
      month: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      entries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch backtest data",
    });
  }
};


export const deleteBacktestEntry = async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUid: req.firebaseUser.uid,
    });

    const { month } = req.body;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required",
      });
    }

    const result = await Backtest.deleteMany({
      user: user._id,
      month: month,
    });
    return res.status(200).json({
      success: true,
      message: `Backtest data for ${month} deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete backtest error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete backtest data",
      error: error.message,
    });
  }
};