import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the document (optional but recommended)
interface user extends Document {
    username: String;
    age: Number;
    create_at: Date;
    update_at: Date;
}

// Define the schema
const userShema = new Schema<user>({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    create_at: {
        type: Date,
        default: new Date().getTime()
    },
    update_at: {
        type: Date,
        default: new Date().getTime()
    },

});

// Create the model
const userModel = mongoose.model<user>('user', userShema);

export default userModel;
