import { NextRequest as req, NextResponse as res } from "next/server";
export async function GET(){
    return res.json("get project route")
}