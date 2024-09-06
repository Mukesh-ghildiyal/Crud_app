import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  };

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Crud App</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <ItemForm
          addItem={addItem}
          editingItem={editingItem}
          updateItem={updateItem}
          setEditingItem={setEditingItem}
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-8">
        <ItemList
          items={items}
          setEditingItem={setEditingItem}
          fetchItems={fetchItems}
        />
      </div>
    </div>
  );
};

export default App;
