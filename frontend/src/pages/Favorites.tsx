import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../services/api';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await userApi.getProfile();
      setFavorites(response.data.favorites || []);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (recipeId: number) => {
    try {
      await userApi.removeFavorite(recipeId);
      setFavorites(favorites.filter(fav => fav.id !== recipeId));
    } catch (err) {
      setError('Failed to remove from favorites');
      console.error('Error removing favorite:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="favorites">
      <div className="header">
        <h1>My Favorite Recipes</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any recipes to your favorites yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
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
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-primary">
                    View Recipe
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFavorite(recipe.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 