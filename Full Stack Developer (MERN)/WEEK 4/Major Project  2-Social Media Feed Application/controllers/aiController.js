import AIConversation from "../models/AIConversation.js";
import AIMessage from "../models/AIMessage.js";
import { chat, promptTask, imageAnalysis } from "../services/aiService.js";
import { success } from "../utils/apiResponse.js";

export async function chatAI(req, res, next) {
  try {
    const text = String(req.body.message || "").trim();
    if (!text) return res.status(400).json({ success: false, message: "Message is required" });
    let conversation = req.body.conversationId ? await AIConversation.findOne({ _id: req.body.conversationId, user: req.user._id }) : null;
    if (!conversation) conversation = await AIConversation.create({ user: req.user._id, title: text.slice(0, 60) });
    await AIMessage.create({ conversation: conversation._id, role: "user", content: text });
    const history = await AIMessage.find({ conversation: conversation._id }).sort({ createdAt: 1 }).limit(20);
    const answer = await chat(history.map((m) => ({ role: m.role, content: m.content })));
    const saved = await AIMessage.create({ conversation: conversation._id, role: "assistant", content: answer });
    return success(res, { conversationId: conversation._id, message: saved });
  } catch (e) { next(e); }
}

export async function task(req, res, next) { try { const result = await promptTask(req.body.task || "Help with this post", req.body.input || ""); return success(res, { result }); } catch (e) { next(e); } }
export async function analyzeImage(req, res, next) { try { const result = await imageAnalysis(req.body); return success(res, { result }); } catch (e) { next(e); } }
export async function history(req, res, next) { try { const conversations = await AIConversation.find({ user: req.user._id }).sort({ updatedAt: -1 }); return success(res, conversations); } catch (e) { next(e); } }
