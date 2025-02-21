import { Schema, model } from "mongoose";

const publicationSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            default: ' '
        },
        text: {
            type: String,
            required: [true, 'Text is required'],
            default: ' '
        },
        mediaPicture: {
            type: String,
            default: null
        },
        userPublication: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User publication is required']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        reactions: {
            type: String,
            enum: ['👍','❤️','😂','😢','😮'],
            default: null
        },
        visibility: {
            type: String,
            enum: ['PUBLIC', 'PRIVATE', 'FRIENDS'],
            default: 'PUBLIC',
            required: [true, 'Visibility is required']
        },
        hashtags: [{
            type: String
        }],
        mentions: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Publication', publicationSchema);