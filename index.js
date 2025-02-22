import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { initializeAdminUser, initializeCategory } from './configs/init.default.js'

config()
connect()
initializeAdminUser()
initializeCategory()
initServer()