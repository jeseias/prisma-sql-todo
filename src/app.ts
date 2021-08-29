import "express-async-errors"

import express, { NextFunction, Request, Response } from 'express'
import router from './routes';

const app = express()

app.use(express.json())
app.use('/api/v1', router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

  if (process.env.NODE_ENV === 'dev') {
    console.log(error)
  }

  return response.status(401).json({
    message: error.message
  })
})

export default app;