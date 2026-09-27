import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { success, failure } from "../utils/apiResponse.js";

export async function conversations(req, res, next) {
  try { const items = await Conversation.find({ participants: req.user._id }).sort({ updatedAt: -1 }).populate("participants", "username fullName avatar lastSeen"); return success(res, items); } catch (e) { next(e); }
}

export async function createConversation(req, res, next) {
  try {
    const participantIds = [...new Set([req.user._id.toString(), ...(req.body.participants || [])])];
    const users = await User.find({ _id: { $in: participantIds } });
    if (users.length !== participantIds.length) return failure(res, "One or more users do not exist");
    let conversation = await Conversation.findOne({ isGroup: false, participants: { $all: participantIds }, $expr: { $eq: [{ $size: "$participants" }, participantIds.length] } });
    if (!conversation) conversation = await Conversation.create({ participants: participantIds, isGroup: participantIds.length > 2, name: req.body.name });
    await conversation.populate("participants", "username fullName avatar lastSeen");
    return success(res, conversation, "Conversation ready", 201);
  } catch (e) { next(e); }
}

export async function messages(req, res, next) {
  try { const conversation = await Conversation.findOne({ _id: req.params.id, participants: req.user._id }); if (!conversation) return failure(res, "Conversation not found", 404); const items = await Message.find({ conversation: conversation._id }).sort({ createdAt: 1 }).limit(200).populate("sender", "username fullName avatar"); return success(res, items); } catch (e) { next(e); }
}
