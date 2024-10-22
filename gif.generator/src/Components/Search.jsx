import React, { useCallback, useState ,useEffect } from 'react'

const Search = () => {
 const [gif,setGif] = useState(null);
 const [loading,setLoading] = useState(true);
 const [inputval,setinputval] = useState("");
 function inputhandler(event){
    setinputval(event.target.value);
 }

 function clickhandler(){
    fetchdata(inputval);
 }

  
 async function fetchdata(inputval) {
    setLoading(true); // Set loading to true before fetching
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputval}&limit=5`;
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setGif(data.data[0]); // Set the fetched GIF data
      }
    } catch (error) {
      console.error('Error fetching the GIF:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
 }
  

  return (
    <div className='search-gifs'>
    <div className='box-heading'><h2>Random gifs</h2></div>
   <div className='box-gifs'>
   {loading ? (  // Conditional rendering based on loading state
          <p>loading...</p>
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
   <div className='input'><input onChange={inputhandler} type='text'/></div>
   <div className='button'><button onClick={clickhandler}>Generate</button></div>
 </div>
  )
}

export default Search
