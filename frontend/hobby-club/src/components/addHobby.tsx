import '../styles/AddHobby.css'
import { useState } from 'react'
import ExternalAPI from '../helper/ExternalAPI';
import IExternalApi from '../interfaces/externalApi.interface';
import notFound from '../icons/notFound.png'
import ClubAPI from '../helper/ClubAPI';

export default function AddHobby(props: {
  clubId: number
  rerender: boolean
  setAddedWindow: React.Dispatch<React.SetStateAction<boolean>>
  setRerender: React.Dispatch<React.SetStateAction<boolean>>
}) {
  
  const [searched, setSearched] = useState({
    search: '',
  });

  const [type, setType] = useState('game');

  const [results, setResults] = useState(([] as unknown) as IExternalApi)

  const [pages, setPages] = useState([] as number[]);

  const [oldSearch, setOldSearch] = useState({
    search: '',
    type: '',
  });

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

  const externalApi = new ExternalAPI();

  const handleSearch = async () => {
    const ans = await externalApi.getMovie(searched.search, '1', type);
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(parseInt(ans.totalResults)/10); i++) {
      pageNumber.push(i);
    }
    setPages(pageNumber);
    setResults(ans)
    setOldSearch({
      search: searched.search,
      type,
    })
  }

  const handleChangePage = async ({ target }: { target: { value: string } }) => {
    setResults(([] as unknown) as IExternalApi)
    const { value } = target;
    const ans = await externalApi.getMovie(oldSearch.search, value, oldSearch.type);
    setResults(ans);
  }

  const handleAddHobbie = async (name: string, img: string, type: string) => {
    const clubApi = new ClubAPI();
    const ans = await clubApi.addHobbie(
      name,
      img,  
      type,
      props.clubId,
      JSON.parse(document.cookie).token
    )
    console.log(ans)
    props.setAddedWindow(false);
    props.setRerender(!props.rerender);
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
      <div className="foundedHobbies">
        {results.Search &&
        results.Search.map((res, index) => <div
          className='foundedHobbyContainer'
          key={index}
        >
          <img
            src={res.Poster === 'N/A' ? notFound : res.Poster}
            alt={`${res.Title} poster`}
            className='hobbyPoster'
          />
          <div className='hobbyInfo'>
            <span className='hobbyName'>
              {res.Title}
            </span>
            <span className='hobbyDate'>
              {`(${res.Year})`}
            </span>
            <button
              className='selectHobbyBtn'
              onClick={() => handleAddHobbie(res.Title, res.Poster, res.Type)}
            >
              Select hobby
            </button>
          </div>
        </div>)}
        <div className="pageList">
          {(parseInt(results.totalResults) > 10) &&
          pages.map((number, index) => <div
          key={index}
          className='pageNumber'
          >
            <button
              value={number}
              onClick={(e) => handleChangePage((e as unknown) as { target: { value: string; }; })}
            >
              {number}
            </button>
          </div> )}
        </div>
      </div>
    </div>
  )
}