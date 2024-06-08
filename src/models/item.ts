import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ItemSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IItem>('Item', ItemSchema);
