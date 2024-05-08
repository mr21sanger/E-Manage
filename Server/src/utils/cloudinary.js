import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const uploadFile = async (filePath) => {
  try {
    if (!filePath) return null
    const response = await cloudinary.uploader.upload(filePath,
      {
        resource_type: "image"
      })
    console.log(response)
    return response

  } catch (error) {
    fs.unlinkSync(filePath)
    return null
  }
}

export {uploadFile}