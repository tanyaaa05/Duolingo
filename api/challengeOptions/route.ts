import { NextResponse } from "next/server";

import db from '@/db/drizzle';
import { challengeOptions } from '@/db/schema';
import { isAdmin } from "@/lib/admin";

export const GET = async () => {
  if(!isAdmin){
    return new NextResponse("Unauthorized", {status:401});
  }
  const data = await db.query.challengeOptions.findMany(); // Get course data
  const totalResults = data.length; // Calculate total results

  // Set Content-Range dynamically based on total results
  const contentRange = `bytes 0-${totalResults - 1}/${totalResults}`;

  return NextResponse.json(data, {
    headers: {
      'Content-Range': contentRange,
      // Other headers from your next.config.mjs remain here
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  });
};

export const POST = async (req:Request)=>{

  if(!isAdmin){
    return new NextResponse("Unauthorized", {status:401});
  }

  const body = await req.json();



  const data = await db.insert(challengeOptions).values({
    ...body
  }).returning();

  return NextResponse.json(data[0]);
}
