import React from 'react';
import axios from 'axios';

const ItemList = ({ items, setEditingItem, fetchItems }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/items/${id}`)
            .then(() => {
                fetchItems(); // Refresh the item list after deletion
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Items</h2>
            {items.length > 0 ? (
                <ul className="space-y-4">
                    {items.map(item => (
                        <li key={item._id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setEditingItem(item)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No items found</p>
            )}
        </div>
    );
};

export default ItemList;
