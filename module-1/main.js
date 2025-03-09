const input1 = document.querySelector(".input"); // Corrected from 'display' to 'input1'
console.log(input1);
const button = document.querySelectorAll(".button");
console.log(button);
const display = document.querySelector(".input1");
console.log(display);

document.addEventListener('keypress', function (event) {
    const key = event.key; // Get the key pressed
    

    if (!display) return; // Safety check to avoid errors

    // Allowed number keys (0-9) and basic operators
    const allowedKeys = "0123456789+-*/.=BackspaceEnterCc";

    if (allowedKeys.includes(key)) {
        event.preventDefault(); // Prevent unwanted browser actions (like Enter submitting a form)

        // Handle numbers and operators
        if (/[0-9+\-*/.]/.test(key)) {
            display.value += key;
        }

        // Handle Backspace (delete last character)
        if (key === "Backspace") {
            display.value = display.value.slice(0, -1);
        }
        if (key === "C" || key === "c") {
            display.value = '';
        }

        // Handle Enter (= key)
        if (key === "Enter" || key === "=") {
            try {
                display.value = eval(display.value); // Evaluate the expression
            } catch (error) {
                display.value = "Error"; // Show error if invalid expression
            }
        }
    }
});


function evaluateExpression(expression) {
    // Trim any spaces
    expression = expression.trim();

    // Check for consecutive operators
    let operators = ["+", "-", "*", "/", "÷", "x"];
    for (let i = 0; i < expression.length - 1; i++) {
        if (operators.includes(expression[i]) && operators.includes(expression[i + 1])) {
            return "Syntax Error: Consecutive operators";
        }
    }

    // Check for division by zero
    if (expression.includes("/0") || expression.includes("÷0")) {
        return "Math Error: Division by zero";
    }

    try {
        // Replace "x" and "÷" with "*" and "/"
        expression = expression.replace(/x/g, "*").replace(/÷/g, "/");

        // Evaluate the expression safely
        let result = eval(expression);

        // Check if result is finite
        if (!isFinite(result)) {
            return "Math Error: Invalid computation";
        }

        return result;
    } catch (error) {
        return "Syntax Error: Invalid input";
    }
}


button.forEach(btn => {
    btn.addEventListener("click", () => {
        const btnValue = btn.innerText.trim(); // Trim to avoid spacing issues
        switch (btnValue)
        {
            case 'AC':
                display.value = '';
                break;
            case '⌫':
                display.value = display.value.slice(0,-1);
                break;
            case '=' :
                try {
                    display.value = evaluateExpression(display.value);
                }
                catch {
                    display.value = 'Error';
                }
                break;
            default :
                display.value+= btnValue;  
                
        }
        
    });
});



document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (isValidKey(key)) {
        handleInput(formatKey(key)); 
        event.preventDefault(); // Prevents unintended browser actions
    }
});

function handleInput(input1Value) {
    try {
        if (input1Value === "AC") {
            input1.value = ""; // Clear the screen
        } else if (input1Value === "=") {
            if (isValidExpression(input1.value)) {
                input1.value = eval(input1.value.replace(/×/g, '*').replace(/÷/g, '/'));
            } else {
                input1.value = "Error";
            }
        } else if (input1Value === "⌫") {
            input1.value = input1.value.slice(0, -1); // Backspace
        } else {
            if (isValidAppend(input1.value, input1Value)) {
                input1.value += input1Value;
            }
        }
    } catch (error) {
        input1.value = "Error";
    }
}


