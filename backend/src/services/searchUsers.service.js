import prisma from "../config/prisma.js";
export const searchUsersService = async (search, currentUserId) => {
     if (!search?.trim()) {
    return [];
  }
  const users = await prisma.user.findMany({
  where: {
    username: {
      contains: search,
      mode: "insensitive",
    },
    id: {
      not: currentUserId,
    },
  },
  select: {
    id: true,
    username: true,
    email: true,
    profilePic: true,
    isOnline: true,
  },
});

return users;
};