import { forwardRef } from "react";

const Button = forwardRef((props, ref) => (

    <button type={props.type || 'button'} ref={ref} onClick={props.onClick}
        disabled={props.disabled}
        className={`text-white font-bold   flex items-center justify-center
                    px-2 py-2 text-xs    md:px-6 md:py-3 md:text-sm tracking-wider
                    rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 
                    ${props.className}
                    ${props.disabled ? `opacity-5` : ''}
                   `}>

        {props.children}
    </button>
));
export default Button