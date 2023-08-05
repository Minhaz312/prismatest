import { NextResponse } from "next/server";
import prisma from "./../../../../prisma/prismaClient"
import has from "@/app/helpers/has";
export async function POST(req){
    try {
        const data = await req.json();
        // const crntUser = await prisma.users.aggregate({_count:{id:true}})
        // if(crntUser._count.id>0){
        //     let updatedData = {}
        //     if(has(data,"name")){
        //         updatedData.name = data.name;
        //     }
        //     if(has(data,"email")){
        //         updatedData.email = data.email;
        //     }
        //     if(has(data,"password")){
        //         updatedData.password = data.password;
        //     }
        //     if(has(data,"mobile")){
        //         updatedData.mobile = data.mobile;
        //     }
        //     if(has(data,"about")){
        //         updatedData.about = data.about;
        //     }
        //     if(has(data,"slogan")){
        //         updatedData.slogan = data.slogan;
        //     }
        //     if(has(data,"resume")){
        //         updatedData.resume = data.resume;
        //     }
        //     // perform update operation
        // }else{
        //     if(has(data,"name")===true && has(data,"email")===true && has(data,"password") && has(data,"about")===true && has(data,"slogan")===true && has(data,"mobile")===true && has(data,"resume")===true){
        //         // perform insert operation

        //     }else{
        //         // return invalid request
        //     }
        // }
        const result = await prisma.users.create({data:data});
        return NextResponse.json({result:result})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error.message)
    }
}