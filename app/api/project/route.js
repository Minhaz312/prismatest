
import prisma from "@/prisma/prismaClient"
import { NextRequest as req, NextResponse as res } from "next/server";
export async function GET(){
    console.log("users: ")
    
    const users = await prisma.user.findMany();
    return res.json(users)
}