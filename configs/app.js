'user strict'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from '../src/auth/auth.routes.js'
import catRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
import settings from '../src/user/user.routes.js'

const configs =(app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use('/v1/gestoropiniones', authRoutes)
    app.use('/v1/gestoropiniones/settings', settings)
    app.use('/v1/gestoropiniones/category', catRoutes)
    app.use('/v1/gestoropiniones/publication', publicationRoutes)
    app.use('/v1/gestoropiniones/comment', commentRoutes)
}

export const initServer = ()=> {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port: ${process.env.PORT}`);
    } catch (e) {
        console.error('Server init failed: ', e);
    }
} 