import { Schema, model } from "mongoose"

const categorySchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'name is required'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'description is required']
        },
        categoryPicture: {
            type: String,
            default: null
        },
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Category', categorySchema)