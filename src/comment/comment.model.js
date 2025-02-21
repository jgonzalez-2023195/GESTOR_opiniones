import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Comment text is required'],
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Comment author is required']
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication reference is required']
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        likes: {
            type: Number,
            default: 0
        },
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },
        mentions: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        isEdited: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Comment', commentSchema);