import { NextResponse } from "next/server"
export function middleware(req) {
  // console.log("middleware")
  const authorized = true;
  if(authorized){
    return NextResponse.next()
  }
  return NextResponse.json("unauthorized",{status:401})

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}