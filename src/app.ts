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
import productsRouter from './routes/ProductsRouter'

dotenv.config()
const app = express()

export const args = minimist(process.argv.slice(2))

export const PORT = args._[0] || process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))
app.use(
  session({
    secret: <string>process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000
    }
  })
)
getConnectionMongo()

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.set('views', './src/public/views')
app.set('view engine', 'pug')

app.use('/', routerViews)
app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)
export default app
