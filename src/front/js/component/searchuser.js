import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [loading, setLoading] = useState(false);
    const { actions } = useContext(Context);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            try {
                if (searchTerm.length > 1) {
                    const results = await actions.searchByUsername(searchTerm);
                    setSearchResults(results?.user ? [results.user] : []);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error searching for user:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };
    
        if (searchInitiated && searchTerm !== '') {
            search();
        }
    
        // Cleanup function to clear search results on unmount or when the search term changes
        return () => setSearchResults([]);
    }, [searchTerm, searchInitiated, actions]);

    return (
        <div className="search-bar row">
            <div className="input-group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
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
                    {loading && <p>Loading...</p>}
                    {!loading &&
                        searchResults.map((user) => (
                            <p key={user.id}>
                                <Link to={`/publicprofile/${user.id}`}>
                                    {user.level} {user.username}
                                </Link>
                            </p>
                        ))}
                    {searchTerm.length > 1 && !loading && searchResults.length === 0 && <p>No results...</p>}
                </div>
            )}
        </div>
    );
};

export default SearchUser;
