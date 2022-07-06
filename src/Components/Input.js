
export default function Input(props) {

    const { onFormSubmit, onInputChange, isChecked } = props;

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder={isChecked ? "Reward yourself" : "Wahat to do?"} value={props.userInput} onChange={onInputChange}></input>
                <input type="submit" value="Add" />
            </form>
        </>
    )
}