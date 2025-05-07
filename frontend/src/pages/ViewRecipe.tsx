import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeApi } from '../services/api';
import './ViewRecipe.css';

const ViewRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeApi.getById(id!);
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to load recipe');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      )}
      <div className="recipe-info">
        <p><strong>Category:</strong> {recipe.category?.name}</p>
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      </div>
      <div className="recipe-description">
        <h2>Description</h2>
        <p>{recipe.description}</p>
      </div>
      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <p>{recipe.ingredients}</p>
      </div>
      <div className="recipe-steps">
        <h2>Steps</h2>
        <ol>
          {recipe.steps?.map((step: any, index: number) => (
            <li key={index}>{step.description}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ViewRecipe; 