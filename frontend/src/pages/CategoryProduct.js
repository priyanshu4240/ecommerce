import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory(prev => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map(categoryKeyName => selectCategory[categoryKeyName] ? categoryKeyName : null)
            .filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map(el => `category=${el}`).join("&&");
        navigate("/product-category?" + urlFormat);
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        setData(prev => {
            const sortedData = [...prev];
            sortedData.sort((a, b) => value === 'asc' ? a.sellingPrice - b.sellingPrice : b.sellingPrice - a.sellingPrice);
            return sortedData;
        });
    };

    return (
        <div className='container mx-auto p-4'>
            {/* Mobile View */}
            <div className='lg:hidden bg-white p-2 rounded-md shadow-md mb-4'>
                <h3 className='text-lg font-medium text-slate-700'>Filters</h3>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {productCategory.map((category, index) => (
                        <label key={index} className='flex items-center gap-2 text-sm bg-gray-200 p-1 rounded-md'>
                            <input type='checkbox' checked={selectCategory[category?.value]} value={category?.value} onChange={handleSelectCategory} />
                            {category.label}
                        </label>
                    ))}
                </div>
            </div>
            
            {/* Desktop View */}
            <div className='grid lg:grid-cols-[250px,1fr] gap-4'>
                {/* Sidebar */}
                <div className='hidden lg:block bg-white p-2 rounded-md shadow-md'>
                    {/* Sort By */}
                    <div className='mb-4'>
                        <h3 className='text-base font-medium text-slate-600 border-b pb-2'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <label className='flex items-center gap-2'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" />
                                Price - Low to High
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" />
                                Price - High to Low
                            </label>
                        </form>
                    </div>

                    {/* Filter By Category */}
                    <div>
                        <h3 className='text-base font-medium text-slate-600 border-b pb-2'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((category, index) => (
                                <label key={index} className='flex items-center gap-2'>
                                    <input type='checkbox' name="category" checked={selectCategory[category?.value]} value={category?.value} onChange={handleSelectCategory} />
                                    {category.label}
                                </label>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <p className='font-medium text-slate-800 text-lg mb-2'>Search Results: {data.length}</p>
                    <div className='min-h-[calc(100vh-150px)] overflow-y-auto'>
                        {data.length !== 0 && !loading ? <VerticalCard data={data} loading={loading} /> : <p className='text-center text-gray-500'>No products found</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;