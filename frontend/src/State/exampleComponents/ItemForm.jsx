import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addItem } from '../itemsSlice'
const ItemForm = () => {
    const [name,setName] = useState()
    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name){
            dispatch(addItem({id:Date.now(),name}))
            setName('')
        }
    }
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter item name"
    />
    <button type="submit">Add Item</button>
  </form>
  )
}

export default ItemForm