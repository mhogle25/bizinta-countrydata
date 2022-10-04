import './App.css';
import Button from './components/Button';
import {useState, useEffect} from 'react';

const LOCAL_STORAGE_KEY = 'counterApp.count';

function App() {
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        const storedCount = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedCount !== null) setCount(storedCount);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
    }, [count]);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    This is a basic counter.
                </p>
                <Button count={count} setCount={() => setCount(count + 1)}/>
            </header>
        </div>
    );
}

export default App;
