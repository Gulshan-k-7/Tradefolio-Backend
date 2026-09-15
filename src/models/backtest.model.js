import mongoose from "mongoose";

const backtestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    strategy: {
      type: String,
      required: true,
      trim: true,
    },

    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    month: {
      type: String,
      required: true,
    },

    side: {
      type: String,
      enum: ["long", "short"],
      required: true,
    },

    result: {
      type: String,
      enum: ["profit", "loss"],
      required: true,
    },

    riskReward: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

backtestSchema.index({
  user: 1,
  strategy: 1,
  symbol: 1,
  month: 1,
});

export const Backtest = mongoose.model("Backtest", backtestSchema);