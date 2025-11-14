import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
}

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

const Cart = mongoose.model<ICart>("cart", cartSchema);
export default Cart;
