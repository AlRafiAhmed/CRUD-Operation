import { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Update = () => {
  // const [data, setData] = useState({})
    const[values,setValues]=useState({
    id:'',
    title:'',
    body:''
  })
  const navigate =useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3000/Users/${id}`)
      .then(res =>{
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id])
  const handleUpdate=(event)=>{
    event.preventDefault();
    axios.put('http://localhost:3000/Users/' + id,values)
     .then(res => {console.log(res);
     })
     .catch(err => console.log(err));
     navigate('/')
  }
  return (
    <div className='p-20' >
      <h2 className='flex justify-center py-8 text-4xl font-black'>Update User</h2>
      <div className='flex justify-center'>
        <form onSubmit={handleUpdate} className='border-2 p-6' >
          <div className='py-4 '>
            <label htmlFor="id" className='pr-8 text-2xl font-bold'>ID:</label>
            <input type="number" className='p-1 border-2' value={values.id} 
            onChange={e=> setValues({...values,id: e.target.value})} />
          </div>
          <div className='py-4'>
            <label htmlFor="title" className='pr-4 text-2xl font-bold'>Title:</label>
            <input type="text" className='p-1 border-2' value={values.title} 
            onChange={e=> setValues({...values,title: e.target.value})} />
          </div>
          <div className='py-4  '>
            <label htmlFor="body" className='pr-4 text-2xl font-bold'>Body:</label>
            <input type="text" className='p-1 border-2' value={values.body} 
            onChange={e=> setValues({...values,body: e.target.value})}/>
          </div>
          <div className='flex justify-center gap-16 py-5'>
            <button className='rounded-xl bg-blue-300 px-3 py-1 font-bold text-sm'>Update</button>
            <Link to='/' className='rounded-xl bg-blue-300 px-3 py-1  font-bold text-sm'>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Update);