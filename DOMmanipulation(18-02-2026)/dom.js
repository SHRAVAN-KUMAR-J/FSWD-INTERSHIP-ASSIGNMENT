/*
Dom -Document Object Model
The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document as a tree of objects, allowing developers to manipulate and interact with the content and structure of a webpage dynamically. The DOM provides a way to access and modify elements, attributes, and styles of a webpage using programming languages like JavaScript.
The DOM allows developers to:
1. Access and modify HTML   
    elements: You can select and manipulate HTML elements using methods like getElementById, getElementsByClassName, or querySelector.

2. Change content: You can change the text content of an element using properties like innerText or innerHTML.

3. Modify attributes: You can change the attributes of an element using methods like setAttribute or directly modifying properties. 
4. Handle events: You can attach event listeners to elements to respond to user interactions, such as clicks or keyboard input.
5. Create and remove
    elements: You can create new elements and add them to the DOM or remove existing elements from the DOM.
Overall, the DOM is a crucial part of web development, enabling developers to create dynamic and interactive web pages by manipulating the structure and content of the document.*/


//select by id 
let heading = document.getElementById("title");
console.log(heading);
//select by class 
let paragraph = document.getElementsByClassName("desc");
console.log(paragraph[0]);
//modern method
let head= document.querySelector("#title");
console.log(head);
let para = document.querySelector(".desc");
console.log(para);  

//changing the content

heading.textContent = "Hello, DOM!";
paragraph.innerText = "This is a new description.";

//changing style
heading.style.color = "blue";
heading.style.backgroundColor = "red";
heading.style.fontSize = "24px";
paragraph.style.fontSize = "18px";  

//creating new element
let newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph created using JavaScript.";
document.body.appendChild(newParagraph);
//removing element  
newParagraph.remove();


//TASK 
//1.Change the button text to Submit
let button = document.getElementById("btn");
button.textContent = "Submit";


//2.Add a new list item to an unordered list with the id "myList".
let myList = document.getElementById("myList");
let newItem = document.createElement("li");
newItem.textContent = "New List Item";
myList.appendChild(newItem);

//3.Change the background color of a div with the class "container" to lightblue when a button is clicked.
let container = document.querySelector(".container");
button.addEventListener("click", function() {
    container.style.backgroundColor = "lightblue";
});