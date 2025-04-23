import React from 'react';
import CreateHouseForm from '../components/CreateHouseForm';
import '../static/styles/CreateHousePage.css'; // Import the CSS file for styling

const CreateHousePage: React.FC = () => {
    const handleCreateHouse = (houseData: { title: string; image: string; description: string }) => {
        // Logic to handle house creation (e.g., call to houseService)
        console.log('New house data:', houseData);
    };

    return (
        <div>
            <h1 className="create-house-title">Create a New House Listing</h1>
            <CreateHouseForm onCreate={handleCreateHouse} />
        </div>
    );
};

export default CreateHousePage;