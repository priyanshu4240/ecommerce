import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName || '',
        brandName: productData?.brandName || '',
        category: productData?.category || '',
        productImage: productData?.productImage || [],
        description: productData?.description || '',
        Price: productData?.Price || '',
        sellingPrice: productData?.sellingPrice || ''
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('productImage', file);

            try {
                const response = await fetch(SummaryApi.uploadImage.url, {
                    method: SummaryApi.uploadImage.method,
                    credentials: 'include',
                    body: formData
                });

                const responseData = await response.json();

                if (responseData.success) {
                    const newImageUrls = responseData.imageUrl; // Array of new image URLs

                    // Ensure newImageUrls is an array
                    if (Array.isArray(newImageUrls)) {
                        setData((prev) => ({
                            ...prev,
                            productImage: [
                                ...prev.productImage, // Existing image URLs
                                ...newImageUrls // New image URLs
                            ]
                        }));
                    } else {
                        toast.error('Invalid image URL format.');
                    }
                } else {
                    toast.error(responseData.message);
                }
            } catch (error) {
                toast.error('An error occurred while uploading the image.');
                console.error('Error:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = data.productImage.filter((_, i) => i !== index);
        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('brandName', data.brandName);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('Price', data.Price);
        formData.append('sellingPrice', data.sellingPrice);

        data.productImage.forEach((imageUrl, index) => {
            formData.append(`productImage[${index}]`, imageUrl);
        });

        try {
            const response = await fetch(SummaryApi.updateProduct.url, {
                method: SummaryApi.updateProduct.method,
                credentials: 'include',
                body: formData
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchdata();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error('An error occurred while updating the product.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select
                        required
                        value={data.category}
                        name='category'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type='file'
                                    id='uploadImageInput'
                                    className='hidden'
                                    onChange={handleUploadProduct}
                                    disabled={uploading}
                                />
                            </div>
                        </div>
                    </label>

                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((url, index) => (
                                    <div className='relative group' key={index}>
                                        <img
                                            src={url} // Use URL directly here
                                            alt={`Product ${index}`}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(url); // Use URL for full screen display
                                            }}
                                        />
                                        <div
                                            className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor='Price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='Price'
                        placeholder='enter Price'
                        name='Price'
                        value={data.Price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='enter selling Price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='enter product description'
                        rows={3}
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                    ></textarea>

                    <button
                        type='submit'
                        className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'
                        disabled={uploading}
                    >
                        Update Product
                    </button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage
                    imgUrl={fullScreenImage}
                    onClose={() => setOpenFullScreenImage(false)}
                />
            )}
        </div>
    );
};

export default AdminEditProduct;
