import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css'; // Assurez-vous d'importer le fichier CSS

const Birthdays = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBirthdays, setShowBirthdays] = useState(false); // État pour gérer l'affichage des anniversaires

    // Fonction pour récupérer les données des anniversaires
    const fetchBirthdays = async () => {
        try {
            const response = await axios.get('http://localhost:3002/getDateFromDB'); // Remplacez par votre URL si nécessaire
            setBirthdays(response.data); // Ajustez selon la structure de votre réponse
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBirthdays();
    }, []);

    // Fonction pour basculer l'affichage des anniversaires
    const toggleBirthdays = () => {
        setShowBirthdays(!showBirthdays);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="birthdays-container">
            <h1>Anniversaires</h1>
            <button onClick={toggleBirthdays}>
                {showBirthdays ? 'Cacher les anniversaires' : 'Afficher les anniversaires'}
            </button>
            {showBirthdays && (
                <ul>
                    {birthdays.map((birthday) => (
                        <li key={birthday.id}>
                            <strong>{birthday.brithday}</strong> - {birthday.lastname} - {birthday.fristname}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Birthdays;
