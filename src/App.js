import React, { useState, useEffect } from "react"
function App () {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: ""
  })
const [isloading, setIsLoading] = useState(false);
const [movies, setMovies] = useState([])

useEffect(() => {
  fetchMovies();
}, [])

  //funzione che aggiunge il task. Richiamo setTasks e passo
  //come param prev che é l'array contente i task precedenti(?) e ritorna l'array con prev "spreaddato" + il currentTask aggiunto alla fine 
  const addTask = () =>{
    setTasks((prev) => {
      return [...prev, currentTask];
    })
  }
  const deleteTask = (index) =>{
    setTasks((prev) => prev.filter((_, idx) => index !== idx));
  }
  const fetchMovies = () =>{
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/")
    .then(res=>
    res.json()
    )
    .then((json) => {
      setMovies(json.results)
    })
    .catch(err => console.log(err))
    .finally(setIsLoading(false))
  }
  return (
    <div>
       {movies.map((el) => (
        <>
        <ul>
          <li>
          <h1>{el.title}</h1>
          <h2>{el.director}</h2>
          <h3>{el.release_date}</h3>
          </li>
          </ul>
        </>
      ))}

      <Task
      value={currentTask.title} 
      onChange={(val) =>
         setCurrentTask((prev) =>
         ({
        ...prev,
        title: val
      })
      )}
      />
      <Task
      value={currentTask.description} 
      onChange={(val) =>
         setCurrentTask((prev) =>
         ({
        ...prev,
        description: val
      })
      )}
      />
      <button
      onClick={() => addTask()}>Add a Task</button>

      <TaskList
       el={tasks}
       removeTask={(index) => deleteTask(index)}
      />
    </div>
  );
}

//Questo è il componente che andrà a contenere i task aggiunti alla lista
//prende come param un obj con due elementi "value" e "onChange"(func in cui salvo l'onchange dell'input
const Task = ({value, onChange }) => (
  <input 
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  >
  </input>
);
const TaskList = ({el, removeTask}) =>(
  <>
   <h1>Things to do: {el.length}</h1>
   {
     el.map((el, i) => ( 
       <div>
        <h1>
          {el.title}
        </h1>
        <h2>
        {el.description}
      </h2>
      <button
      onClick={()=> removeTask(i)}
      >
        Done
      </button>
      </div>
     ))
   }
  </>
)


export default App;
