import { Trade } from "../models/trade.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";

export const createTrade = asyncHandler(async (req, res) => {

    const user = await User.findOne({
        firebaseUid: req.firebaseUser.uid,
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User account not found",
        });
    }

    const { date, symbol, tradeType, side, buyPrice, sellPrice, size, brokerage, rMultiple, setup, notes, } = req.body;

    const pnl = (sellPrice - buyPrice) * size - brokerage;
    if (!date || !symbol || !tradeType || !side || buyPrice === "" || sellPrice === "" || size === "") {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing",
        });
    }

    const trade = await Trade.create({
        user: user._id,
        date,
        symbol,
        tradeType,
        side,
        buyPrice: Number(buyPrice),
        sellPrice: Number(sellPrice),
        size: Number(size),
        pnl: Number(pnl),
        rMultiple:
            rMultiple === "" || rMultiple === undefined
                ? 0
                : Number(rMultiple),
        setup,
        notes,
        brokerage: Number(brokerage),
    });

    return res.status(201).json({
        success: true,
        message: "Trade saved successfully",
        trade,
    });

}
)

export const getTrades = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        firebaseUid: req.firebaseUser.uid,
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const trades = await Trade.find({
        user: user._id,
    }).sort({
        date: -1,
        createdAt: -1,
    });

    return res.status(200).json({
        success: true,
        count: trades.length,
        trades,
    });

}

)

export const updateTrade = async (req, res) => {
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

        const { date, symbol, tradeType, side, buyPrice, sellPrice, size, brokerage, rMultiple, setup } = req.body;

        const pnl = (sellPrice - buyPrice) * size - brokerage;

        const trade = await Trade.findOneAndUpdate(
            {
                _id: req.params.id,
                user: user._id,
            },
            {
                date, symbol, tradeType, side, buyPrice: Number(buyPrice), sellPrice: Number(sellPrice), size: Number(size),  rMultiple: rMultiple === "" ? null : Number(rMultiple), setup, pnl: Number(pnl), brokerage: Number(brokerage)
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!trade) {
            return res.status(404).json({
                success: false,
                message: "Trade not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Trade updated successfully",
            trade,
        });
    } catch (error) {
        console.error("Update trade error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update trade",
        });
    }
};

export const deleteTrade = async (req, res) => {
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

    const trade = await Trade.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trade deleted successfully",
      tradeId: trade._id,
    });
  } catch (error) {
    console.error("Delete trade error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete trade",
    });
  }
};