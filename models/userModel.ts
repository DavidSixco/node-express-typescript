import { model, Schema } from 'mongoose';

interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSquema: Schema = new Schema({
    name: {
        type: String,
        require: true,
        unique: false,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: false,
    }
});

export default model<IUserModel>('User', UserSquema);