import './App.css';
import {useState, useEffect} from "react"
import {BrowserRouter,Route,Link, useParams} from "react-router-dom"

function Personaje(props) {
 let {nombre} = useParams()
 for (let i=0; i < props.data.length;i++) {
   if (nombre === props.data[i].name) {
      return(<>
        <h1>{props.data[i].name}</h1>
        <img src={props.data[i].image} width="100"/>
        <p>Sexo: {props.data[i].gender}</p>
        <p>Especie: {props.data[i].species}</p>
        <p>Lugar: {props.data[i].location.name}</p>
      </>) 
    } 
    
  }
  return <h1>Personaje no encontrado</h1>
}

function App() {
  let [url,setUrl] = useState("https://rickandmortyapi.com/api/character/")
  let [data,setData] = useState([])
  let [page,setPage] = useState([])
  let [isLoading,setIsloading] = useState(false)
  let [num,setNum] = useState(0)

  useEffect(function(){
    setIsloading(true)
    fetch(url).then(respuesta=>respuesta.json()).then(datos=>{
      setData(datos.results)
      setPage(datos.info)
      setIsloading(false)
    })
  },[num])
  
  let mostrarPersonajes = data.map(personaje => {
    return(<div>
      <Link to={`/personaje/${personaje.name}`}>
      <h1>{personaje.name}</h1>
      </Link>
      <img src={personaje.image} width="100"/>
    </div>)
  })

  function anterior() {
    if (page.prev != null) {
    setUrl(page.prev)
    setNum(num-1)}
  }
  function siguiente() {
    if (page.next != null) {
    setUrl(page.next)
    setNum(num+1)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else {
  return (<>
 <BrowserRouter>
    <Link to="/">Cerrar</Link>
    <Route exact path="/"></Route>
    <Route exact path="/personaje/:nombre">
      <Personaje data={data}/>
    </Route>
   <button onClick={anterior}>Anterior</button>
   <button onClick={siguiente}>Siguiente</button>
   {mostrarPersonajes}
 </BrowserRouter>
  </>);
  }
}

export default App;
