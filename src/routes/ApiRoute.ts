import { Router, Request, Response } from 'express'
const routerApi = Router()

routerApi.get('/', (req: Request, res: Response) => {
  res.send('ok')
})

// * USER ROUTES

routerApi.post('/sign-in', (req: Request, res: Response) => {
  res.send('ok')
})

routerApi.post('/sign-up', (req: Request, res: Response) => {
  res.send('ok')
})

routerApi.post('/logout', (req: Request, res: Response) => {
  res.send('ok')
})

export default routerApi
