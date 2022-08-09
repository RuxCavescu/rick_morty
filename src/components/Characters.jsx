import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function Characters() {
  //   const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    // const data = await response.json();
    // setCharacters(data.results);

    return response.json();
  };

  // react-query needs a key to understand which query it has fetched 'characters'
  const { data, status } = useQuery('characters', fetchCharacters);
  // and a function which fetches and returns the data fetchCharacters

  // the query returns the data and the status of the fetch (loading or error or success)

  //   useEffect(() => {
  //     fetchCharacters();
  //   }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error!</div>;
  }

  return (
    <div>
      {/* {characters.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))} */}

      {data.results.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
}

export default Characters;
