import mongoose, { Date, Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date
}

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model<IProduct>('product', productSchema);

export default Product;
