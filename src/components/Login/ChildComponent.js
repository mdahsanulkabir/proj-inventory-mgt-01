

function ChildComponent ({ greetHandler, greetHandler2 }) {

    return (
        <div>
            <button onClick={greetHandler}>Greet Parent</button>
            <button onClick={() => greetHandler2("Child")}>Greet Parent - with Parameter</button>
        </div>
    );
}

export default ChildComponent;