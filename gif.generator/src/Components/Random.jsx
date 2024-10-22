import React , { useState, useEffect } from 'react';
import "./Random.css";

const Random = () => {
  const [gif, setGif] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state

  // Function to handle the button click
  function clickHandler() {
    fetchData(); 
  }

  useEffect(() => {
    fetchData(); // Fetch GIF when component mounts
  }, []);

  // Function to fetch a random GIF
  async function fetchData() {
    setLoading(true); // Set loading to true before fetching
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setGif(data.data); // Set the fetched GIF data
      }
    } catch (error) {
      console.error('Error fetching the GIF:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }

  return (
    <div className='random-gifs'>
      <div className='box-heading'>
        <h2>Random GIFs</h2>
      </div>
      <div className='box-gif'>
        {loading ? (  // Conditional rendering based on loading state
          <p>Loading...</p>
        ) : (
          gif && ( // Check if gif is not null
            <img
              id="gifs-container"
              src={gif.images.downsized.url}  // Use the URL for the GIF
              alt="Random GIF"
            />
          )
        )}
      </div>
      <div className='button'>
        <button onClick={clickHandler}>Generate</button>
      </div>
    </div>
  );
}

export default Random;
