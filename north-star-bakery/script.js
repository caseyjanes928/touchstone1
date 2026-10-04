// North Star Bakery JavaScript

// Product data used by the favorites feature.
const bakeryProducts = [
    { id: "bread", name: "Artisan Breads" },
    { id: "pastries", name: "Fresh Pastries" },
    { id: "cakes", name: "Handcrafted Cakes" }
];

// A second array keeps track of the user's saved favorites.
let favoriteProducts = JSON.parse(localStorage.getItem("northStarFavorites")) || [];

function saveFavorites() {
    localStorage.setItem("northStarFavorites", JSON.stringify(favoriteProducts));
}

function updateFavoritesDisplay() {
    const favoritesList = document.querySelector("#favorites-list");

    if (!favoritesList) {
        return;
    }

    if (favoriteProducts.length === 0) {
        favoritesList.textContent = "You have not saved any favorites yet.";
        return;
    }

    const favoriteNames = favoriteProducts.map(function (productId) {
        const product = bakeryProducts.find(function (item) {
            return item.id === productId;
        });
        return product ? product.name : productId;
    });

    favoritesList.textContent = "Saved favorites: " + favoriteNames.join(", ");
}

function updateFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {
        const productId = button.dataset.product;
        const isFavorite = favoriteProducts.includes(productId);
        button.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";
        button.setAttribute("aria-pressed", isFavorite);
    });
}

function toggleFavorite(productId) {
    if (favoriteProducts.includes(productId)) {
        favoriteProducts = favoriteProducts.filter(function (item) {
            return item !== productId;
        });
    } else {
        favoriteProducts.push(productId);
    }

    saveFavorites();
    updateFavoriteButtons();
    updateFavoritesDisplay();
}

function setupFavorites() {
    const buttons = document.querySelectorAll(".favorite-button");

    if (buttons.length === 0) {
        return;
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleFavorite(button.dataset.product);
        });
    });

    updateFavoriteButtons();
    updateFavoritesDisplay();
}

function showError(field, message) {
    const error = document.querySelector("#" + field.id + "-error");
    if (error) {
        error.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(function (error) {
        error.textContent = "";
    });
}

function validateContactForm(event) {
    // This student project does not have a server to receive form submissions,
    // so keep the form on the page after validation instead of sending a POST request.
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const itemDetails = form.querySelector("#item-details");
    let isValid = true;

    clearErrors();

    if (name.value.trim().length < 2) {
        showError(name, "Please enter at least 2 characters for your name.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    if (itemDetails.value.trim().length < 5) {
        showError(itemDetails, "Please enter at least 5 characters for the item details.");
        isValid = false;
    }

    if (isValid) {
        alert("Thanks! Your request passed validation. This demo form does not send information to a server.");
    }
}

function setupFormValidation() {
    const form = document.querySelector("#contact-form");
    if (form) {
        form.addEventListener("submit", validateContactForm);
    }
}

setupFavorites();
setupFormValidation();