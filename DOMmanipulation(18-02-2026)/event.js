/*
Event Handling in JavaScript
Event handling is a crucial aspect of web development that allows developers to create interactive and dynamic web pages. In JavaScript, events are actions or occurrences that happen in the browser, such as user interactions (clicks, keyboard input, mouse movements) or changes in the state of an element (loading, resizing).           
To handle events in JavaScript, you can use event listeners. An event listener is a function that waits for a specific event to occur on an element and then executes a block of code in response to that event. You can attach event listeners to HTML elements using methods like addEventListener or by directly assigning a function to an event property (e.g., onclick).
Here's an example of how to use event listeners in JavaScript:
// Select the button element
let button = document.getElementById("myButton");
// Attach a click event listener to the button
button.addEventListener("click", function() {
    alert("Button was clicked!");
});

In this example, we select a button element with the id "myButton" and attach a click event listener to it. When the button is clicked, an alert box will appear with the message "Button was clicked!".
You can also handle other types of events, such as keyboard events (keydown, keyup), mouse events (mouseover, mouseout), and form events (submit, change). Event listeners can be used to create various interactive features on a web page, such as dropdown menus, modal windows, form validation, and more.
*/
let button = document.querySelector("#btn");
button.addEventListener("click", function() {
    alert("Button was clicked! Thank you for clicking.");
});

//change background color of container when button is clicked
let container = document.querySelector(".container");       
button.addEventListener("click", function() {
    container.style.backgroundColor = "lightblue";
});
//change text on click
button.addEventListener("click", function() {
    button.textContent = "Clicked!";
}               
);      

    //form
    let form = document.querySelector("#myForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        alert("Form submitted!");
    });