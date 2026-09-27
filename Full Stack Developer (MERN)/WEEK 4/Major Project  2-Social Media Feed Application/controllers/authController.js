import bcrypt from "bcrypt";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { success, failure } from "../utils/apiResponse.js";

export async function register(req, res, next) {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password || password.length < 6) return failure(res, "Full name, username, email and a 6+ character password are required");
    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (exists) return failure(res, "Email or username already exists", 409);
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, username, email, passwordHash });
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 86400000) });
    return success(res, { user: publicUser(user), accessToken, refreshToken }, "Account created", 201);
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrUsername?.toLowerCase() }, { username: emailOrUsername?.toLowerCase() }] });
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) return failure(res, "Invalid credentials", 401);
    if (user.status !== "active") return failure(res, "Account is unavailable", 403);
    user.lastSeen = new Date();
    await user.save();
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 86400000) });
    return success(res, { user: publicUser(user), accessToken, refreshToken }, "Login successful");
  } catch (e) { next(e); }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const record = await RefreshToken.findOne({ token: refreshToken });
    if (!record) return failure(res, "Refresh token is invalid", 401);
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);
    if (!user) return failure(res, "User not found", 401);
    return success(res, { accessToken: createAccessToken(user) }, "Token refreshed");
  } catch (e) { return failure(res, "Refresh token is invalid", 401); }
}

export async function logout(req, res, next) {
  try { await RefreshToken.deleteMany({ user: req.user._id }); return success(res, {}, "Logged out"); } catch (e) { next(e); }
}

function publicUser(user) {
  return { id: user._id, username: user.username, fullName: user.fullName, email: user.email, avatar: user.avatar, bio: user.bio, role: user.role, privacy: user.privacy, followers: user.followers?.length || 0, following: user.following?.length || 0 };
}
