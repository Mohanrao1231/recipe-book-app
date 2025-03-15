const API_KEY = "1bbceb8dcdd346c7b21d80a91aac5bce";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("div");
    recipeItemEl.classList.add("recipe-item");

    const recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "Recipe image";

    const recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    const recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    const recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.spoonacularSourceUrl || recipe.sourceUrl; // Use Spoonacular URL if available
    recipeLinkEl.innerText = "View Recipe";
    recipeLinkEl.target = "_blank";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging

    return data.recipes || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

async function init() {
  const recipes = await getRecipes();
  if (!recipes || recipes.length === 0) {
    console.warn("No recipes found!");
    recipeListEl.innerHTML = "<p>No recipes available. Try again later.</p>";
    return;
  }
  displayRecipes(recipes);
}

init();

