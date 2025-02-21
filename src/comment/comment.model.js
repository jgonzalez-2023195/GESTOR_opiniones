import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Comment text is required']
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
        reactions: {
            type: String,
            enum: ['👍','❤️','😂','😢','😮'],
            default: null
        },
        visibility: {
            type: String,
            enum: ['PUBLIC', 'PRIVATE'],
            default: 'PUBLIC'
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
        versionKey: false,//validacion de mongo para cambiar si se elimina una category
        timestamps: true
    }
);

export default model('Comment', commentSchema);