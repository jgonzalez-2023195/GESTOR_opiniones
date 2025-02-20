import { Router } from "express"
import {  } from './publication.controller.js'
import {  } from '../../middlewares/validator.js'
import { deleteFileOnError } from '../../middlewares/delete.file.errors.js'
import { validateTokenJWT } from '../../middlewares/validate.token.jwt.js'
import { uploadCateogryPicture } from '../../middlewares/multer.uploads.js'

const api = Router()



export default api