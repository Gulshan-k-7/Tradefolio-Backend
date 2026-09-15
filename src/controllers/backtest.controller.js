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

    if (!strategy || !symbol || !month || !side || !result || riskReward === "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const rr = Number(riskReward);

    if (!Number.isFinite(rr) || rr <= 0) {
      return res.status(400).json({
        success: false,
        message: "Risk reward ratio must be greater than 0",
      });
    }

    const entry = await Backtest.create({
      user: user._id,
      strategy,
      symbol,
      month,
      side,
      result,
      riskReward: rr,
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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const entry = await Backtest.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Backtest entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      entryId: entry._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete backtest entry",
    });
  }
};