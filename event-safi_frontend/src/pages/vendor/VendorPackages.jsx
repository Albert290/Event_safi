import { useState } from 'react';
import { Plus, Edit2, Trash2, Package as PackageIcon } from 'lucide-react';

function VendorPackages() {
    const [packages, setPackages] = useState([
        // Mock data - will be replaced with API
        {
            id: 1,
            name: 'Basic Package',
            description: 'Perfect for small gatherings',
            price: 50000,
            duration: '4 hours',
            includes: ['Photography', 'Basic editing', '100 photos'],
            isActive: true,
        },
        {
            id: 2,
            name: 'Premium Package',
            description: 'Complete coverage for your special day',
            price: 150000,
            duration: 'Full day',
            includes: ['Photography', 'Videography', 'Professional editing', 'Album', '500+ photos'],
            isActive: true,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);

    const handleCreatePackage = () => {
        setEditingPackage(null);
        setShowModal(true);
    };

    const handleEditPackage = (pkg) => {
        setEditingPackage(pkg);
        setShowModal(true);
    };

    const handleDeletePackage = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            setPackages(packages.filter(p => p.id !== id));
        }
    };

    const togglePackageStatus = (id) => {
        setPackages(packages.map(p =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Service Packages</h1>
                    <p className="text-gray-600 mt-2">Create and manage your service offerings</p>
                </div>
                <button
                    onClick={handleCreatePackage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Create Package
                </button>
            </div>

            {/* Packages Grid */}
            {packages.length === 0 ? (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                    <PackageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No packages yet</h3>
                    <p className="text-gray-500 mb-4">Create your first service package to offer to clients</p>
                    <button
                        onClick={handleCreatePackage}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Create Your First Package
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{pkg.duration}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${pkg.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {pkg.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4">{pkg.description}</p>

                                <div className="mb-4">
                                    <p className="text-3xl font-bold text-gray-900">
                                        KES {pkg.price.toLocaleString()}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                                    <ul className="space-y-1">
                                        {pkg.includes.map((item, index) => (
                                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
                                <button
                                    onClick={() => togglePackageStatus(pkg.id)}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    {pkg.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditPackage(pkg)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePackage(pkg.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal - Placeholder */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">
                            {editingPackage ? 'Edit Package' : 'Create Package'}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Package creation form will be implemented with API integration
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VendorPackages;
