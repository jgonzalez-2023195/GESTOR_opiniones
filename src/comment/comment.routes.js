import { Router } from "express"
import { commentToPublication, deletedComment, listComment, updatComment } from './comment.controller.js'
import { newComment, updateComment } from '../../middlewares/validator.js'
import { validateTokenJWT } from '../../middlewares/validate.token.jwt.js'

const api = Router()

api.post(
    '/new',
    [
        validateTokenJWT,
        newComment
    ],
    commentToPublication
)

api.get(
    '/list/',
    listComment
)

api.put(
    '/updated/:id',
    [
        validateTokenJWT,
        updateComment
    ],
    updatComment
)

api.delete(
    '/deleted/:id',
    [
        validateTokenJWT
    ],
    deletedComment
)

export default api