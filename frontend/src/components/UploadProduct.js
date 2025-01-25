import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    Price: "",
    sellingPrice: ""
  });
  
  const [files, setFiles] = useState([]);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Handle text inputs
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload and image preview
  const handleUploadProduct = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);  // Create a local URL for image preview
      setFiles(prevFiles => [...prevFiles, file]);  // Add the file to state
      setData(prev => ({
        ...prev,
        productImage: [...prev.productImage, imageUrl]  // Store the local URL for preview
      }));
    }
  };

  // Handle deleting an image
  const handleDeleteProductImage = (index) => {    
    const newProductImage = [...data.productImage];
    const newFiles = [...files];
    
    newProductImage.splice(index, 1);
    newFiles.splice(index, 1);

    setData(prev => ({
      ...prev,
      productImage: newProductImage
    }));
    setFiles(newFiles);
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('brandName', data.brandName);
    formData.append('category', data.category);
    formData.append('Price', data.Price);
    formData.append('sellingPrice', data.sellingPrice);
    formData.append('description', data.description);
    
    // Append files to FormData
    files.forEach(file => {
      formData.append('productImage', file);  // `productImage` matches backend field
    });

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      body: formData
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name:</label>
          <input
            type='text'
            id='productName'
            placeholder='Enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            value={data.brandName}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category:</label>
          <select
            required
            value={data.category}
            name='category'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image:</label>
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
                />
              </div>
            </div>
          </label>

          {/* Image Preview Section */}
          <div>
            {data.productImage.length > 0 ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={el}
                      alt={`Product ${index}`}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
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

          <label htmlFor='Price' className='mt-3'>Price:</label>
          <input
            type='number'
            id='Price'
            placeholder='Enter Price'
            value={data.Price}
            name='Price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price:</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter selling Price'
            value={data.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description:</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='Enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={data.description}
          ></textarea>

          <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
        </form>

      </div>

      {/* Display full-screen image */}
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
