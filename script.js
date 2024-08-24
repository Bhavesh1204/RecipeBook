// Recipe data storage
let recipes = [];

// Add recipe form submission handler
document.getElementById('recipe-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const image = document.getElementById('image').files[0];
    const recipe = {
        name,
        ingredients,
        steps,
        image: image.name
    };
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
});

// Display recipes
function displayRecipes() {
    const recipeList = document.getElementById('recipes');
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeHTML = `
            <li>
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Steps: ${recipe.steps}</p>
                <img src="${recipe.image}" alt="${recipe.name}">
                <button class="delete-btn" data-index="${index}">Delete</button>
            </li>
        `;
        recipeList.insertAdjacentHTML('beforeend', recipeHTML);
    });
}

// Delete recipe button handler
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }
});

// Search recipe handler
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value;
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(searchInput.toLowerCase()) ||
               recipe.ingredients.toLowerCase().includes(searchInput.toLowerCase()) ||
               recipe.steps.toLowerCase().includes(searchInput.toLowerCase());
    });
    filteredRecipes.forEach((recipe) => {
        const recipeHTML = `
            <li>
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Steps: ${recipe.steps}</p>
                <img src="${recipe.image}" alt="${recipe.name}">
            </li>
        `;
        searchResults.insertAdjacentHTML('beforeend', recipeHTML);
    });
});

// Load recipes from local storage
if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes();
}