function validateUser() {

    let user = document.getElementById("username").value;  
    const correctUser = "admin";

    console.log("Entered Username:", user);

    if (user === correctUser) {   
        alert("Login Successful!");
    } else {
        alert("Invalid Username!");
    }

    // Example of == and === difference
    let x = 10;
    let y = "10";

    console.log(x == y);   
    console.log(x === y);  
}
