import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs"
import { v4 as uuidv4 } from 'uuid';



export async function POST(req) {
    const uniqueId = uuidv4()
    const data = await req.formData()
    const image = await data.get("image");
    const imgExtn = image.type.split("/")[1];
    const file = Buffer.from(await image.arrayBuffer());
    console.log("file: ",data)
    fs.writeFile(`${process.cwd()}/public/${uniqueId}.${imgExtn}`,file,(err)=>{
        
    })
    return NextResponse.json("file uploaded")
}