// import  { v2 as cloudinary } from 'cloudinary';


// const connectCloudinary = async ()=>{
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_SECRET_KEY,

//     });
// };

// export default connectCloudinary 

import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log("✅ Cloudinary connected");
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
    throw new Error("Cloudinary setup failed");
  }
};

export default connectCloudinary;
