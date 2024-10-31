import { auth } from "@clerk/nextjs/server"

const adminIds=[
  "user_2n7FKXQApqyE1p6w5xPgkopOVfz",
  "user_2o4M7BIl2CtJMjLLFMXuGlcCXnJ",
];

export const isAdmin = ()=>{
  const { userId } = auth();

  if(!userId) return false;

  return adminIds.indexOf(userId) !== -1;

}
