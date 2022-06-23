import { Router, Request, Response } from 'express'
const routerApi = Router()

routerApi.get('/', (req: Request, res: Response) => {
  res.send('ok')
})
export default routerApi
