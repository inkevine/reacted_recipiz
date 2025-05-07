import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../services/api';
import './MyRecipes.css';

const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await userApi.getProfile();
        setRecipes(response.data.recipes || []);
      } catch (err) {
        setError('Failed to load recipes');
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="my-recipes">
      <div className="header">
        <h1>My Recipes</h1>
        <Link to="/recipes/add" className="btn btn-primary">
          Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>You haven't added any recipes yet.</p>
          <Link to="/recipes/add" className="btn btn-primary">
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              )}
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-meta">
                  <span>{recipe.cookingTime} mins</span>
                  <span>{recipe.category?.name}</span>
                </div>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes; 