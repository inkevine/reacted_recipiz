import React, { useState, useEffect } from 'react';
import { categoryApi } from '../services/api';
import './Categories.css';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryApi.createCategory(newCategory);
      setNewCategory({ name: '', description: '' });
      setIsAdding(false);
      fetchCategories();
    } catch (err) {
      setError('Failed to add category');
      console.error('Error adding category:', err);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryApi.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        setError('Failed to delete category');
        console.error('Error deleting category:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="categories">
      <div className="header">
        <h1>Recipe Categories</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {isAdding && (
        <form onSubmit={handleAddCategory} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
      )}

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-content">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <div className="category-actions">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 