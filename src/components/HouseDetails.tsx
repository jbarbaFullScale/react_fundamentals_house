import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/styles/HouseDetails.css';

interface HouseDetailsProps {
    house: {
        id: number;
        title: string;
        description: string;
        image: string;
        price: number;
        location: string;
    };
}

const HouseDetails: React.FC<HouseDetailsProps> = React.memo(({ house }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [title, setTitle] = useState(house.title);
    const [description, setDescription] = useState(house.description);
    const [price, setPrice] = useState(house.price);
    const [updatedHouse, setUpdatedHouse] = useState(house); // Local state to reflect updates

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the HomePage
    };

    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleSaveClick = async () => {
        try {
            const updatedData = {
                ...updatedHouse,
                title,
                description,
                price,
            };

            const response = await fetch(`http://localhost:5000/houses/${house.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update house details.');
            }

            const updatedResponse = await response.json();
            setUpdatedHouse(updatedResponse); // Update local state with the new data
            setIsEditing(false); // Exit edit mode
            alert('House details updated successfully!');
        } catch (error) {
            console.error('Error updating house details:', error);
            alert('Failed to update house details. Please try again.');
        }
    };

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this house (${house.title})?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/houses/${house.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete house.');
            }

            alert('House deleted successfully!');
            navigate('/'); // Redirect to the HomePage after deletion
        } catch (error) {
            console.error('Error deleting house:', error);
            alert('Failed to delete house. Please try again.');
        }
    };

    return (
        <div className="house-details">
            {isEditing ? (
                <div className="edit-form">
                    <h1>Edit House Details</h1>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <button className="save-button" onClick={handleSaveClick}>
                        Save
                    </button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <h1>{updatedHouse.title}</h1>
                    <img
                        className="house-details-image"
                        src={updatedHouse.image}
                        alt={updatedHouse.title}
                    />
                    <p>{updatedHouse.description}</p>
                    <p>Price: ${updatedHouse.price}</p>
                    <p>Location: {updatedHouse.location}</p>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit
                    </button>
                    <button className="delete-button" onClick={handleDeleteClick}>
                        Delete
                    </button>
                    <button className="back-button" onClick={handleBackClick}>
                        Back to Home
                    </button>
                </>
            )}
        </div>
    );
});

export default HouseDetails;