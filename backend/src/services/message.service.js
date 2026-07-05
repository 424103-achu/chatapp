import prisma from "../config/prisma.js";
import ApiError from "../utils/error.js";
export const sendMessageService = async (
  currentUserId,
  conversationId,
  content,
) => {
  if (!conversationId) {
    throw new ApiError(400, "Conversation ID is required.");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "Message content is required.");
  }
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
  });
  if (!conversation) {
    throw new ApiError(403, "Conversation not found or access denied.");
  }
  return await prisma.$transaction(async (tx) => {
    const message = await tx.message.create({
      data: {
        conversationId,
        senderId: currentUserId,
        content: content.trim(),
        type: "TEXT",
      },
    });
    await tx.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  });
  const createdMessage = await tx.message.findUnique({
    where: {
      id: message.id,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
  });

  return createdMessage;
};
export const getMessageService = async (currentUserId, conversationId) => {
  if (!conversationId) {
    throw new ApiError(400, "Conversation ID is required.");
  }
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
  });
  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messages;
};
