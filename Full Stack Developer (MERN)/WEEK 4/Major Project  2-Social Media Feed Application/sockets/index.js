import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export function setupSockets(io) {
  io.on("connection", (socket) => {
    socket.on("user:join", (userId) => socket.join(`user:${userId}`));
    socket.on("conversation:join", (id) => socket.join(`conversation:${id}`));
    socket.on("typing", ({ conversationId, user }) => socket.to(`conversation:${conversationId}`).emit("typing", { user }));
    socket.on("message:send", async ({ conversationId, senderId, content }) => {
      try {
        const conversation = await Conversation.findOne({ _id: conversationId, participants: senderId });
        if (!conversation) return;
        const message = await Message.create({ conversation: conversationId, sender: senderId, content });
        await message.populate("sender", "username fullName avatar");
        await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id });
        io.to(`conversation:${conversationId}`).emit("message:new", message);
      } catch (error) { socket.emit("socket:error", { message: error.message }); }
    });
    socket.on("message:read", async ({ messageId, userId }) => { await Message.findByIdAndUpdate(messageId, { $addToSet: { readBy: userId } }); });
  });
}
