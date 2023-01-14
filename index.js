const searchBtn = document.getElementById("search-button");
const result = document.getElementById("result");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  const userInput = document.getElementById("search-value").value;
  if (toString(userInput) === "") {
    result.innerHTML = `
            <p class="error-msg">Please enter a dish to proceed</p>
        `;
  } else {
    fetch(url + userInput)
      .then((res) => res.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let ingredients = [];
        let count = 1;
        for (let i in myMeal) {
          let measure = "";
          let ingredient = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            ingredients.push(`${measure} ${ingredient}`);
            count = count + 1;
          }
        }
        result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h3>${myMeal.strArea}</h3>
    </div>
    <div id="ingredients-container">

    </div>
    <div id="recipe">
        <button id="hide-recipe">x</button>
        <pre>${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View recipe</button>
    `;
        const hideRecipe = document.getElementById("hide-recipe");
        const showRecipe = document.getElementById("show-recipe");
        const recipe = document.getElementById("recipe");
        const ingredientCon = document.getElementById("ingredients-container");

        const parent = document.createElement("ul");

        ingredients.forEach((item) => {
          let child = document.createElement("li");
          child.innerText = item;
          parent.appendChild(child);
        });
        ingredientCon.appendChild(parent);

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
          ingredientCon.style.display = "block";
        });

        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
          ingredientCon.style.display = "none";
        });
      })
      .catch(() => {
        result.innerHTML = `<p class="error-msg">Invalid Input</p>`;
      });
  }
});
