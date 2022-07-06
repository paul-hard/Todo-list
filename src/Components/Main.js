import Input from "./Input"
import { useState, useEffect } from "react"


export default function Main() {

    const [userInput, setUserInput] = useState("")
    const [todos, setTodos] = useState([])
    const [isChecked, setIsChecked] = useState(null)
    const [rewards, setRewads] = useState([]);


    let doneClass = "done";
    let undoneClass = "undone";

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (isChecked) {
            setRewads([...rewards, {
                input: userInput,
                isTaken: false,
            }])
        } else {
            setTodos([...todos, {
                input: userInput,
                isDone: false,
            }])
        }
        setUserInput("");
    }

    useEffect(() => {
        console.log("work")
    }, [rewards, todos])

    const handleInputChange = (e) => {
        setUserInput(e.target.value)

    }

    const handleDeleteClick = (e) => {
        const inp = e.target.getAttribute("name");
        const remove = todos.filter(todo => todo.input !== inp);
        setTodos(remove)
    }
    const handleDoneClick = (e) => {
        const doneStatus = todos.map(todo => {
            if (todo.input === e && todo.isDone === false) {
                return { ...todo, isDone: true }
            } else if (todo.input === e && todo.isDone === true) {
                return { ...todo, isDone: false }
            }
            return todo
        })
        setTodos(doneStatus)
    }
    const handleTakeClick = (e) => {
        const takenStatus = rewards.map(reward => {
            if (reward.input === e && reward.isTaken === false) {
                return { ...reward, isTaken: true }
            } else if (reward.input === e && reward.isTaken === true) {
                return { ...reward, isTaken: false }
            }
            return reward
        })
        setRewads(takenStatus)
    }
    const handleDeleteRewardClick = (e) => {
        const removedReward = rewards.filter(reward => reward.input !== e)
        setRewads(removedReward)
    }
    const onCheckboxChange = () => {
        setIsChecked(true)
        if (isChecked === true) {
            setIsChecked(null)
        }
    }

    return (
        <main className="main">
            <Input userInput={userInput} todos={todos} isChecked={isChecked} onFormSubmit={handleSubmitForm} onInputChange={handleInputChange} />
            <div className="list-page">
                <div className="list-wrapper">
                    <div className="horizontal"><h4>todo's</h4><input type="checkbox" onChange={onCheckboxChange}></input><h4>reward's</h4></div>
                    <div className="horizontal-lists">
                        <div className="todo-list-wrapper">
                            <ul className="todo-list">
                                {todos.map((todo, i) =>
                                    <li key={i} className={todo.isDone ? doneClass : undoneClass}> {todo.input}  <button className="btn-remove" name={todo.input} onClick={handleDeleteClick}>X</button>
                                        <button className="btn-done" onClick={() => handleDoneClick(todo.input)}>Done</button></li>
                                )}
                            </ul>
                        </div>
                        <div className="reward-list-wrapper">
                            <ul className="reward-list">
                                {rewards.map((reward, i) => <li key={i} className={reward.isTaken ? doneClass : undoneClass}>{reward.input} <button className="btn-remove" onClick={() => handleDeleteRewardClick(reward.input)}>X</button>
                                    <button onClick={() => handleTakeClick(reward.input)}>Take</button></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

//className={done === i ? doneClass : undoneClass}
// if (done === e) {
//     setDone(null)
// }