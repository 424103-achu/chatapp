import prisma from "../config/prisma.js";
export const createConvoService = async (currentUserId, participantId) => {
  if (!participantId) {
    throw new ApiError(400, "Participant ID is required.");
  }

  if (participantId === currentUserId) {
    throw new ApiError(400, "You cannot create a conversation with yourself.");
  }
  const participant = await prisma.user.findUnique({
    where: {
      id: participantId,
    },
    select: {
      id: true,
    },
  });

  if (!participant) {
    throw new ApiError(404, "User not found.");
  }

  const privateKey = [currentUserId, participantId].sort().join("_");

  const existingConversation = await prisma.conversation.findUnique({
    where: {
      privateKey,
    },
  });

  if (existingConversation) {
    return existingConversation;
  }

  return await prisma.$transaction(async (tx) => {
    const conversation = await tx.conversation.create({
      data: {
        isGroup: false,
        privateKey,
      },
    });

    await tx.conversationParticipant.createMany({
      data: [
        {
          conversationId: conversation.id,
          userId: currentUserId,
        },
        {
          conversationId: conversation.id,
          userId: participantId,
        },
      ],
    });

    return conversation;
  });
};
export const getConvoService = async (currentUserId) => {
  return prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              profilePic: true,
              isOnline: true,
              lastSeen: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};
