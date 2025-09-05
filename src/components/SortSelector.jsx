const SortSelector = ({ sortBy, onSortChange }) => {
    return ( 
        <div className="controls">
            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" value={sortBy} onChange={(e)=>onSortChange(e.target.value)}>
                <option value="market_cap_desc"> Market Cap (High To Low)</option>
                <option value="market_cap_asc"> Market Cap (Low To High)</option>
                <option value="price_desc"> Price (High To Low)</option>
                <option value="price_asc"> Price (Low To High)</option>
                <option value="change_desc"> 24hrs Change (High To Low)</option>
                <option value="change_asc"> 24hrs Change (Low To High)</option>
            </select>
        </div>
     );
}
 
export default SortSelector;