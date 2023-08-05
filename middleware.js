import { NextResponse } from "next/server"
export function middleware(req) {
  console.log("middleware")
  const authorized = false;
  if(authorized){
    return NextResponse.json("authorized")
  }
  return NextResponse.status(401).json("unauthorized")

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/upload/',
}