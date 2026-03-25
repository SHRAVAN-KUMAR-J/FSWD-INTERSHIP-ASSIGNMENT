import react from "react";
function ToggleMessage(){
    const[isvisible,setIsVisible]=react.useState(false);
    return(
        <div>
            <button onClick={()=>setIsVisible(!isvisible)}>Toggle Message</button>
            {isvisible && <p>This is a toggled message!</p>}
        </div>
    );          
}       
export default ToggleMessage;