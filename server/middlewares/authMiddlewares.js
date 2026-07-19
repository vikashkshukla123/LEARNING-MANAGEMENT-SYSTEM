// // import { clerkClient } from "@clerk/express";

// // export const protectEducator = async (req, res, next) => {
// //   try {
// //     const userId = req.auth.userId;
// //     const response = await clerkClient.users.getUser(userId);

// //     if (response.publicMetadata.role !== "educator") {
// //       return res.json({ success: false, message: "Unauthorized Access" });
// //     }

// //     next();
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// import { clerkClient } from "@clerk/express";

// export const protectEducator = async (req, res, next) => {
//   try {
//     const userId = req.auth?.userId;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const response = await clerkClient.users.getUser(userId);

//     if (response.publicMetadata.role !== "educator") {
//       return res.status(403).json({ success: false, message: "Forbidden: Educator role required" });
//     }

//     // Attach user info to request for controllers
//     req.user = { id: userId };

//     next();
//   } catch (error) {
//     console.error("protectEducator error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// import { clerkClient } from "@clerk/express";

// export const protectEducator = async (req, res, next) => {
//   try {
//     const userId = req.auth?.userId;
//     if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

//     const user = await clerkClient.users.getUser(userId);
//     if (user.publicMetadata.role !== "educator") {
//       return res.status(403).json({ success: false, message: "Unauthorized Access" });
//     }

//     next();
//   } catch (error) {
//     console.error("protectEducator error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// import { clerkClient } from "@clerk/express";

// export const protectEducator = async (req, res, next) => {
//   try {
//     // ✔ Correct way to get userId with new Clerk SDK
//     const userId = req.auth?.userId || req.auth()?.userId || req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const user = await clerkClient.users.getUser(userId);

//     if (user.publicMetadata?.role !== "educator") {
//       return res.status(403).json({ success: false, message: "Unauthorized Access" });
//     }

//     req.user = { id: userId }; // ✔ Needed so controllers can read req.user.id
//     next();
//   } catch (error) {
//     console.error("protectEducator error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import { clerkClient } from "@clerk/express";

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
    const { userId } = await req.auth();

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