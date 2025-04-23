import React from 'react';
import { useParams } from 'react-router-dom';
import HouseDetails from '../components/HouseDetails';
import { getHouseById } from '../services/houseService';
import { House } from '../types/House'; // Import the House type

const HouseDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [house, setHouse] = React.useState<House | null>(null); // Properly type the house state
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');

    React.useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                if (id) {
                    const fetchedHouse = await getHouseById(Number(id)); // Convert id to a number
                    if (fetchedHouse) {
                        setHouse(fetchedHouse);
                    }
                } else {
                    setError('Invalid house ID');
                }
            } catch (err) {
                setError('Failed to fetch house details');
            } finally {
                setLoading(false);
            }
        };

        fetchHouseDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {house ? <HouseDetails house={house} /> : <div>House not found</div>}
        </div>
    );
};

export default HouseDetailsPage;