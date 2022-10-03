import React from 'react';
function Button({setCount}) {
    return (
        <div className="Button">
            <button onClick={setCount}>
                Increment
            </button>
        </div>
    );
}

export default Button;