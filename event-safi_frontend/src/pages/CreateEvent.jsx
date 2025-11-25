import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { eventsAPI } from '../api/events';
import { AlertCircle, Loader } from 'lucide-react';

function CreateEvent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const isEditing = !!editId;
    
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);
    const [error, setError] = useState('');
    const [eventTypes, setEventTypes] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_type: '',
        date: '',
        location: '',
        budget: '',
    });

    useEffect(() => {
        fetchEventTypes();
        if (isEditing) {
            fetchEventData();
        }
    }, [isEditing, editId]);

    const fetchEventData = async () => {
        try {
            const event = await eventsAPI.getEvent(editId);
            setFormData({
                title: event.title || '',
                description: event.description || '',
                event_type: event.event_type || '',
                date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
                location: event.location || '',
                budget: event.budget || '',
            });
        } catch (err) {
            console.error('Error fetching event:', err);
            setError('Failed to load event data');
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchEventTypes = async () => {
        try {
            const response = await eventsAPI.getEventTypes();
            // API returns paginated response: {count, next, previous, results}
            const typesArray = Array.isArray(response) ? response : (response?.results || []);
            setEventTypes(typesArray);
        } catch (err) {
            console.error('Error fetching event types:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Prepare data for submission
            const eventData = {
                title: formData.title,
                description: formData.description,
                event_type: formData.event_type || null,
                date: formData.date,
                location: formData.location,
                budget: formData.budget ? parseFloat(formData.budget) : null,
                status: 'planning'
            };

            let response;
            if (isEditing) {
                response = await eventsAPI.updateEvent(editId, eventData);
            } else {
                response = await eventsAPI.createEvent(eventData);
            }

            // Redirect to the event's detail page
            navigate(`/events/${response.id || editId}`);
        } catch (err) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} event:`, err);
            setError(err.response?.data?.detail || `Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay - clicking it goes back to /events */}
            <Link to="/events" className="absolute inset-0 bg-black opacity-50" />

            {/* modal */}
            <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 z-10 max-h-[90vh] overflow-y-auto">
                {/* close button */}
                <Link
                    to="/events"
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl z-10"
                    aria-label="Close"
                >
                    &times;
                </Link>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        {isEditing ? 'Edit Event' : 'Create New Event'}
                    </h1>

                    {initialLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter event name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe your event..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                                <select
                                    name="event_type"
                                    value={formData.event_type}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select event type</option>
                                    {eventTypes.map(type => (
                                        <option key={type.id} value={type.name}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Event location"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget (KES)</label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <Link to="/events" className="text-blue-600 hover:underline">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading && <Loader className="w-4 h-4 animate-spin" />}
                                {loading 
                                    ? (isEditing ? 'Updating...' : 'Creating...') 
                                    : (isEditing ? 'Update Event' : 'Create Event')
                                }
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    </div>
</div>
);
}

export default CreateEvent;
