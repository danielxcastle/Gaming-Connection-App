import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const SearchUser = () => {
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
            <div className="input-group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setSearchInitiated(true);
                    }}
                    placeholder="Search users..."
                    className="form-control"
                />
                <button onClick={() => setSearchInitiated(true)} className="submit-button">
                    Search
                </button>
            </div>

            {searchInitiated && (
                <div className="search-results">
                    {searchResults.map(user => (
                        <p key={user.id}>{user.level}{user.username}</p>
                    ))}
                    {searchTerm.length > 1 && searchResults.length === 0 && (
                        <p>No results...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchUser;