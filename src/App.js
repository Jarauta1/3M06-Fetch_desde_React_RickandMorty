import './App.css';
import {useState, useEffect} from "react"
import {BrowserRouter,Route,Link, useParams} from "react-router-dom"

let url = "https://rickandmortyapi.com/api/character/"

function Personaje(props) {
 let {nombre} = useParams()
 console.log(nombre)
 console.log(props.data)
 for (let i=0; i < props.data.length;i++) {
   console.log(props.data)
   if (nombre = props.data[i].name) {
 return(<>
 <h1>{props.data[i].name}</h1>
<img src={props.data[i].image} width="100"/>
 <p>Sexo: {props.data[i].gender}</p>
 <p>Especie: {props.data[i].especies}</p>
 <p>Lugar: {props.data[i].location.name}</p>
 </>) 
  } else {
    return <h1>Personaje no encontrado</h1>
  }
 }
}

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
      <Link to={`/personaje/${personaje.name}`}>
      <h1>{personaje.name}</h1>
      </Link>
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
 <BrowserRouter>
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
