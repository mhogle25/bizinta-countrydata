import './App.css';
import Button from './components/Button';
import {useState} from "react";

function App() {
    const [ count, setCount ] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    This is a basic counter.
                </p>
                <p>
                    {count}
                </p>
                <Button setCount={() => setCount(count + 1)}/>
            </header>
        </div>
    );
}

export default App;
