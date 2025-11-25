import { useState, useEffect } from 'react';
import { vendorsAPI } from '../../api/vendors';
import { Plus, Edit2, Trash2, Loader2, Package, X } from 'lucide-react';

export default function VendorServices() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price_range: '',
        availability_status: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log('Fetching vendor services and categories...');
            const [servicesData, categoriesData] = await Promise.all([
                vendorsAPI.getServices(),
                vendorsAPI.getCategories(),
            ]);
            
            console.log('Services data received:', servicesData);
            console.log('Categories data received:', categoriesData);
            
            // Handle paginated response
            const vendorServices = Array.isArray(servicesData) ? servicesData : servicesData?.results || [];
            const allCategories = Array.isArray(categoriesData) ? categoriesData : categoriesData?.results || [];
            
            console.log('Processed services:', vendorServices);
            console.log('Processed categories:', allCategories);
            
            setServices(vendorServices);
            setCategories(allCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Error details:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await vendorsAPI.updateService(editingService.id, formData);
            } else {
                await vendorsAPI.createService(formData);
            }
            setShowForm(false);
            setEditingService(null);
            setFormData({ name: '', description: '', category: '', price_range: '', availability_status: true });
            await fetchData();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            category: service.category?.id || service.category,
            price_range: service.price_range,
            availability_status: service.availability_status
        });
        setShowForm(true);
    };

    const handleDelete = async (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await vendorsAPI.deleteService(serviceId);
                await fetchData();
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Failed to delete service');
            }
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingService(null);
        setFormData({ name: '', description: '', category: '', price_range: '', availability_status: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
                    <p className="text-gray-600">Manage your service offerings</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>

            {/* Services Grid */}
            {services.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first service offering</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        Add Your First Service
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-1 text-gray-400 hover:text-blue-600"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-1 text-gray-400 hover:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                            
                            {service.category_name && (
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-2">
                                    {service.category_name}
                                </span>
                            )}

                            {service.description && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-600">Price Range</p>
                                    <p className="font-medium text-gray-900">
                                        {service.price_range || 'Contact for pricing'}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    service.availability_status 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {service.availability_status ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Service Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Wedding Photography"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category *
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Describe your service..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price Range
                                </label>
                                <input
                                    type="text"
                                    value={formData.price_range}
                                    onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., KSh 25,000 - 50,000"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="availability"
                                    checked={formData.availability_status}
                                    onChange={(e) => setFormData({ ...formData, availability_status: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="availability" className="ml-2 text-sm text-gray-700">
                                    Service is available
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingService ? 'Update' : 'Create'} Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
