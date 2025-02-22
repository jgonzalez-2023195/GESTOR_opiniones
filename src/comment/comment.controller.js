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

export const listComment = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        let comment = await Comment.find().limit(limit).skip(skip).populate(
            [
                {
                    path: 'user',
                    select: 'name surname username -_id'
                },
                {
                    path: 'publication',
                    select: 'title text mediaPicture -_id'
                },
                {
                    path: 'parentComment',
                    select: 'text -_id'
                },
                {
                    path: 'mentions',
                    select: 'name surname username -_id'
                }
            ]
        )

        const formattedComment = comment.map(comment => {
            const fechaCreated = new Date(comment.createdAt)
            const fechaUpdated = new Date(comment.updatedAt)
            const formattedData = comment.toObject()
            formattedData.createdAt = fechaCreated.toLocaleString()
            formattedData.updatedAt = fechaUpdated.toLocaleString()
            return formattedData
        })

        if(comment.length===0) return res.status(404).send(
            {
                success: false,
                message: 'No comments'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Comments found: ',
                formattedComment
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see categories in the system',
                e
            }
        )
    }
}

export const updatComment = async(req, res)=> {
    const data = req.body
    try {
        let id = req.params.id
        let comment = await Comment.findById(id)
        if(comment.user.toString()!==req.user.uid)return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized updated comment'
            }
        )
        let updateComment = await Comment.findByIdAndUpdate(id, data, {new: true})
        if(!updateComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, comment not update'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Comment found, comment updated',
                updateComment
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated comment',
                e
            }
        )
    }
}

export const deletedComment = async(req, res)=> {
    try {
        let id = req.params.id
        let comment = await Comment.findById(id)
        if(comment.user.toString()!==req.user.uid)return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized updated comment'
            }
        )
        let deleteComment = await Comment.findByIdAndDelete(id)
        if(!deleteComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, comment not deleted'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Comment found, comment deleted to system',
                deleteComment
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted comment',
                e
            }
        )
    }
}