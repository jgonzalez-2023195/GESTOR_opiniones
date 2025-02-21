import Publication from './publication.model.js'
import User from '../user/user.model.js'

export const addPublication = async(req, res)=> {
    try {
        let data = req.body
        let user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        if(!user) return res.status(403).send({message: 'user not found'})

        data.userPublication = req.user.uid
        let publication = new Publication(data)
        publication.mediaPicture = req.file.filename??null
        await publication.save()
        return res.status(200).send({message: 'Publication post :)'})
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


export const listPublications = async(req, res)=> {
    const {limit, skip} = req.query
    try {
        let publications = await Publication.find().limit(limit).skip(skip).populate(
            [
                {
                    path: 'userPublication',
                    select: 'name surname username -_id'
                },
                {
                    path: 'category',
                    select: 'name -_id'
                },
                {
                    path: 'mentions',
                    select: 'name surname username -_id'
                }
            ]
        )

        const formattedPublications = publications.map(publication => {
            const fecha = new Date(publication.createdAt)
            const formattedData = publication.toObject() // Convertir a objeto plano
            formattedData.createdAt = fecha.toLocaleString() // Reemplazar createdAt
            return formattedData // No incluir createdAtFormatted
        })

        if(publications.length===0) return res.status(404).send(
            {
                success: false,
                message: 'Not publications for system'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Publications: ',
                formattedPublications
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see publications in the system',
                e
            }
        )
    }
}

export const myPublications = async(req, res)=> {
    const {limit, skip} = req.query
    try {

        let user = await User.findOne(
            {
                _id: req.user.uid
            }
        )

        let publications = await Publication.find({ userPublication: req.user.uid }).limit(limit).skip(skip).populate(
            [
                {
                    path: 'userPublication',
                    select: 'name surname username -_id'
                },
                {
                    path: 'category',
                    select: 'name -_id'
                }
            ]
        )

        const formattedPublications = publications.map(publication => {
            const fecha = new Date(publication.createdAt)
            const formattedData = publication.toObject() // Convertir a objeto plano
            formattedData.createdAt = fecha.toLocaleString() // Reemplazar createdAt
            return formattedData // No incluir createdAtFormatted
        })

        if(publications.length===0) return res.status(404).send(
            {
                success: false,
                message: 'Not publications for system'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Publications: ',
                formattedPublications
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see publications in the system',
                e
            }
        )
    }
}

export const updatePublication = async(req, res)=> {
    const data = req.body
    try {
        let id = req.params.id
        const { filename } = req.file
        let publication = await Publication.findById(id)
        if(publication.userPublication.toString()!== req.user.uid)return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized update publication'
            }
        )
        if(filename){
            data.mediaPicture = filename
        }
        const updatePublication = await Publication.findByIdAndUpdate(id, data, {new: true})
        if(!updatePublication) return res.status(404).send(
            {
                message: 'Publication not updated'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Updated publication',
                updatePublication 
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated publications',
                e
            }
        )
    }
}

/* export const reaction = async(req, res)=> {
    const data = req.body
    try {
        let id = req.params.id
        const { filename } = req.file
        let publication = await Publication.findById(id)
        if(publication.userPublication.toString()!== req.user.uid)return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized update publication'
            }
        )
        if(filename){
            data.mediaPicture = filename
        }
        const updatePublication = await Publication.findByIdAndUpdate(id, data, {new: true})
        if(!updatePublication) return res.status(404).send(
            {
                message: 'Publication not updated'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Updated publication',
                updatePublication 
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when reaction publications',
                e
            }
        )
    }
} */

export const deletePublication = async(req, res)=> {
    try {
        let id = req.params.id
        let publication = await Publication.findById(id)
        if(publication.userPublication.toString()!== req.user.uid)return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized update publication'
            }
        )
        let deletePublication = await Publication.findByIdAndDelete(id)
        if(!deletePublication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found, publication not delete',
                deletePublication
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Publication deleted on system'
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted publications',
                e
            }
        )
    }
}