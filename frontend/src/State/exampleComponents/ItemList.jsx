import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItem } from '../itemsSlice';

const ItemList = () => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdate = (id) => {
    const newName = prompt('Enter new item name:');
    if (newName) {
      dispatch(updateItem({ id, newName }));
    }
  };

  return (
    <ul>
      {items && items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleUpdate(item.id)}>Update</button>
          <button onClick={() => handleRemove(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
