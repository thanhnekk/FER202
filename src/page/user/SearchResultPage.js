import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResult from './SearchResult'; // Adjust the path accordingly

const SearchResultsPage = () => {
    const location = useLocation();
    const products = location.state?.products || []; // Safely access products

    return (
        <div>
            <SearchResult products={products} />
        </div>
    );
};

export default SearchResultsPage;
