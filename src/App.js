import './App.css';
import {useState, useEffect} from "react"

let url = "https://rickandmortyapi.com/api/character/"

function App() {

  let [data,setData] = useState([])
  let [page,setPage] = useState([])
  let [isLoading,setIsloading] = useState(false)
  let [num,setNum] = useState(0)

  useEffect(function(){
    setIsloading(true)
    fetch(url).then(respuesta=>respuesta.json()).then(datos=>{
console.log(datos)
      setData(datos.results)
      setPage(datos.info)
      setIsloading(false)
    })
  },[num])
  
  let mostrarPersonajes = data.map(personaje => {
    return(<div>
      <h1>{personaje.name}</h1>
      <img src={personaje.image} width="100"/>
    </div>)
  })

  function anterior() {
    if (page.prev != null) {
    url = page.prev
    setNum(num-1)}
  }
  function siguiente() {
    if (page.next != null) {
    url = page.next
    setNum(num+1)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else {
  return (<>
 <div>
   <button onClick={anterior}>Anterior</button>
   <button onClick={siguiente}>Siguiente</button>
   {mostrarPersonajes}
 </div>
  </>);
  }
}

export default App;
