import Comment from './comment.model.js'
import User from '../user/user.model.js'

export const commentToPublication = async(req, res)=> {
    try {
        let data = req.body
        let user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        if(!user) return res.status(403).send({message: 'User not found'})
        
        data.user = req.user.uid
        let comment = new Comment(data)
        await comment.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Add comment to publication',
                comment
            }
        )
    } catch (e) {
        console.error(e);
        //updateMany
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add comment for system'
            }
        )
    }
}