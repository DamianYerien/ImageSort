import React, { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import SortableList from './SortableList';
import style from "./App.module.css"


function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
  };
  const entry = input ? input.input : "";
  const entryArr = entry.split(",");
  const entryClean = entryArr.map(e => e.replace('[', '').replace(']', '').replace('"', '').replace('\"', ''));

  const finalEntry = entryClean.map(e => e.trim());

  function handleInputChange(e) {
    setInput({
      input: e.target.value
    })
  }

  function handleDelete(e) {
    console.log(items[e.target.id])
    const filt = items[e.target.id]
    const res = items.filter(e => e !== filt)
    setItems(res)
    console.log(res)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setItems(
      finalEntry
    )
  }

  function handleReset(e) {
    e.preventDefault();
    setItems([])
    setInput({input: ""})
  }


  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)} >
        <label>Ingrese URL de las imagenes:
          <textarea className={style.input} type="text" onChange={(e) => handleInputChange(e)} name='name' value={input.input} placeholder='Ingrese las imágenes con comillas y separadas por coma' />
          <button type="submit" className={style.inputcargar}>Cargar</button>
          <button onClick={(e) => handleReset(e)} className={style.inputreset}>Reset</button>
        </label>
      </form>
      <br />
      <br />
      <h2>Resultado</h2>
      <div className={style.copy}>

        {items && items.map((e, index) => (
          <div key={index} className={style.main}>
            <div className={style.idx}>
              {index + 1}
            </div>
            {index === 0 ? <div className={style.url}>["{e}",<br /></div>
              : index === items.length - 1 ? <div className={style.url}>"{e}"]<br /></div>
                : <div className={style.url}>"{e}",<br /></div>}
          </div>
        ))}
      </div>
      <br />
      <br />
      <h2>Ordenar Imagenes</h2>
      <SortableList items={items} onSortEnd={onSortEnd} handleDelete={handleDelete} />
    </div>
  );
}

export default App;