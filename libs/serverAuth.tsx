import { NextApiRequest } from 'next';
// import {authOptions} from "@/app/auth/[...nextauth]"
import prisma from '@/libs/prismadb';

// import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

const serverAuth = async (req: NextApiRequest) => {
  const session=await getSession({req})

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;