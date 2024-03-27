import React, { useMemo } from 'react';
import './button.css';

const Button = ({
    shape='rect', // (string) 'rect', 'square'. This could be improved later with dynamic sizes like the banner
    styleType='default', // (string) 'default', 'warning'
    disabled=false,
    children,
    ...rest
}) => {
    return (
        <button 
            className={`btn btn-${shape} btn-${shape}-${styleType}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button;