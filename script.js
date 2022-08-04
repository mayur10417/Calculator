// Function for taking input from buttons...
function input(value) {
  equation.innerHTML = equation.innerHTML + value;
}

// Function for clearing all the values from Calculator display...
function allClear() {
  answer.innerHTML = "";
  equation.innerHTML = "";
}

// Function for deleting last value from Calculator display...
function del(exp) {
  let updatedExpression = exp.substr(0, exp.length - 1);
  equation.innerHTML = updatedExpression;
}

// Function for finding resin value...
function resin(value) {
  return value * 392.9;
}

// Function for Evaluating the equation...
function resultant(equation) {
  let equationElement = equation.split("");
  let result;
  let finalEquation;

  // Loop to fetch values...
  for (let i = 0; i < equationElement.length; i++) {
    const element = equationElement[i];

    // If Else statement for error handling for parenthesis problem...
    if (element == "(" && i > 0) {
      if (
        equationElement[i - 1] == "+" ||
        equationElement[i - 1] == "-" ||
        equationElement[i - 1] == "*" ||
        equationElement[i - 1] == "/" ||
        equationElement[i - 1] == "(" ||
        equationElement[i - 1] == "*(" ||
        equationElement[i - 3] == "s" ||
        equationElement[i - 3] == "t" ||
        equationElement[i - 3] == "c" ||
        equationElement[i - 3] == "*s" ||
        equationElement[i - 3] == "*c" ||
        equationElement[i - 3] == "*t"
      ) {
        continue;
      } else {
        equationElement[i] = "*(";
      }
    }

    // If Else statement for error handling for parenthesis problem...
    if (element == ")" && i < equationElement.length - 1) {
      if (
        equationElement[i + 1] == "+" ||
        equationElement[i + 1] == "-" ||
        equationElement[i + 1] == "*" ||
        equationElement[i + 1] == "/" ||
        equationElement[i + 1] == "(" ||
        equationElement[i + 1] == ")"
      ) {
        continue;
      } else {
        equationElement[i] = ")*";
      }
    }

    // If Else statement for error handling for sin, cos, tan...
    if ((element == "s" || element == "c" || element == "t") && i > 0) {
      if (
        equationElement[i - 1] == "+" ||
        equationElement[i - 1] == "-" ||
        equationElement[i - 1] == "*" ||
        equationElement[i - 1] == "/" ||
        equationElement[i - 1] == "*(" ||
        equationElement[i - 1] == "("
      ) {
        continue;
      } else {
        if (
          element == "s" &&
          equationElement[i - 1] != "o" &&
          equationElement[i - 2] != "r"
        ) {
          equationElement[i] = "*s";
        } else if (element == "c") {
          equationElement[i] = "*c";
        } else if (element == "t") {
          equationElement[i] = "*t";
        }
      }
    }
  }

  // Degree to Radian conversion for sin, cos, tan...
  if (degreeCheck.checked) {
    finalEquation = equationElement
      .join("")
      .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
      .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
      .replace(/tan\(/g, "Math.tan((Math.PI/180)*")
      .replace(/π/g, "Math.PI")
      .replace(/reMath.sin\(\(Math.PI\/180\)\*/g, "resin(");
  } else {
    finalEquation = equationElement
      .join("")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/π/g, "3.14159")
      .replace(/reMath.sin/g, "resin");
  }

  // Error handling and showing error in display...
  try {
    result = eval(finalEquation);
    answer.innerHTML = result.toFixed(5);
    console.log(finalEquation);
  } catch (error) {
    console.log(finalEquation);
    document.getElementById("answer").innerHTML =
      "Error- Please enter a proper input";
  }
}
