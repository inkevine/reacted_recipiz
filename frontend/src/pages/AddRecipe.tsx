import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { recipeApi, categoryApi } from '../services/api';
import './AddRecipe.css';

interface Category {
  id: number;
  name: string;
}

interface RecipeFormData {
  title: string;
  description: string;
  categoryId: number;
  ingredients: string;
  steps: string[];
  cookingTime: number;
  image: File | null;
}

const AddRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    categoryId: 0,
    ingredients: '',
    steps: [''],
    cookingTime: 0,
    image: null,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData(prev => ({
      ...prev,
      steps: newSteps
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('categoryId', formData.categoryId.toString());
      formDataToSend.append('ingredients', formData.ingredients);
      formData.steps.forEach((step, index) => {
        formDataToSend.append(`stepDescriptions`, step);
      });
      formDataToSend.append('cookingTime', formData.cookingTime.toString());
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await recipeApi.create(formDataToSend);
      navigate('/recipes');
    } catch (err) {
      setError('Failed to add recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-header">
        <h1>Add New Recipe</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select
              id="category"
              name="categoryId"
              className="form-select"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="form-control"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Steps:</label>
            <div id="steps-container">
              {formData.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <textarea
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    className="form-control"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeStep(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={addStep}
            >
              Add Step
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes):</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              className="form-control"
              value={formData.cookingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="form-label">Recipe Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="form-control form-file"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-cherry"
            disabled={loading}
          >
            {loading ? 'Adding Recipe...' : 'Add Recipe'}
          </button>
        </form>
      </div>
      <a href="/" className="back-link" onClick={(e) => {
        e.preventDefault();
        navigate('/');
      }}>
        <FaArrowLeft className="me-1" /> Back to Home
      </a>
    </div>
  );
};

export default AddRecipe; 