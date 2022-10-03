import React, { useState } from "react";

function Button() {
    const [ count, setCount ] = useState(0);

    return (
        <div className="Button">
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default Button;