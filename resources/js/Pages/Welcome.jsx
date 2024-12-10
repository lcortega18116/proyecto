import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Welcome({ auth, shoes, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredShoes = selectedCategory
        ? shoes.filter(shoe => shoe.category_id === selectedCategory)
        : shoes;

    return (
        <>
            <Head title="Shoes Collection" />
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900"></div>

                <div className="relative min-h-screen flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    <svg 
                                        className="h-10 w-10 mr-3 text-blue-600"
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a5.74 5.74 0 0 0-4.59 2.17A4.22 4.22 0 0 1 5.5 9.51C2.53 9.93 0 12.41 0 15.5A5.52 5.52 0 0 0 5.5 21h13a5.52 5.52 0 0 0 5.5-5.5c0-3.09-2.53-5.57-5.5-5.99ZM16 10l-4-4-4 4H4.5L12 17l7.5-7Z"/>
                                    </svg>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Shoes Collection
                                    </h1>
                                </div>

                                <nav className="flex space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-grow container mx-auto px-4 py-8">
                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                    selectedCategory === null 
                                        ? 'bg-blue-500 text-white shadow-lg' 
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                                }`}
                            >
                                All Shoes
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                        selectedCategory === category.id 
                                            ? 'bg-blue-500 text-white shadow-lg' 
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
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
                                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="relative h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                            {shoe.image ? (
                                                <img 
                                                    src={shoe.image} 
                                                    alt={shoe.name} 
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform"
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

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{shoe.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{shoe.description}</p>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-blue-600">${shoe.price.toFixed(2)}</span>
                                                <span 
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        shoe.stock > 10 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : shoe.stock > 0 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {shoe.stock > 0 ? `${shoe.stock} in stock` : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-2xl text-gray-500 dark:text-gray-400">
                                        No shoes found in this category.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-white dark:bg-gray-900 py-6 mt-8 border-t dark:border-gray-700">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} Shoes Collection. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}