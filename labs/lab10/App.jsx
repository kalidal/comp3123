/**
 * Purpose: define the top level compnent where we will lare be able to 
 * injecto other class and func comppnenets
 */

import {useState} from "react"
import Student from "./Student"
//later import your class and functional components here to inject into app

function App(){
    const [showStudent, setShowStudent] = useState(true)

    //tis return in APP functional compnet from implicit render(), we simply dont write it ehre
    return(
        <article>   
            <h1>Week 10 -React Events and Lifecyle   </h1>
            <button onClick={()=> setShowStudent(!showStudent)}>
               {showStudent ? "Hide" : "Show"} Student
            </button>

            {showStudent && <Student studentId={1111111} />}      
              </article>
    )
}


export default App