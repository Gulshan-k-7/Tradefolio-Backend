import mongoose from "mongoose";

const tradingOptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["strategy", "asset", "tradeType", "assetClass"],
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

tradingOptionSchema.index(
  {
    user: 1,
    category: 1,
    normalizedName: 1,
  },
  {
    unique: true,
  }
);

export const TradingOption = mongoose.model("TradingOption", tradingOptionSchema);