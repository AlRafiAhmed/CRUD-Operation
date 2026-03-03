import { memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Read = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="flex items-center justify-center w-full px-3 sm:px-0">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-50">
              User details
            </h3>
            <p className="text-xs text-slate-400">
              Read-only view of the selected user record.
            </p>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            ID&nbsp;{data.id}
          </span>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Title
            </p>
            <p className="mt-1 text-sm font-medium text-slate-50">
              {data.title || '-'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Description
            </p>
            <p className="mt-1 text-sm text-slate-200">
              {data.body || 'No description provided.'}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            Back to list
          </Link>
          <Link
            to={`/update/${data.id}`}
            className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Edit user
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Read);
