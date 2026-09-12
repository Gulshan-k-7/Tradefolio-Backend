import { Trade } from "../models/trade.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";

export const createTrade = asyncHandler(async (req, res) => {
    console.log("i am here")
    
    const user = await User.findOne({
        firebaseUid: req.firebaseUser.uid,
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User account not found",
        });
    }

    const { date, symbol, assetClass, side, buyPrice, sellPrice, size, brokerage, rMultiple, setup, notes, } = req.body;

    const pnl = (sellPrice - buyPrice) * size - brokerage;
    if (!date || !symbol || !assetClass || !side || buyPrice === "" || sellPrice === "" || size === "") {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing",
        });
    }

    const trade = await Trade.create({
        user: user._id,
        date,
        symbol,
        assetClass,
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