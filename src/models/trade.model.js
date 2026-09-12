import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    assetClass: {
      type: String,
      required: true,

    },

    side: {
      type: String,
      required: true,
    },

    buyPrice: {
      type: Number,
      required: true,
    },

    sellPrice: {
      type: Number,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    pnl: {
      type: Number,
      required: true,
    },
    brokerage: {
      type: Number,
      required: true,
    },


    rMultiple: {
      type: Number,
      default: null,
    },

    setup: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

export const Trade = mongoose.model("Trade", tradeSchema);