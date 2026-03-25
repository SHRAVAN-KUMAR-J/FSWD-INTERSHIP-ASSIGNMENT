// ========================================
// ARRAYS PRACTICE
// ========================================

console.log("===== ARRAYS =====");

let numbers = [1, 2, 3, 4, 5];

// Access elements
console.log("First element:", numbers[0]);

// Add elements
numbers.push(6);
console.log("After push:", numbers);

// Remove last element
numbers.pop();
console.log("After pop:", numbers);

// Loop using forEach
numbers.forEach((num) => {
  console.log("Number:", num);
});

// map() - Double numbers
let doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);

// filter() - Even numbers
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even Numbers:", evenNumbers);

// reduce() - Sum of array
let sum = numbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);


// ========================================
// OBJECTS PRACTICE
// ========================================

console.log("\n===== OBJECTS =====");

let student = {
  name: "Shravan",
  age: 21,
  course: "Full Stack",
  marks: [80, 85, 90]
};

// Access properties
console.log("Name:", student.name);
console.log("Course:", student["course"]);

// Add new property
student.city = "Mangalore";
console.log("Updated Student:", student);

// Object methods
console.log("Keys:", Object.keys(student));
console.log("Values:", Object.values(student));
console.log("Entries:", Object.entries(student));

// Calculate total marks
let totalMarks = student.marks.reduce((total, mark) => total + mark, 0);
console.log("Total Marks:", totalMarks);


// ========================================
// STRING METHODS
// ========================================

console.log("\n===== STRING METHODS =====");

let text = "  JavaScript Practice  ";

console.log("Uppercase:", text.toUpperCase());
console.log("Lowercase:", text.toLowerCase());
console.log("Trimmed:", text.trim());
console.log("Includes 'Script':", text.includes("Script"));
console.log("Split:", text.trim().split(" "));


// ========================================
// PROBLEM SOLVING PRACTICE
// ========================================

console.log("\n===== PROBLEM SOLVING =====");

// 1️⃣ Reverse an array
function reverseArray(arr) {
  return arr.reverse();
}
console.log("Reversed:", reverseArray([1, 2, 3, 4]));

// 2️⃣ Find largest number
function findMax(arr) {
  return Math.max(...arr);
}
console.log("Largest:", findMax([10, 25, 5, 40]));

// 3️⃣ Remove duplicates
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
console.log("Unique:", removeDuplicates([1, 2, 2, 3, 4, 4]));

// 4️⃣ Count vowels in string
function countVowels(str) {
  let vowels = "aeiouAEIOU";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}
console.log("Vowels:", countVowels("JavaScript"));

// 5️⃣ Check palindrome
function isPalindrome(str) {
  let reversed = str.split("").reverse().join("");
  return str === reversed;
}
console.log("Is Palindrome (madam):", isPalindrome("madam"));
