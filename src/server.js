// const express = require('express')
import express from 'express'
const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', function (req, res) {
  res.send('<h1>Hello World Nodejs Nhatquangdev</h1>')
})
app.listen(port, hostname, () => {
  console.log(
    `Hello nhatquangdev, I'am running sever at http://${hostname}:${port}/`
  )
})
