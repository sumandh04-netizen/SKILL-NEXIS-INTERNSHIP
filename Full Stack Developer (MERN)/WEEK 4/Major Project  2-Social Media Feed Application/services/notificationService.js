import Notification from "../models/Notification.js";
export async function createNotification({ recipient, sender, type, message, entityId, io }) {
  if (!recipient || recipient.toString() === sender?.toString()) return null;
  const notification = await Notification.create({ recipient, sender, type, message, entityId });
  const populated = await notification.populate("sender", "username fullName avatar");
  if (io) io.to(`user:${recipient}`).emit("notification:new", populated);
  return populated;
}
