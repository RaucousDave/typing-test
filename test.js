// Fires during the process of a webpage being rendered
// Similar to a useEffect function in React
window.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome");
});

// Triggered by a button or element being clicked
window.addEventListener("click", () => {
  console.log("Button or element clicked");
});

// This fires when a key is pressed down
window.addEventListener("keydown", (e) => {
  // stores the value of the key pressed
  const value = e.target.value;

  console.log(`${value} was typed ins`);
});

// Only works when a character producing key is pressed,i.e doesn't work for backspace and characters as such
window.addEventListener("keypress", (e) => {
  const value = e.target.value;

  console.log(`${value} was typed ins`);
});

// This fires when a key is released
window.addEventListener("keyup  ", (e) => {
  const value = e.target.value;

  console.log(`${value} was typed ins`);
});

// This is usually for input fields, it fires whenever a new character is pressed in an input field
window.addEventListener("change", (e) => {
  // stores the value that was newly typed in the input field
  const value = e.target.value;
});
