import React from 'react';
import '../static/styles/HouseCard.css'; // Import the CSS file for styling

interface HouseCardProps {
    house: {
        id: number;
        title: string;
        image: string;
        description: string;
    };
    onClick: (id: number) => void; // Correctly define the onClick function type
}

const HouseCard: React.FC<HouseCardProps> = ({ house, onClick }) => {
    return (
        <div className="house-card" onClick={() => onClick(house.id)}>
            <img className="house-card-image" src={house.image} alt={house.title} />
            <h2>{house.title}</h2>
            <p>{house.description}</p>
            <button onClick={() => onClick(house.id)}>View Details</button> {/* Add onClick to button */}
        </div>
    );
};

export default HouseCard;