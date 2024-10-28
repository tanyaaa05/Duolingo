import { auth } from "@clerk/nextjs/server"

const adminIds=[
  "user_2o44RP08tANJObrTm2rlCic2OYp",
  "user_2nFdjRxEUa3hx3N0bWXxB8dVUeG",
];

export const isAdmin = ()=>{
  const { userId } = auth();

  if(!userId) return false;

  return adminIds.indexOf(userId) !== -1;

}
