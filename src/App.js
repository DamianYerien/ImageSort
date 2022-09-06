import React, { useState, useEffect } from 'react';
import { arrayMoveImmutable } from 'array-move';
import SortableList from './SortableList';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput]=useState("");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
  };
 const org = input?input.input:"g,g"
   const joda = org.split(",")

   const lcds = joda.map(e => e.replace('"', ''))
   const otra = lcds.map(e => e.replace('\"', ''))
   const nueva = otra.map(e => e.trim())

  function handleInputChange(e) {
    setInput({
      input: e.target.value
    })  
}


function handleSubmit(e) {
  e.preventDefault();
  setItems(
    nueva
  )  
}

const probar = items.map(e => e.toString())
 console.log( probar)
  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)} >
      <label>Ingrese URL de las imagenes:
      <input type="text" onChange={(e) => handleInputChange(e)}   name='name' value={input} placeholder='Ingrese las images con comillas y separadas por coma'/>
      <button  type="submit">Cargar</button>
      </label>
    </form>
    <br/>
    <br/>
      {items && items.map( e =>(
        <>"{e}",<br/></>
      ))}
      <h3>Ordenar Imagenes</h3>
      <SortableList items={items} onSortEnd={onSortEnd} />
    </div>
  );
}

export default App;