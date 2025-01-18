/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `3. Hello ${env.AUTHOR}, Backend Server is running successfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`
    )
  })
  //Thực hiện các cleanup trước khi dừng server
  exitHook(() => {
    console.log('4.Server is shutting down...')
    CLOSE_DB()
    console.log('5.Disconnecting from MongoDB Cloud Atlas')
  })
}

//Chỉ khi connet thành công thì mới start server
//Immediately Invoked Function Expression (IIFE)
;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')

    //Khởi động server Backend-End sau khi Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
//Chỉ khi connet thành công thì mới start server
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
