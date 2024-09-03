import { ACTIONS } from './App'

export default function Buttons({dispatch, digit}) {
    return <button onClick={() => dispatch( {type: ACTIONS.ADD_DIG, peremeter: {digit}})}>{digit}</button>
}