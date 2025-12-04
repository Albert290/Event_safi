import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { vendorsAPI } from '../../api/vendors';
import { Upload, X, Plus, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

function VendorProfile() {
    const { user } = useAuthStore();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    const [formData, setFormData] = useState({
        description: '',
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        linkedin_url: '',
        website_url: '',
    });

    useEffect(() => {
        fetchVendorProfile();
    }, []);

    const fetchVendorProfile = async () => {
        try {
            setLoading(true);
            const vendorData = await vendorsAPI.getVendor(user.vendor_profile.id);
            setVendor(vendorData);
            setFormData({
                description: vendorData.description || '',
                facebook_url: vendorData.facebook_url || '',
                instagram_url: vendorData.instagram_url || '',
                twitter_url: vendorData.twitter_url || '',
                linkedin_url: vendorData.linkedin_url || '',
                website_url: vendorData.website_url || '',
            });
        } catch (error) {
            console.error('Error fetching vendor profile:', error);
            showNotification('error', 'Failed to load vendor profile');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    const handleCoverPhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('error', 'Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('error', 'Image size should be less than 5MB');
            return;
        }

        try {
            setUploadingCover(true);
            const formDataToSend = new FormData();
            formDataToSend.append('cover_photo', file);

            const updatedVendor = await vendorsAPI.updateVendorProfile(vendor.id, formDataToSend);
            setVendor(updatedVendor);
            showNotification('success', 'Cover photo updated successfully!');
        } catch (error) {
            console.error('Error uploading cover photo:', error);
            showNotification('error', 'Failed to upload cover photo');
        } finally {
            setUploadingCover(false);
        }
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            const formDataToSend = new FormData();

            // Normalize URLs - add https:// if missing
            const normalizedData = { ...formData };
            const urlFields = ['facebook_url', 'instagram_url', 'twitter_url', 'linkedin_url', 'website_url'];

            urlFields.forEach(field => {
                if (normalizedData[field] && normalizedData[field].trim()) {
                    let url = normalizedData[field].trim();
                    // Add https:// if no protocol specified
                    if (!url.match(/^https?:\/\//i)) {
                        url = 'https://' + url;
                    }
                    normalizedData[field] = url;
                }
            });

            Object.keys(normalizedData).forEach(key => {
                if (normalizedData[key]) {
                    formDataToSend.append(key, normalizedData[key]);
                }
            });

            const updatedVendor = await vendorsAPI.updateVendorProfile(vendor.id, formDataToSend);
            setVendor(updatedVendor);
            // Update form with saved values
            setFormData({
                description: updatedVendor.description || '',
                facebook_url: updatedVendor.facebook_url || '',
                instagram_url: updatedVendor.instagram_url || '',
                twitter_url: updatedVendor.twitter_url || '',
                linkedin_url: updatedVendor.linkedin_url || '',
                website_url: updatedVendor.website_url || '',
            });
            showNotification('success', 'Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            // Show specific validation errors if available
            if (error.response?.data) {
                const errors = error.response.data;
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                    .join('; ');
                showNotification('error', errorMessages || 'Failed to update profile');
            } else {
                showNotification('error', 'Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleUploadGalleryPhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('error', 'Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('error', 'Image size should be less than 5MB');
            return;
        }

        try {
            setUploadingGallery(true);
            const photoData = {
                image: file,
                caption: '',
                order: vendor?.gallery?.length || 0,
            };

            await vendorsAPI.uploadGalleryPhoto(vendor.id, photoData);
            // Refresh vendor data to get the new photo
            await fetchVendorProfile();
            showNotification('success', 'Photo added to gallery!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            showNotification('error', 'Failed to upload photo');
        } finally {
            setUploadingGallery(false);
        }
    };

    const handleDeleteGalleryPhoto = async (photoId) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        try {
            await vendorsAPI.deleteGalleryPhoto(vendor.id, photoId);
            // Refresh vendor data to reflect deletion
            await fetchVendorProfile();
            showNotification('success', 'Photo deleted successfully!');
        } catch (error) {
            console.error('Error deleting photo:', error);
            showNotification('error', 'Failed to delete photo');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!vendor) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Failed to load vendor profile</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{notification.message}</span>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Vendor Profile</h1>
                <p className="text-gray-600 mt-2">Manage your business profile, photos, and social media</p>
            </div>

            {/* Cover Photo Section */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Photo</h2>
                    <div className="relative">
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {vendor.cover_photo ? (
                                <img src={vendor.cover_photo} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No cover photo</p>
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
                            {uploadingCover ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Upload Cover
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleCoverPhotoUpload}
                                disabled={uploadingCover}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Business Description */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Description</h2>
                    <textarea
                        rows="6"
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Tell potential clients about your business, services, and what makes you unique..."
                        className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                    <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Description'
                        )}
                    </button>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media Links</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                            <input
                                type="url"
                                value={formData.facebook_url}
                                onChange={(e) => handleFormChange('facebook_url', e.target.value)}
                                placeholder="https://facebook.com/yourpage"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input
                                type="url"
                                value={formData.instagram_url}
                                onChange={(e) => handleFormChange('instagram_url', e.target.value)}
                                placeholder="https://instagram.com/yourprofile"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                            <input
                                type="url"
                                value={formData.twitter_url}
                                onChange={(e) => handleFormChange('twitter_url', e.target.value)}
                                placeholder="https://twitter.com/yourhandle"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                value={formData.linkedin_url}
                                onChange={(e) => handleFormChange('linkedin_url', e.target.value)}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <input
                                type="url"
                                value={formData.website_url}
                                onChange={(e) => handleFormChange('website_url', e.target.value)}
                                placeholder="https://yourwebsite.com"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Social Media Links'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Portfolio Gallery</h2>
                        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
                            {uploadingGallery ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Add Photo
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleUploadGalleryPhoto}
                                disabled={uploadingGallery}
                            />
                        </label>
                    </div>

                    {!vendor.gallery || vendor.gallery.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos in gallery</h3>
                            <p className="text-gray-500 mb-4">Upload photos to showcase your work</p>
                            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                                <Upload className="w-4 h-4" />
                                Upload Your First Photo
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUploadGalleryPhoto}
                                    disabled={uploadingGallery}
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {vendor.gallery.map((photo) => (
                                <div key={photo.id} className="relative group">
                                    <img
                                        src={photo.image}
                                        alt={photo.caption || 'Gallery photo'}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => handleDeleteGalleryPhoto(photo.id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    {photo.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm rounded-b-lg">
                                            {photo.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VendorProfile;
