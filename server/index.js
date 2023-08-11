const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const multer = require("multer");
const fs = require("node:fs")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: true }))
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log("file: ",file)
              cb(null, process.cwd()+"/public")
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname+ uniqueSuffix + '-' + file.originalname)
            }
          })
          
          const upload = multer({ storage: storage }).single("file")
          server.post("/api/upload",upload,(req,res)=>{
            console.log("req.file: ",req.file,req.files)
            return res.send("file uploaded")
          })
        server.get('/api/gallery/list', (req, res) => {
            fs.readdir(process.cwd()+"/public",{},(err,files)=>{
                return res.send({gallerylist:files})
            })
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })