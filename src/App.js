import React, { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import SortableList from './SortableList';
import style from "./App.module.css"
import swal from 'sweetalert';



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
    setInput({ input: "" })
  }
  function copiarAlPortapapeles() {
    var enlace = document.getElementById("enlace");
    var inputFalso = document.createElement("input");
    inputFalso.setAttribute("value", enlace.innerHTML);
    document.body.appendChild(inputFalso);
    inputFalso.select();
    document.execCommand("copy");
    document.body.removeChild(inputFalso);
    //alert("Copiado al portapapeles!");
    swal({
      title: 'Copiado al portapapeles',
      text: ':)',
      icon: 'success',
      timer: 1300,
      buttons: false,
  })

  
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
      <div className={style.title}>
        <h2>Resultado</h2>
        <button className={style.copybtn} onClick={(e) => copiarAlPortapapeles(e)}>Copiar</button>
      </div>
      <div className={style.links}>
      <div>
        {items && items.map((e, index) => (
          <div>{index+1}</div>
        ))}
      </div>
      <div id="enlace" className={style.copy}>

        {items && items.map((e, index) => (

          index === 0 ? `["${e}",\n` : index === items.length - 1 ? `"${e}"]` : `"${e}",\n`

        ))}
      </div>
      </div>
      <br />
      <br />
      <h2>Ordenar Imagenes</h2>
      <SortableList items={items} onSortEnd={onSortEnd} handleDelete={handleDelete} />
    </div>
  );
}

export default App;