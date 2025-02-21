import { Router } from "express"
import { addPublication, deletePublication, listPublications, myPublications, updatePublication } from './publication.controller.js'
import { newPublication, updatPublication } from '../../middlewares/validator.js'
import { deleteFileOnError } from '../../middlewares/delete.file.errors.js'
import { validateTokenJWT } from '../../middlewares/validate.token.jwt.js'
import { uploadPublicationMedia } from '../../middlewares/multer.uploads.js'

const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        uploadPublicationMedia.single('mediaPicture'),
        newPublication,
        deleteFileOnError
    ],
    addPublication
)

api.get(
    '/list',
    listPublications
)

api.get(
    '/list/myPubolications',
    [
        validateTokenJWT
    ],
    myPublications
)

api.put(
    '/update/:id',
    [
        validateTokenJWT,
        uploadPublicationMedia.single('mediaPicture'),
        updatPublication,
        deleteFileOnError
    ],
    updatePublication
)

api.delete(
    '/deleted/:id',
    [
        validateTokenJWT,
    ],
    deletePublication
)

export default api 