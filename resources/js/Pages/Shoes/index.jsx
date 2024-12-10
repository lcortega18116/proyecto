import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function ShoesIndex({ shoes, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredShoes = selectedCategory
        ? shoes.filter(shoe => shoe.category_id === selectedCategory)
        : shoes;
    const handleEdit = (shoe) => {
        // Navigate to the edit page
        router.get(route('Shoes.edit', shoe.id));
    };
    const handleShow = (shoe) => {
        // Navigate to the show page whit slug
        router.get(route('Shoes.show', shoe.slug));
    };
    
    const handleDelete = (shoe) => {
        if (window.confirm(`Are you sure you want to delete the category "${shoe.name}"?`)) {
            router.delete(route('Shoes.destroy', shoe.id), {
                // Optional: Add error handling
                onError: (errors) => {
                    console.error('Deletion error:', errors);
                }
            });
        }
        };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Our Shoes Collection
                    </h2>
                </div>
            }
        >
            <Head title="Shoes Collection" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="mb-6 flex space-x-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                selectedCategory === null 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            All Shoes
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    selectedCategory === category.id 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Shoes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredShoes.length > 0 ? (
                            filteredShoes.map((shoe) => (
                                <div 
                                    key={shoe.id} 
                                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                                >
                                    {/* Shoe Image */}
                                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                                        {shoe.image ? (
                                            <img 
                                                src={shoe.image} 
                                                alt={shoe.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-24 w-24 text-gray-400" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Shoe Details */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{shoe.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{shoe.description}</p>
                                        
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xl font-bold text-blue-600">${shoe.price.toFixed(2)}</span>
                                            <div className="flex items-center">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    shoe.stock > 10 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : shoe.stock > 0 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {shoe.stock > 0 ? `${shoe.stock} in stock` : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-4 flex space-x-2">
                                            <button 
                                                    onClick={() => handleShow(shoe)}
                                                    className="flex-1 px-3 py-2 rounded-md hover:bg-green-500 hover:text-white bg-green-200 text-gray-800"
                                                >
                                                    View Details
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(shoe)}
                                                className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(shoe)}
                                                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-6 text-gray-500">
                                No shoes found in this category.
                            </div>
                        )}
                    </div>

                    {/* Create New Shoe Button (for admin) */}
                    <div className="flex justify-end mt-6">
                        <Link 
                            href={route('Shoes.create')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add New Shoe
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}