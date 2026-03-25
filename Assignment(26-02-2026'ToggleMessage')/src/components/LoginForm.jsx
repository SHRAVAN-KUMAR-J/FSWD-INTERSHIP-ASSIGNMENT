import react from "react";
function LoginForm(){
    const[username,setUsername]=react.useState("");
    const[password,setPassword]=react.useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Welcome ${username}!");
        console.log("Username:",username);
        console.log("Password:",password);
    };
    return(
        <div>
            <h2>Login Form</h2>     
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br/> 
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );          
}
export default LoginForm;