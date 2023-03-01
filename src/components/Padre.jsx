import { Button } from 'bootstrap'
import React, {useReducer} from 'react'
import '../index.css'


//Estado inicial
const initialState = {
    count: 0,
    countInterval: 1,
    increment: true
}

//Reducer, el cual debe cumplir con las caracteristicas de una funcion pura
const reducer = (state, action) =>{
    switch (action.type) {
        case "INCREMENT":
            return{
                ...state, //se conservan todas las variables del state, lo unico que afecta es el increment
                increment: action.increment
            }
        case "SET_INTERVAL":
            return{
                ...state,
                countInterval: parseInt(action.countInterval)
            }
        case "INCREASE_COUNT":
            return{
                ...state,
                count: state.count + state.countInterval
            }
        case "DECREASE_COUNT":
            return{
                ...state,
                count: state.count - state.countInterval
            }
        case "RESTART":
            return initialState

        default:
            return state;
    }
}



const Padre = () => {
    //Ejemplo declaracion use state
    // const [first, setFirst] = useState()
    // const [second, setSecond] = useState()
    // const [third, setThird] = useState()

    //inicio Ejemplo declaracion useReducer
    const [state, dispatch] = useReducer(reducer, initialState)
    //fin Ejemplo declaracion useReducer


    const handleIncrement = (e) => {
        const {checked} = e.target;
        dispatch( {type: "INCREMENT", increment:checked} )
    }
    const handleCountInterval = (e) => {
        const {value} = e.target;
        dispatch( {type: "SET_INTERVAL", countInterval:value} )
    }
    const handleCount = (e) => {
        if(state.increment){
            dispatch( {type:"INCREASE_COUNT"} )
        }else{
            dispatch( {type:"DECREASE_COUNT"} )
        }
    }
    const handleRestart = (e) => {
        dispatch( {type:"RESTART"} )
    }


  return (
    <div className='container main my-5 py-5'>
        <h1 className="title">{"Hook useReducer"}</h1>
        <p>{"Cuenta: " + state.count}</p>
        <div className="data">
            <input type="checkbox" id="chk" checked={state.increment} onChange={handleIncrement} />
            <label htmlFor="chk">&nbsp;{"Incrementar"}</label>
        </div>
        <br/>
        <div className="data">
            <label htmlFor="interval">{"Intervalo"}</label>
            <input type="text" id="interval" value={state.countInterval} onChange={handleCountInterval} />
        </div>
        <br />
        <button className="mx-4" onClick={handleCount}> {state.increment ? "Incrementar":"Decrementar "} </button>
        <button className="mx-4" onClick={handleRestart}>{"Reiniciar"}</button>
    </div>
  )
}

export default Padre