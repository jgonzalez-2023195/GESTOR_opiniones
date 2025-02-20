import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            required: [true, 'surname is required']
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true
        },
        password: {
            type: String,
            requried: [true, 'password is required']
        },
        phone: {
            type: String,
            required: [true, 'phone is required']
        },
        role: {
            type: String,
            enum: ['ADMIN', 'COMUNITY'],
            default: 'COMUNITY'
        },
        profilePicture: {
            type: String,
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


export default model('User', userSchema)