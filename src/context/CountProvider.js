import { useState } from 'react';
import CountContext from './CountContext';

const CountProvider = (props) => {
    const [count, setCount] = useState(0);

    return (
        <CountContext.Provider value={{ count, setCount }}>
            {props.children}
        </CountContext.Provider>
    );
};

export default CountProvider;