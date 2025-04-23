import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import { getHouses } from '../services/houseService';
import { House } from '../types/House'; // Import the House type
import '../static/styles/HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
    const [houses, setHouses] = useState<House[]>([]); // State for houses
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHouses = async () => {
            const houseData = await getHouses(searchQuery); // Pass search query to API
            setHouses(houseData);
        };
        fetchHouses();
    }, [searchQuery]); // Re-fetch houses when searchQuery changes

    const handleHouseClick = (id: number) => {
        navigate(`/houses/${id}`);
    };

    const handleCreateHouseClick = () => {
        navigate('/create-house'); // Navigate to the "Create House" page
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query state
    };

    return (
        <div className="homepage-container">
            <h1 className="homepage-title">House Listings</h1>
            <button className="create-house-button" onClick={handleCreateHouseClick}>
                Create New House
            </button>
            <input
                type="text"
                className="search-input"
                placeholder="Search houses..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="house-list">
                {houses.map(house => (
                    <HouseCard
                        key={house.id}
                        house={house} // Pass the full house object
                        onClick={() => handleHouseClick(house.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;