-- CreateIndex
CREATE INDEX "conversation_participants_userId_idx" ON "conversation_participants"("userId");

-- CreateIndex
CREATE INDEX "conversation_participants_conversationId_idx" ON "conversation_participants"("conversationId");
