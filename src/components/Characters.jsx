import React, { useState } from 'react';
import { InfiniteQueryObserver, useQuery } from 'react-query';
import Character from './Character';

function Characters() {
  //   const [characters, setCharacters] = useState([]);

  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    // query key is what we pass via the useQuery, in this case ['characters', page]
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    // const data = await response.json();
    // setCharacters(data.results);

    return response.json();
  };

  // react-query needs a key to understand which query it has fetched 'characters'
  const { data, status, isPreviewsData, isLoading, isError } = useQuery(
    ['characters', page],
    fetchCharacters
  );
  // and a function which fetches and returns the data fetchCharacters

  // the query returns the data and the status of the fetch (loading or error or success)

  //   useEffect(() => {
  //     fetchCharacters();
  //   }, []);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div>
      {/* {characters.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))} */}

      {/* {data.results.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))} */}

      {data.results?.map((character) => (
        <Character key={character.id} character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button
          disabled={isPreviewsData && data.info.next == null}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;
