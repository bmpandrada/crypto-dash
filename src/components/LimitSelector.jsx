const LimitSelector = ({onLimitChange, value, name}) => {
    return ( 

        <div className="controls">
        <label htmlFor="limit">Show:</label>
        <select 
          name={name} 
          id={name}  
          value={value}
          onChange={onLimitChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>

        </select>
      </div> 

     );
}
 
export default LimitSelector;