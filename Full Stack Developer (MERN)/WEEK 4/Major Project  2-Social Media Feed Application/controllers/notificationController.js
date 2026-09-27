import Notification from "../models/Notification.js";
import { success } from "../utils/apiResponse.js";
export async function list(req, res, next) { try { const items = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(50).populate("sender", "username fullName avatar"); return success(res, items); } catch (e) { next(e); } }
export async function read(req, res, next) { try { await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { read: true }); return success(res, {}, "Notification marked read"); } catch (e) { next(e); } }
export async function readAll(req, res, next) { try { await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true }); return success(res, {}, "Notifications marked read"); } catch (e) { next(e); } }
