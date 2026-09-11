function Filter({ category, setCategory }) {

    return (
        <select
            className="filter"
            value={category}
            onChange={(event) =>
                setCategory(event.target.value)
            }
        >
            <option value="All">All Categories</option>

            <option value="React">React</option>

            <option value="HTML">HTML</option>

            <option value="CSS">CSS</option>

            <option value="JavaScript">
                JavaScript
            </option>

        </select>
    );
}

export default Filter;