import { Router } from "express"
import { validateTokenJWT } from '../../middlewares/validate.token.jwt.js'
import { updateUser } from '../../middlewares/validator.js'
import { updatUser } from "./user.controller.js"
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { deleteFileOnError } from '../../middlewares/delete.file.errors.js'

const api = Router()

api.put(
    '/update/profile/:id',
    [
        validateTokenJWT,
        uploadProfilePicture.single("profilePicture"),
        updateUser,
        deleteFileOnError
    ],
    updatUser
)

export default api