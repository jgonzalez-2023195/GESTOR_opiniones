import { Router } from "express"
import { deleteCat, listCat, newCat, updateCat } from './category.controller.js'
import { registerCategory, updateCategory } from '../../middlewares/validator.js'
import { deleteFileOnError } from '../../middlewares/delete.file.errors.js'
import { isAdmin, validateTokenJWT } from '../../middlewares/validate.token.jwt.js'
import { uploadCateogryPicture } from '../../middlewares/multer.uploads.js'

const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        isAdmin,
        uploadCateogryPicture.single('categoryPicture'),
        registerCategory,
        deleteFileOnError
    ],
    newCat
)

api.get(
    '/list',
    [
        validateTokenJWT
    ],
    listCat
)

api.put(
    '/update/:id',
    [
        validateTokenJWT,
        isAdmin,
        uploadCateogryPicture.single('categoryPicture'),
        updateCategory,
        deleteFileOnError
    ],
    updateCat
)

api.delete(
    '/deleted/:id',
    [
        validateTokenJWT,
        isAdmin,
        deleteFileOnError
    ],
    deleteCat
)

export default api