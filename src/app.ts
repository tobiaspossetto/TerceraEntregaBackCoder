import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import minimist from 'minimist'
import routerViews from './routes/ViewsRoute'
import routerApi from './routes/ApiRoute'
dotenv.config()
const app = express()

export const args = minimist(process.argv.slice(2))

export const PORT = args._[0] || process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.set('views', './src/public/views')
app.set('view engine', 'pug')

app.use('/', routerViews)
app.use('/api/', routerApi)
export default app
