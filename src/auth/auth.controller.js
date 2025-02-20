import User from '../user/user.model.js'

import { encrypt, checkPassword } from '../../utils/encrypt.validatons.js'
import { generateTokenJWT } from '../../utils/jwt.js'

export const register = async(req, res)=> {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.profilePicture = req.file.filename ?? null
        await user.save()
        return res.status(200).send(
            {
                success: true,
                message: `Registration succesfully, can be login to system with username: ${user.username} or email ${user.email}`
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when register to system',
                e
            }
        )
    }
}

export const login = async(req, res)=> {
    try {
        let { userLogin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    { email: userLogin },
                    { username: userLogin }
                ]
            }
        )
        console.log(user)
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                surname: user.surname,
                role: user.role
            }
            let token = await generateTokenJWT(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name} to system`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(404).send({message: 'Invalid Credentials'})
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Server error', 
                e
            }
        )
    }
}