import React from 'react';
import './todo.css';
import { useState, useEffect } from 'react';

// getting the localstorage data back
const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist');

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [inputdata, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState('');
  const [toggleButton, setToggleButton] = useState(false);

  // adding the items function
  const addItem = () => {
    if (!inputdata) {
      alert('please fill the data');
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputdata };
          }
          return element;
        })
      );

      setInputData('');
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData('');
    }
  };

  // editing the items
  const editItem = (index) => {
    const item_todo_edited = items.find((element) => element.id === index);
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // deleting items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((element) => {
      return element.id !== index;
    });
    setItems(updatedItems);
  };

  // removing all the items
  const removeAll = () => {
    setItems([]);
  };

  // adding localstorage
  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <p className="title text-center mb-5">Add Your List Here 📑</p>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍  Add Item"
              className="form-control p-3 rounded-1"
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="bi bi-pencil-square fs-4" onClick={addItem}></i>
            ) : (
              <i className="bi bi-plus fs-1" onClick={addItem}></i>
            )}
          </div>

          {/* show our items */}
          <div className="showItems">
            {items.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3 className="mb-0">{item.name}</h3>
                  <div className="todo_btn">
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => editItem(item.id)}></i>
                    <i
                      className="bi bi-trash-fill"
                      onClick={() => deleteItem(item.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all buttons */}
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-primary" onClick={removeAll}>
              <span>CHECK ALL LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
