import React, { useState } from 'react';
import Backbutton from '../components/Backbutton';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Deletebook = () => {
  const[loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeletebook = ()=>{
    setLoading(true);
    axios
    .delete(
      // `http://localhost:1333/books/${id}`
      `https://bookmanagement-back.onrender.com/books/${id}`
    )
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
      navigate('/');
    }).catch((error)=>{
      // alert("An error occured ! Please check console")
      enqueueSnackbar('Error', { variant: 'error' });

      console.log(error);
    })

  };
  return (
    <div className='p-4 bg-red-300'>
      <Backbutton/>  
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Loader/> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <div className="text-2xl">
          Are you sure you want to delete this book? 
        </div>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeletebook}> Yes, Delete it </button>
      </div>
    </div>
  )
}
export default Deletebook