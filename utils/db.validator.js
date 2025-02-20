import User from '../src/user/user.model.js'
import parsePhoneNumber from 'libphonenumber-js'
import mongoose, { isValidObjectId } from 'mongoose'

export const existEmail = async(email, user)=> {
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`);
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existUserName = async(username, user)=> {
    const alreadyUserName = await User.findOne({username})
    if(alreadyUserName && alreadyUserName._id != user.uid){
        console.error(`Email ${email} is already taken`);
        throw new Error(`Email ${email} is already taken`)
    }
}

export const objectIdValid = async(objectId)=> {
    if(!isValidObjectId(objectId)) throw new Error('Is not valid ObjectId')
}

export const formatPhoneNumber = (number) => {
    const phoneNumber = parsePhoneNumber(number, "GT")
    if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error("Invalid Guatemalan phone number.")
    }
    return phoneNumber.formatInternational()
}

export const comonPasswords = async(password)=> {
    const comonPasswords = ['Password1234', 'Test1234', 'Prueba1234', 'Hola1234', 'Client1234', 'Admin1234', '12345678', 'asdfghjk', 'testtest']
    if(comonPasswords.includes(password)){
        throw new Error('Password is too common')
    }
    return true
}