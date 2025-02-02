import multer from "multer";

const multerUpload = multer({
limits:{
    fileSize:1024*1024*10,
},
});

const signupimage= multerUpload.single("profilePic");
 
const multipleImages = multerUpload.array("productImage", 5);
export {signupimage,multipleImages};