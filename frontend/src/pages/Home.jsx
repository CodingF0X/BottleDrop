import React, { useEffect } from 'react'
import ItemForm from '../State/exampleComponents/ItemForm';
import ItemList from '../State/exampleComponents/ItemList';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../State/State_Auth/authSlice';
import { getAllBars } from '../State/State_Bar/barThunk';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        if(user && user.role ==='Bartender'){
          dispatch(getAllBars())
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[dispatch,user])
  return (
    <div>
      <ItemForm />
      <ItemList/>
    </div>
  )
}

export default Home