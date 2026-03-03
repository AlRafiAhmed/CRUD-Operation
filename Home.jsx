import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const handleDelete = id => {
    const confirm = window.confirm("Would you like to dellet.?");
    if (confirm) {
      axios.delete('http://localhost:3000/Users/' + id)
        .then(() => {
          setData(prev => prev.filter(item => item.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [minID, setMinID] = useState("");
  const [maxId, setMaxID] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 10;
  useEffect(() => {
    axios.get('http://localhost:3000/Users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredData = [...data]
    .filter((item) => {
      const searchText = search.toLowerCase().trim();

      const matchText =
        item.title.toLowerCase().includes(searchText) ||
        item.body.toLowerCase().includes(searchText);
      const matchMin =
        minID === "" || item.id >= Number(minID);
      const matchMax =
        maxId === "" || item.id <= Number(maxId);
      return matchText && matchMin && matchMax;
    })
    .sort((a, b) => a.id - b.id);
  const totalPages = Math.ceil(filteredData.length / itemsPage);
  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = filteredData.slice(  
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div className='p-8 container'>
      <h3 className='flex justify-center text-3xl font-black py-8'>
        List of the Users
      </h3>
      <div className='flex justify-between bg-blue-400 rounded-2xl'>
        <div className="flex gap-4 my-2 mx-3 justify-center">
          <input
            type="text"
            placeholder="Filter From"
            className="border-2 p-2 w-24 bg-white"
            value={minID}
            onChange={(e) => {
              setMinID(e.target.value);
              setCurrentPage(1);
            }} />
          <input
            type="text"
            placeholder="Filter Upto"
            className="border-2 p-2 w-24 bg-white"
            value={maxId}
            onChange={(e) => {
              setMaxID(e.target.value);
              setCurrentPage(1);
            }} />
        </div>
        <input
          type="text"
          placeholder='Enter the search text'
          className='border-2 p-2 rounded-bl-3xl rounded-tr-3xl bg-white'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Link to='/create'>
          <p className='border-2 p-1 mt-4 mr-4 text-sm font-bold bg-white'>
            ADD +
          </p>
        </Link>
      </div>
      <div className='flex justify-center'>
        <table className='border-separate border-2 bg-amber-200 mt-6'>
          <thead>
            <tr className='text-lg'>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Operations</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className='text-center p-4 font-bold'> No Data Found</td>
              </tr>
            ) : (
              currentItems.map((d) => (
                <tr key={d.id} className='border-2'>
                  <td className='p-3 border-2'>{d.id}</td>
                  <td className='p-3 border-2'>{d.title}</td>
                  <td className='p-3 border-2'>{d.body}</td>
                  <td className='p-2 flex gap-2'>
                    <Link to={`/read/${d.id}`} className='border-2 bg-blue-300 px-2 py-1 font-bold text-sm'>Read</Link>
                    <Link to={`/update/${d.id}`} className='border-2 bg-amber-300 px-2 py-1 font-bold text-sm'>Edit</Link>
                    <button onClick={() => handleDelete(d.id)} className='border-2 bg-red-400 px-2 py-1 font-bold text-sm'>Dellet</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 bg-blue-400 rounded-br-2xl rounded-tl-2xl  font-bold border-t-2  border-r-4 border-black  " >Prev
        </button>
 
        <span className="font-bold">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 bg-blue-400 rounded-bl-2xl rounded-tr-2xl font-bold border-b-2  border-r-4 border-black ">Next
        </button>

      </div>

    </div>
  );
};

export default memo(Home);