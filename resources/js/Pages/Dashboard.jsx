import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">
                                Welcome, {auth.user.name}!
                            </h1>
                            <p className="mb-6">
                                Manage your shoe inventory and categories from this dashboard.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Link 
                                    href="/admin/shoes" 
                                    className="block bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <h3 className="text-xl font-semibold mb-3">Manage Shoes</h3>
                                    <p>Add, edit, or remove shoes from your inventory</p>
                                </Link>

                                <Link 
                                    href="/admin/categories" 
                                    className="block bg-green-50 p-6 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <h3 className="text-xl font-semibold mb-3">Manage Categories</h3>
                                    <p>Create, update, or delete shoe categories</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}