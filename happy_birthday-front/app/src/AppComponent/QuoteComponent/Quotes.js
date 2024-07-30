import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css'; 

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showQuotes, setShowQuotes] = useState(false); // État pour gérer l'affichage des citations

    // Fonction pour récupérer les données des citations
    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:3002/getFromDB'); // Remplacez par votre URL si nécessaire
            setQuotes(response.data); // Ajustez selon la structure de votre réponse
            console.log(quotes)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    // Fonction pour basculer l'affichage des citations
    const toggleQuotes = () => {
        setShowQuotes(!showQuotes);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="quotes-container">
            <h1>Citations</h1>
            <button onClick={toggleQuotes}>
                {showQuotes ? 'Cacher les citations' : 'Afficher les citations'}
            </button>
            {showQuotes && (
                <ul>
                    {quotes.map((quote) => (
                        <li key={quote.id}>
                            <strong>{quote.quote}</strong> - {quote.author}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Quotes;
