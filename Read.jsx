import { memo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Read = () => {
  const [data, setData] = useState({})
  const { id } = useParams();
  console.log("URL ID:", id);
  useEffect(() => {
    axios.get(`http://localhost:3000/Users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id])
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-10  border-2">
        <h3 className="text-center text-3xl font-black text-fuchsia-800 mb-8"> User Details</h3>
        <div className="">
          <div className="flex justify-between border-b pb-2">
            <strong className="text-lg">ID :</strong>
            <span className="font-semibold">{data.id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <strong className="text-lg">Title :</strong>
            <span className="font-semibold">{data.title}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <strong className="text-lg">Body :</strong>
            <span className="font-semibold">{data.body}</span>
          </div>
          <div className='pt-12 flex justify-center gap-16'>
            <Link to={`/update/${data.id}`} className='bg-blue-500 px-2 py-1 text-lg font-bold'>Update</Link>
            <Link to='/' className='bg-red-500 px-2 py-1 text-lg font-bold'>Cancel</Link>
          </div>

        </div>

      </div>

    </div>

  );
};

export default memo(Read);