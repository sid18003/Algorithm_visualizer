var animation = [];
const Bracket_Value = { "(": 1, "{": 2, "[": 3, ")": -1, "}": -2, "]": -3 };

const isdigit = (char) => {
  var ascii = char.charCodeAt(0);
  if (ascii >= 48 && ascii <= 57) {
    return true;
  }
  return false;
};

const Solve_small_equation = (equation) => {
  const orderOfOperations = ["^", "/", "*", "+", "-"];
  for (let i = 0; i < orderOfOperations.length; i++) {
    const operator = orderOfOperations[i];
    const regex = new RegExp(`(-?\\d*\\.?\\d+)\\${operator}(-?\\d*\\.?\\d+)`);
    while (regex.test(equation)) {
      if (equation[0] == "+") equation = equation.substring(1);
      animation.push(equation);
      const match = equation.match(regex);
      const num1 = parseFloat(match[1]);
      const num2 = parseFloat(match[2]);
      let result;
      switch (operator) {
        case "^":
          result = Math.pow(num1, num2);
          break;
        case "/":
          result = num1 / num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
      }
      if ((operator == "+" || operator == "-") && result > 0)
        result = "+" + result;
      equation = equation.replace(regex, result);
    }
  }
  if (equation[0] == "+") equation = equation.substring(1);
  return equation;
};

export const solveEquation = (equation) => {
  animation = [];
  var stack = [];
  var newEquaton = "";
  for (var i = 0; i < equation.length; i++) {
    if (equation[i] == " ") continue;
    if (equation[i] == "(" || equation[i] == "{" || equation[i] == "[") {
      if (i > 0 && isdigit(equation[i - 1])) newEquaton += "*";
      newEquaton += "(";
      stack.push(equation[i]);
    } else if (equation[i] == ")" || equation[i] == "}" || equation[i] == "]") {
      var last = stack.pop();
      if (Bracket_Value[last] + Bracket_Value[equation[i]] != 0) {
        const result = "Equation must be Valid!";
        return { result, animation };
      }
      newEquaton += ")";
      if (i < equation.length - 1 && isdigit(equation[i + 1]))
        newEquaton += "*";
    } else newEquaton += equation[i];
  }

  if (stack.length > 0) {
    const result = "Equation must be Valid!";
    return { result, animation };
  }

  for (var i = 0; i < newEquaton.length; i++) {
    if (newEquaton[i] == ")") {
      var small_equation = "";
      for (var j = stack.length - 1; j >= 0; j--) {
        var last_Value = stack.pop();
        if (last_Value == "(") break;
        small_equation = last_Value + small_equation;
      }
      const value_of_small_equation = Solve_small_equation(small_equation);
      if (value_of_small_equation == Infinity) {
        const result = "Infinity";
        return { result, animation };
      }
      stack.push(value_of_small_equation);
    } else {
      stack.push(newEquaton[i]);
    }
  }

  var small_equation = "";
  for (var j = stack.length - 1; j >= 0; j--) {
    last_Value = stack[j];
    small_equation = last_Value + small_equation;
  }
  const result = Solve_small_equation(small_equation);
  animation.push(result);
  return { result, animation };
};
