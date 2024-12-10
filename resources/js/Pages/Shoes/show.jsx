import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function showShoe({ shoe }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {shoe.name}
                </h2>
            }
        >
            <Head title={shoe.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid md:grid-cols-2 gap-8 p-6">
                            <div>
                                <img 
                                    src={shoe.image} 
                                    alt={shoe.name} 
                                    className="w-full h-96 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{shoe.name}</h1>
                                
                                <div className="mb-4">
                                    <span className="text-2xl font-semibold text-gray-800">
                                        ${shoe.price.toFixed(2)}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600">{shoe.description}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="font-medium">
                                        Category: <span className="text-gray-600">{shoe.category.name}</span>
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="font-medium">
                                        Stock: <span className="text-gray-600">{shoe.stock} available</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}