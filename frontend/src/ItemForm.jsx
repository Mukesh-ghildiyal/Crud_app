import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ addItem, editingItem, updateItem, setEditingItem }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingItem) {
            setName(editingItem.name);
            setDescription(editingItem.description);
        }
    }, [editingItem]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            // Update item
            axios.put(`http://localhost:5000/api/items/${editingItem._id}`, { name, description })
                .then((response) => {
                    updateItem(response.data);
                    setEditingItem(null);
                    setName('');
                    setDescription('');
                })
                .catch((error) => console.error(error));
        } else {
            // Add new item
            axios.post('http://localhost:5000/api/items', { name, description })
                .then((response) => {
                    addItem(response.data);
                    setName('');
                    setDescription('');
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter item name"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter item description"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {editingItem ? 'Update Item' : 'Add Item'}
            </button>
        </form>
    );
};

export default ItemForm;
