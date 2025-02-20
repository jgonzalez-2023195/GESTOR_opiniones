import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { initializeAdminUser } from './configs/init.user.admin.js'

config()
connect()
initializeAdminUser()
initServer()