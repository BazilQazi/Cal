import { useReducer } from "react"
import Buttons from "./Buttons"
import OperationButton from "./OperationButton"
import "./style.css"
import { type } from "@testing-library/user-event/dist/type"

export const ACTIONS = {
  CHOOSE_OPERATOR: 'choose',
  ADD_DIG: 'add-digit',
  CLEAR: 'clear',
  EQUAL: 'equalsto',
  DEL: 'delete-digit'
}

function reducer(state, {type, peremeter}) {
  switch(type) {
    case ACTIONS.ADD_DIG:
      if(state.overwrite) {
        return {
          ...state,
          currentData: peremeter.digit,
          overwrite: false,
        }
      }
      if(peremeter.digit === "0" && state.currentData === "0") {return state}
      if(peremeter.digit === "." && state.currentData.includes(".")) {return state}
      
      return {
        ...state,
        currentData: `${currentData || ""}${peremeter.digit}`
      }
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.DEL:
      if(state.overwrite) {return {

        ...state,
        overwrite: false,
        currentData: null
      }}
      if(state.currentData == null) return state
      if(state.currentData.length === 1) { return  {
        ...state,
        currentData: null
      }}
      return {
        ...state,
        currentData: state.currentData.slice(0, -1)
      }

    case ACTIONS.CHOOSE_OPERATOR:
      if(state.currentData == null && state.previousData == null) {return state}
      if(state.currentData = null) {
        return {
          ...state,
          operation: peremeter.operation,
        }
      }
      if(state.previousData == null) {
        return {
          ...state,
          operation: peremeter.operation,
          previousData: state.currentData,
          currentData: null,
        }
      }
      return {
        ...state,
        previousData: evaluate(state),
        operation: peremeter.operation,
        currentData: null
      }

    case ACTIONS.EQUAL:
      if(state.operation == null || state.currentData == null || state.previousData == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousData: null,
        operation: null,
        currentData: evaluate(state),
      }
  }
}

function evaluate({currentData, previousData, operation}) {
  const prev = parseFloat(previousData)
  const curr = parseFloat(currentData)
  if (isNaN(prev) || isNaN(curr)) return ""

  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
  }

  return computation.toString()

}

function App() {
  const [{currentData, previousData, operation}, dispatch] =useReducer(reducer, {})

  return (
    <div className="calculator_grid">
      <div className="output">
        <div className="previous_data"> {previousData} {operation}</div>
        <div className="current_data"> {currentData}</div>
      </div>
      <button className="func" onClick={() => dispatch({type: ACTIONS.CLEAR})}>
        AC
      </button>
      <button onClick={() => dispatch({type: ACTIONS.DEL})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}></OperationButton>
      <Buttons digit="1" dispatch={dispatch}></Buttons>
      <Buttons digit="2" dispatch={dispatch}></Buttons>
      <Buttons digit="3" dispatch={dispatch}></Buttons>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <Buttons digit="4" dispatch={dispatch}></Buttons>
      <Buttons digit="5" dispatch={dispatch}></Buttons>
      <Buttons digit="6" dispatch={dispatch}></Buttons>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <Buttons digit="7" dispatch={dispatch}></Buttons>
      <Buttons digit="8" dispatch={dispatch}></Buttons>
      <Buttons digit="9" dispatch={dispatch}></Buttons>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <Buttons digit="." dispatch={dispatch}></Buttons>
      <Buttons digit="0" dispatch={dispatch}></Buttons>
      <button className="func" onClick={() => dispatch({type: ACTIONS.EQUAL})}>=</button>
    </div>
  );
}

export default App;
