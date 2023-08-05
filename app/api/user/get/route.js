import prisma from "@/prisma/prismaClient"
import { NextRequest as req, NextResponse as res } from "next/server";
export async function GET(){
    const user = await prisma.users.findMany();
    return res.json({result:user})
}