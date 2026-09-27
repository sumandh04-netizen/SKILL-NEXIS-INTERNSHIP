export function success(res, data = {}, message = "Operation successful", status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function failure(res, message = "Something went wrong", status = 400) {
  return res.status(status).json({ success: false, message });
}
