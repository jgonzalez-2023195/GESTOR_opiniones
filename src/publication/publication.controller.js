import Publication from './publication.model.js'
import User from '../user/user.model.js'

export const addPublication = async(req, res)=> {
    try {
        let data = req.body
        let user = await User.findOne(
            {
                _id: data.userPublication
            }
        )
        if(!user) return res.status(403).send({message: 'user not found'})
        data.userPublication = req.user.uid
        let publication = new Publication(data)
        publication.mediaPicture = req.file.filename??null
        await publication.save()
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add category for system',
                e
            }
        )
    }
}