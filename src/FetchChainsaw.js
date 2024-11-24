import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchChainsaws = () => {
    const [chainsaws, setChainsaws] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChainsaws = async () => {
            try {
                const response = await axios.get("http://localhost:3000/chainsaws");
                setChainsaws(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };
        fetchChainsaws();
    }, []);

    return { chainsaws, loading, error };
};

export default useFetchChainsaws;
