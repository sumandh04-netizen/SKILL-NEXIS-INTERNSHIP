import test from "node:test";
import assert from "node:assert/strict";
import { createAccessToken } from "../utils/tokens.js";
test("access token helper returns a JWT-like string", () => {
  const token = createAccessToken({ _id: "507f1f77bcf86cd799439011", role: "user" });
  assert.equal(typeof token, "string");
  assert.equal(token.split(".").length, 3);
});
