import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs"
import headers from "next/headers"
import { createEdgeRouter,expressWrapper } from "next-connect";
import multer from "multer";
import formidable from "formidable";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("file: ",file)
      cb(null, process.cwd()+"/public")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")


export const bodyParser = false

const router = createEdgeRouter();
router.use(expressWrapper((req,res,next)=>{
    console.log("express wrapper")
    next()
}))
router.use((req,res,next)=>{

    const form = formidable({uploadDir:process.cwd()+"/public/"})
    form.parse({...req,...headers},(err,fields,files)=>{
        console.log("fields: ",fields)
        console.log("files: ",files)
    })

    const dirr = fs.readdirSync(process.cwd()+"/public")
    console.log("dirr: ",dirr)
    console.log("cs middleware")
    return next()
})


router.post((req,res)=>{
    return NextResponse.json("asdf asdf")
})

export async function POST(req,ctx) {
    return router.run(req,ctx)
}
