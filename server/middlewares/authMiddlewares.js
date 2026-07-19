

import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";
export const protectEducator = async (req, res, next) => {
  console.log("===== REQUESTs =====");
console.log("Authorization:", req.headers.authorization);
console.log("req.auth:", req.auth);
console.log("req.user:", req.user);
  try {
    console.log("===== protectEducator =====");
    console.log("Authorization:", req.headers.authorization);
    console.log("req.auth:", req.auth);
    console.log("req.user:", req.user);
    console.log(await req.auth());
    const { userId } = getAuth(req);
if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    req.user = { id: userId };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};