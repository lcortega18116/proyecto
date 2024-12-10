import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ShowCategory({ category, shoes }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Category: {category.name}
                </h2>
            }
        >
            <Head title={`Category: ${category.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Category Details */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {category.description || 'No description available'}
                                </p>
                            </div>
                            <div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg mb-2">Category Statistics</h4>
                                    <p>Total Shoes: {shoes.length}</p>
                                    <p>
                                        Average Price: $
                                        {shoes.length > 0 
                                            ? (shoes.reduce((sum, shoe) => sum + parseFloat(shoe.price), 0) / shoes.length).toFixed(2)
                                            : '0.00'
                                        }
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