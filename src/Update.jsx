import { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [values, setValues] = useState({
    id: '',
    title: '',
    body: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Users/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put('http://localhost:3000/Users/' + id, values)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center w-full px-3 sm:px-0">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              Update user
            </h2>
            <p className="text-xs text-slate-400">
              Modify the ID, title or description for this record.
            </p>
          </div>
          <Link
            to="/"
            className="text-xs font-medium text-slate-300 hover:text-slate-100 underline-offset-4 hover:underline"
          >
            Back to list
          </Link>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="id"
              className="block text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              ID
            </label>
            <input
              id="id"
              type="number"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={values.id}
              onChange={e => setValues({ ...values, id: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={values.title}
              onChange={e => setValues({ ...values, title: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="body"
              className="block text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Description
            </label>
            <textarea
              id="body"
              rows="3"
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={values.body}
              onChange={e => setValues({ ...values, body: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Update);
