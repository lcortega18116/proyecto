import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({categories}) {
    const [selectedCategory, setSelectedCategory] = useState(null);


    const handleEdit = (category) => {
        // Navigate to the edit page for the specific category
        router.get(route('Categories.edit', category.id));
    };
    const handleShow = (category) => {
        // Navigate to the show page for the specific category
        router.get(route('Categories.show', category.name));
    };
    
    const handleDelete = (category) => {
        if (window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
            router.delete(route('Categories.destroy', category.id), {
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Table Container */}
                            <div className="mb-6">
                                {categories.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Priority
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {categories.map((category) => (
                                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                                                    <td className="px-6 py-4">{category.description}</td>
                                                    <td className="px-6 py-4">{category.priority}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex space-x-2">
                                                            <button 
                                                                    onClick={() => handleShow(category)}
                                                                    className=".px-3 py-2 rounded-md hover:bg-green-500 hover:text-white bg-green-200 text-gray-600"
                                                                >
                                                                    View Details
                                                            </button>
                                                            <button 
                                                                onClick={() => handleEdit(category)}
                                                                className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(category)}
                                                                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        No categories found. Create your first category!
                                    </div>
                                )}
                            </div>

                            {/* Create New Category Button */}
                            <div className="flex justify-end">
                                <Link 
                                    href={route('Categories.create')}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Create New Category
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}