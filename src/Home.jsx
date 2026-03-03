import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [minID, setMinID] = useState('');
  const [maxId, setMaxID] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPage = 10;

  useEffect(() => {
    axios
      .get('http://localhost:3000/Users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (!confirmDelete) return;

    axios
      .delete('http://localhost:3000/Users/' + id)
      .then(() => {
        setData(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  const filteredData = [...data]
    .filter((item) => {
      const searchText = search.toLowerCase().trim();

      const matchText =
        item.title.toLowerCase().includes(searchText) ||
        item.body.toLowerCase().includes(searchText);
      const matchMin = minID === '' || Number(item.id) >= Number(minID);
      const matchMax = maxId === '' || Number(item.id) <= Number(maxId);
      return matchText && matchMin && matchMax;
    })
    .sort((a, b) => Number(a.id) - Number(b.id));

  const totalPages = Math.ceil(filteredData.length / itemsPage);
  const indexOfLastItem = currentPage * itemsPage;
  const indexOfFirstItem = indexOfLastItem - itemsPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            Users
          </h2>
          <p className="text-sm text-slate-400">
            Filter, search and manage all user records from a single place.
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <span className="text-lg leading-none">＋</span>
          <span>New User</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 sm:p-4 shadow-lg shadow-slate-950/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <div className="flex flex-1 gap-3">
              <div className="w-32">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Min ID
                </label>
                <input
                  type="number"
                  placeholder="From"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={minID}
                  onChange={(e) => {
                    setMinID(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Max ID
                </label>
                <input
                  type="number"
                  placeholder="To"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={maxId}
                  onChange={(e) => {
                    setMaxID(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title or description"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
          <div className="max-h-[480px] overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Body</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-sm font-medium text-slate-400"
                    >
                      No records match your filters.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-slate-900/80 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-200 font-mono text-xs">
                        {d.id}
                      </td>
                      <td className="px-4 py-3 text-slate-50">
                        {d.title}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {d.body}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/read/${d.id}`}
                            className="inline-flex items-center rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
                          >
                            View
                          </Link>
                          <Link
                            to={`/update/${d.id}`}
                            className="inline-flex items-center rounded-lg border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(d.id)}
                            className="inline-flex items-center rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-4 py-3 text-xs text-slate-400">
            <div>
              Showing{' '}
              <span className="font-semibold text-slate-200">
                {currentItems.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-200">
                {filteredData.length}
              </span>{' '}
              records
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-800"
              >
                Prev
              </button>
              <span className="text-slate-300">
                Page{' '}
                <span className="font-semibold text-slate-100">
                  {currentPage}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-100">
                  {totalPages || 1}
                </span>
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
