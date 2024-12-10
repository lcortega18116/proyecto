import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function UpdateShoe({ categories, shoe }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: shoe.name || '',
        description: shoe.description || '',
        price: shoe.price || '',
        stock: shoe.stock || '',
        category_id: shoe.category_id || '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        // Create image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('category_id', data.category_id);
        
        if (data.image) {
            formData.append('image', data.image);
        }

        // Use PUT method to update existing shoe
        put(route('Shoes.update',shoe.id ), {
            data: formData,
            forceFormData: true,
            onFinish: () => reset('name', 'description', 'price', 'stock', 'category_id', 'image'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Shoe: {shoe.name}
                </h2>
            }
        >
            <Head title={`Update Shoe - ${shoe.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Shoe Name" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description" value="Description" />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            rows="4"
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="price" value="Price" />
                                            <TextInput
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={data.price}
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('price', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="stock" value="Stock Quantity" />
                                            <TextInput
                                                type="number"
                                                id="stock"
                                                name="stock"
                                                value={data.stock}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('stock', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.stock} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="category_id" value="Category" />
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            value={data.category_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Shoe Image" />
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            { previewImage || shoe.image  ? (
                                                <img 
                                                    src={previewImage || shoe.image} 
                                                    alt="Preview" 
                                                    className="mx-auto h-48 w-auto object-cover rounded-md"
                                                />
                                            ) : (
                                                <svg 
                                                    className="mx-auto h-12 w-12 text-gray-400" 
                                                    stroke="currentColor" 
                                                    fill="none" 
                                                    viewBox="0 0 48 48" 
                                                    aria-hidden="true"
                                                >
                                                    <path 
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                                        strokeWidth={2} 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                    />
                                                </svg>
                                            )}
                                            
                                            <div className="flex text-sm text-gray-600">
                                                <label 
                                                    htmlFor="file-upload" 
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input 
                                                        id="file-upload" 
                                                        name="image" 
                                                        type="file" 
                                                        className="sr-only" 
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <PrimaryButton disabled={processing}>
                                    Update Shoe
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};