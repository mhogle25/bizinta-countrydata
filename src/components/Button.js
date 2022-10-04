import React from 'react';
function Button({count, setCount}) {
    return (
        <div className="Button">
            <p>
                {count}
            </p>
            <button onClick={setCount}>
                Increment
            </button>
        </div>
    );
}

export default Button;