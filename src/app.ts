import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import minimist from 'minimist'
import routerViews from './routes/ViewsRoute'
import passport from 'passport'
import userRouter from './routes/UserRouter'
import { getConnectionMongo } from './db/mongoConnection'
import './middlewares/passportMiddleware'
import morgan from 'morgan'
dotenv.config()
const app = express()

export const args = minimist(process.argv.slice(2))

export const PORT = args._[0] || process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))
app.use(session({
  // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
  //  store: MongoStore.create({ mongoUrl: `mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, ttl: 60 }),
  secret: <string>process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
getConnectionMongo()
app.set('views', './src/public/views')
app.set('view engine', 'pug')

app.use('/', routerViews)
app.use('/api/user', userRouter)
export default app
