function SearchBar({ searchTerm, setSearchTerm }) {

    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(event) =>
                setSearchTerm(event.target.value)
            }
        />
    );
}

export default SearchBar;