import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const { actions } = useContext(Context);

    useEffect(() => {
        const search = async () => {
            if (searchTerm.length > 1) {
                try {
                    const results = await actions.searchByUsername(searchTerm);
                    setSearchResults(results?.user ? [results.user] : []);
                } catch (error) {
                    console.error('Error searching for user:', error);
                    setSearchResults([]);
                }
            } else {
                setSearchResults([]);
            }
        };

        if (searchInitiated) {
            search();
        }
    }, [searchTerm, searchInitiated, actions]);

    return (
        <div className="search-bar row">
            <input
                type="text"
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setSearchInitiated(true);
                }}
                placeholder="Search users..."
            />
            <button onClick={() => setSearchInitiated(true)} className="submit-button">
                Search
            </button>
            <div className="search-results">
                {searchInitiated && (
                    <ul>
                        {searchResults.map(user => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    </ul>
                )}
                {searchInitiated && searchTerm.length > 1 && searchResults.length === 0 && (
                    <p>No results...</p>
                )}
            </div>
        </div>
    );
};

export default SearchUser;
