import express from 'express';

import userSignUpController from "../controller/user/userSignUp.js";
import userSignInController from '../controller/user/userSignIn.js';
import userDetailsController from '../controller/user/userDetails.js';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/user/userLogout.js';
import allUsers from '../controller/user/allUsers.js';
import updateUser from '../controller/user/updateUser.js';
import UploadProductController from '../controller/product/uploadProduct.js';
import getProductController from '../controller/product/getProduct.js';
import updateProductController from '../controller/product/updateProduct.js';
import getCategoryProduct from '../controller/product/getCategoryProductOne.js';
import getCategoryWiseProduct from '../controller/product/getCategoryWiseProduct.js';
import getProductDetails from '../controller/product/getProductDetails.js';
import addToCartController from '../controller/user/addToCartController.js';
import countAddToCartProduct from '../controller/user/countAddToCartProduct.js';
import addToCartViewProduct from '../controller/user/addToCartViewProduct.js';
import updateAddToCartProduct from '../controller/user/updateAddToCartProduct.js';
import deleteAddToCartProduct from '../controller/user/deleteAddToCartProduct.js';
import searchProduct from '../controller/product/searchProduct.js';
import filterProductController from '../controller/product/filterProduct.js';
import paymentController from '../controller/order/paymentController.js';
import { multipleImages, signupimage } from '../middleware/multer.js';
import {validatehandler} from "../utils/features.js";
import sendurl from "../controller/product/getimgurl.js";
const router = express.Router();

router.post("/signup",signupimage,validatehandler, userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/getimg-url",multipleImages,validatehandler,sendurl);
// 
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken,multipleImages,validatehandler, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, multipleImages,validatehandler,updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);


router.post('/checkout',authToken,paymentController)

export default router;
