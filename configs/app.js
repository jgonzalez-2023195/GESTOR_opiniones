'user strict'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from 'rutas'

const configs =(app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.user(cors())
    app.user(helmet())
    
}