import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.validatons.js'

export const updatUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const { oldPassword, newPassword, ...data } = req.body

        if (id !== req.user.uid) return res.status(403).send(
            {
                    success: false,
                    message: 'Unauthorized to update this profile'
                }
            )

        const user = await User.findById(id)
        if (!user) return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )

        if(oldPassword && newPassword){
            const isPasswordValid = await checkPassword(user.password, oldPassword);
            if (!isPasswordValid) return res.status(400).send(
                {
                    success: false,
                    message: 'Old password incorrect'
                }
            )
            
            user.password = await encrypt(newPassword)
        }

        if(req.file?.filename){
            data.profilePicture = req.file.filename
        }

        const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})

        return res.status(200).send(
            {
                success: true,
                message: 'User updated successfully',
                updatedUser
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'Error updating user',
                e
            }
        )
    }
}