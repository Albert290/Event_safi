function VendorsCard() {
    return (
    <div>
        {/* Vendors Card Component */}
        <h2 className="text-xl font-semibold mb-4">Vendors Card</h2>
        <p>This is a placeholder for the Vendors Card component.</p>
        {(() => {
            const vendors = [
                { id: 1, name: 'Flora Designs', category: 'Floral', rating: 4.8, img: 'https://via.placeholder.com/80', desc: 'Wedding & event florals, bespoke arrangements.' },
                { id: 2, name: 'SoundWave DJs', category: 'Music', rating: 4.6, img: 'https://via.placeholder.com/80', desc: 'Professional DJs, lighting and MC services.' },
                { id: 3, name: 'Cater & Co.', category: 'Catering', rating: 4.9, img: 'https://via.placeholder.com/80', desc: 'Custom menus, dietary-friendly options.' },
                { id: 4, name: 'Event Photos', category: 'Photography', rating: 4.7, img: 'https://via.placeholder.com/80', desc: 'Photo and video coverage with fast delivery.' },
                { id: 5, name: 'Party Rentals', category: 'Rentals', rating: 4.5, img: 'https://via.placeholder.com/80', desc: 'Tents, tables, chairs, and decor rentals.' }
            ];

            const renderStars = (r) =>
                Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(r) ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                    </span>
                ));

            return (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vendors.length === 0 ? (
                        <div className="col-span-full text-gray-500">No vendors available.</div>
                    ) : (
                        vendors.map((v) => (
                            <div key={v.id} className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-white">
                                <img src={v.img} alt={v.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">{v.name}</h3>
                                            <p className="text-sm text-gray-500">{v.category}</p>
                                        </div>
                                        <div className="text-sm">
                                            <div className="flex items-center">
                                                <div className="flex">{renderStars(v.rating)}</div>
                                                <span className="text-gray-600 ml-2 text-xs">{v.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
                                    <div className="mt-3 flex gap-2">
                                        <button onClick={() => console.log('View', v.id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
                                            View
                                        </button>
                                        <button onClick={() => console.log('Contact', v.id)} className="px-3 py-1 border rounded text-sm">
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            );
        })()}

    </div>
    );
}
export default VendorsCard;