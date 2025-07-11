import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type: mongoose.Types.Decimal128, // or Number
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Payment Done", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Payment Done",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrdersSchema);
