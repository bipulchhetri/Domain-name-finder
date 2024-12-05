const SuggestionsList = ({ suggestions }) => {
    return (
      <div>
        <h3>Suggestions:</h3>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SuggestionsList;
  