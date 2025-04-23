import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { House } from '../types/House'; // Import the House type
import '../static/styles/CreateHouseForm.css'; // Import the CSS file for styling

interface CreateHouseFormProps {
    onCreate?: (houseData: House) => void; // Optional callback for additional logic
}

const CreateHouseForm: React.FC<CreateHouseFormProps> = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState<string | null>(null); // State for validation errors

    const navigate = useNavigate(); // Initialize navigate for redirection

    const getNextId = async (): Promise<number> => {
        try {
            const response = await fetch('http://localhost:5000/houses');
            if (!response.ok) {
                throw new Error('Failed to fetch houses.');
            }
            const houses: House[] = await response.json();
            const maxId = houses.reduce((max, house) => (house.id > max ? house.id : max), 0);
            return maxId + 1;
        } catch (error) {
            console.error('Error fetching houses:', error);
            throw new Error('Failed to determine the next ID.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title || !description || !image || !price || !location) {
            setError('All fields are required.');
            return;
        }

        if (isNaN(Number(price)) || Number(price) <= 0) {
            setError('Price must be a valid positive number.');
            return;
        }

        setError(null); // Clear any previous errors

        try {
            const nextId = await getNextId(); // Get the next ID

            const newHouse: House = {
                id: nextId, // Use the calculated ID
                title,
                description,
                image,
                price: Number(price),
                location,
            };

            // Save the house to the mock API
            const response = await fetch('http://localhost:5000/houses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHouse),
            });

            if (!response.ok) {
                throw new Error('Failed to save the house.');
            }

            // Optional: Call the onCreate callback if provided
            if (onCreate) {
                onCreate(newHouse);
            }

            // Redirect to the HomePage after successful creation
            navigate('/');
        } catch (error) {
            console.error('Error saving house:', error);
            setError('Failed to save the house. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect back to the HomePage
    };

    return (
        <form className="create-house-form" onSubmit={handleSubmit}>
            <h2>Create a New House</h2>
            {error && <p className="error-message">{error}</p>} {/* Display validation errors */}
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter house title"
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter house description"
                />
            </div>
            <div className="form-group">
                <label>Image URL:</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL"
                />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter price"
                />
            </div>
            <div className="form-group">
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
            </div>
            <div className="form-buttons">
                <button type="submit" className="submit-button">Create House</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CreateHouseForm;