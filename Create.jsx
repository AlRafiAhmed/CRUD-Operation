import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [values, setValues] = useState({
    id: '',
    title: '',
    body: ''
  })
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/Users', values)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    navigate('/')
    const isEmpty = Object.values(values).some(
      value => value.toString().trim() === ""
    );

    if (isEmpty) {
      alert("You Must put every input!");
      return;
    }
  }
  return (
    <div className='p-20'>
      <h2 className='flex justify-center py-8 text-4xl font-black'>Create a New User</h2>
      <div className='flex justify-center'>
        <form className='border-2 p-6' onSubmit={handleSubmit}>
          <div className='py-4 '>
            <label htmlFor="id" className='pr-8 text-2xl font-bold'>ID:</label>
            <input type="number" placeholder='Enter the ID' className='p-1 border-2'
              onChange={e => setValues({ ...values, id: e.target.value })} />
          </div>
          <div className='py-4'>
            <label htmlFor="title" className='pr-4 text-2xl font-bold'>Title:</label>
            <input type="text" placeholder='Ente the Title' className='p-1 border-2'
              onChange={e => setValues({ ...values, title: e.target.value })} />
          </div>
          <div className='py-4  '>
            <label htmlFor="body" className='pr-4 text-2xl font-bold'>Body:</label>
            <input type="text" placeholder='Enter the Body' className='p-1 border-2'
              onChange={e => setValues({ ...values, body: e.target.value })} />
          </div>
          <div className='flex justify-center gap-16 py-5'>
            <button className='rounded-xl bg-blue-300 px-3 py-1 font-bold text-sm'>Submit</button>
            <Link to='/' className='rounded-xl bg-blue-300 px-3 py-1  font-bold text-sm'>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Create);