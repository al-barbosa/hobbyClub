import { useState } from 'react'
import ExternalAPI from '../helper/ExternalAPI';
import HobbyAPI from '../helper/HobbyAPI';

export default function AddHobby() {
  
  const [searched, setSearched] = useState({
    search: '',
  });
  const [type, setType] = useState('game');
  const [results, setResults] = useState([])

  const handleSearchName = ({ target }: { target: { name: string, value: string } }) => {
    const { value } = target;
    setSearched((prevInfo) => ({
      ...prevInfo,
      search: value,
    }));
  };

  const handleSelect = ({ target }: { target: { value: string } }) => {
    const { value } = target;
    setType(value);
  }

  const handleSearch = async () => {
    const externalApi = new ExternalAPI();
    const ans = await externalApi.getMovie(searched.search, '1', type);
    setResults(ans)
    console.log(ans)
  }

  return (
    <div>
      <form>
        <input
          className='form-control'
          type='text'
          id='search'
          name='search'
          value={searched.search}
          onChange={handleSearchName}
        />
        <button
          type='button'
          className='btn btn-primary btnClass'
          id='searchBtn'
          onClick={handleSearch}
        >
          Search
        </button>
        <select
          id='type'
          name='type'
          className='form-select'
          onChange={handleSelect}
        >
          <option value='game'>Game</option>
          <option value='movie'>Movie</option>
        </select>
      </form>
      {/* {results.length > 0 &&
      results.map((res, index) => <div
      key='index'
      >
      </div>)} */}
    </div>
  )
}