import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState(""); // User input
  const [results, setResults] = useState(null); // API results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Function to handle domain availability check
  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty queries
    setLoading(true);
    setError(""); // Clear previous errors
    setResults(null); // Clear previous results

    const apiKey = "at_tohcpQFLMMt9yCj3XIolvTWUNbkgr"; // Replace with your API key

    try {
      const response = await axios.get(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domain=${query}`
      );
      setResults(response.data); // Set results from the API response
    } catch (err) {
      setError("Failed to fetch domain availability. Try again later.");
      console.error("Error fetching domain availability:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Domain Availability Checker</h1>
      <p>Check domain availability (supports all domains)</p>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter domain (e.g., example.com)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && (
        <div>
          <h3>Results:</h3>
          <p>
            Domain: <strong>{results.domainName}</strong>
          </p>
          <p>
            Status:{" "}
            {results.domainAvailability === "AVAILABLE"
              ? "Available ✅"
              : "Unavailable ❌"}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
