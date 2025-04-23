import { House } from '../types/House';

const API_URL = 'http://localhost:5000/houses'; // URL for the json-server endpoint

export const getHouses = async (searchQuery: string = ''): Promise<House[]> => {
    try {
        const url = `${API_URL}?title=${encodeURIComponent(searchQuery)}`;
        console.log('Fetching houses from:', url); // Debugging log
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch houses from the database.');
        }
        const houses: House[] = await response.json();
        return houses;
    } catch (error) {
        console.error('Error fetching houses:', error);
        throw error;
    }
};

export const getHouseById = async (id: number): Promise<House | undefined> => {
    try {
        const response = await fetch(`${API_URL}/${id}`); // Use /houses/:id instead of ?id=
        if (!response.ok) {
            throw new Error(`Failed to fetch house with ID ${id}.`);
        }
        const house: House = await response.json();
        return house;
    } catch (error) {
        console.error('Error fetching house by ID:', error);
        throw error;
    }
};

export const createHouse = async (newHouse: Omit<House, 'id'>): Promise<House> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHouse),
        });
        if (!response.ok) {
            throw new Error('Failed to create a new house.');
        }
        const createdHouse: House = await response.json();
        return createdHouse;
    } catch (error) {
        console.error('Error creating house:', error);
        throw error;
    }
};