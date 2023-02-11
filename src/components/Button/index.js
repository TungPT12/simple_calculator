import './button.css'
function Button({number, children, onclick, colorb,textColor}) {
    


    return ( 
        <>
            <button style={{backgroundColor: colorb , color: textColor}} onClick={onclick}>{number || children}</button>
        </>
     );
}

export default Button;