import { Fund } from "../models/fund.model.js";
import { User } from "../models/user.model.js";

export const addFund = async (req, res) => {
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

    const { date, type, amount, strategy } = req.body;

    if (!date || !type || amount === "" || !strategy) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const fund = await Fund.create({
      user: user._id,
      date,
      type,
      amount: Number(amount),
      strategy,
    });

    return res.status(201).json({
      success: true,
      message: "Fund event added successfully",
      fund,
    });
  } catch (error) {
    console.error("Add fund error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add fund event",
    });
  }
};


export const getFunds = async (req, res) => {
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

    const funds = await Fund.find({
      user: user._id,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      funds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fund events",
    });
  }
};


export const deleteFund = async (req, res) => {
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

    const fund = await Fund.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!fund) {
      return res.status(404).json({
        success: false,
        message: "Fund event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fund event deleted",
      fundId: fund._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete fund event",
    });
  }
};