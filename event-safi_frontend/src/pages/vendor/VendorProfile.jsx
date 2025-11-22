import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

function VendorProfile() {
    const { user } = useAuthStore();
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [socialMedia, setSocialMedia] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        website: '',
    });

    const handleSocialMediaChange = (platform, value) => {
        setSocialMedia(prev => ({ ...prev, [platform]: value }));
    };

    const handleSaveSocialMedia = () => {
        // TODO: Integrate with API
        console.log('Saving social media:', socialMedia);
        alert('Social media links saved! (API integration pending)');
    };

    const handleUploadGalleryPhoto = (e) => {
        // TODO: Integrate with upload_photo endpoint
        const file = e.target.files[0];
        if (file) {
            console.log('Uploading photo:', file);
            alert('Photo upload will be integrated with API');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Vendor Profile</h1>
                <p className="text-gray-600 mt-2">Manage your business profile, photos, and social media</p>
            </div>

            {/* Cover Photo Section */}
            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Photo</h2>
                    <div className="relative">
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            {coverPhoto ? (
                                <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">No cover photo</p>
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Cover
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => console.log('Cover photo:', e.target.files[0])} />
                        </label>
                    </div>
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
                                value={socialMedia.facebook}
                                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                placeholder="https://facebook.com/yourpage"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input
                                type="url"
                                value={socialMedia.instagram}
                                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                placeholder="https://instagram.com/yourprofile"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                            <input
                                type="url"
                                value={socialMedia.twitter}
                                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                placeholder="https://twitter.com/yourhandle"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                value={socialMedia.linkedin}
                                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <input
                                type="url"
                                value={socialMedia.website}
                                onChange={(e) => handleSocialMediaChange('website', e.target.value)}
                                placeholder="https://yourwebsite.com"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <button
                            onClick={handleSaveSocialMedia}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Save Social Media Links
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
                            <Plus className="w-4 h-4" />
                            Add Photo
                            <input type="file" className="hidden" accept="image/*" onChange={handleUploadGalleryPhoto} />
                        </label>
                    </div>

                    {gallery.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos in gallery</h3>
                            <p className="text-gray-500 mb-4">Upload photos to showcase your work</p>
                            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                                <Upload className="w-4 h-4" />
                                Upload Your First Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handleUploadGalleryPhoto} />
                            </label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map((photo, index) => (
                                <div key={index} className="relative group">
                                    <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover rounded-lg" />
                                    <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                                        <X className="w-4 h-4" />
                                    </button>
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
