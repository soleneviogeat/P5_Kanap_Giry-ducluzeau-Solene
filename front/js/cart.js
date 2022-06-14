/* 7- Ajouter des produits dans le panier */


function getProductCart() {
    
    const productGetItem = localStorage.getItem("product");

    const productParse = JSON.parse(productGetItem);
    alert("L'article a été positionné dans votre panier");

};
getProductCart();

//2 étape :
//Créer un objet avec le tableau ressenssant les données à afficher

/*
    const cartItem = document.createElement("article");
    article.classList.add("cart__item");
    //article.textContent = product.name;
    document.querySelector(".cart_items").appendChild(cartItem);

    const cartItemImg = document.createElement("div");
    article.classList.add("cart__item__img");
    document.querySelector(".cart__item").appendChild(cartItemImg);

    const cartImage = document.createElement("img");
    img.appendChild(cartImage);
    cartImage.src = product.imageUrl;
    cartImage.alt = product.altTxt;

    const cartItemContent = document.createElement("div");
    article.classList.add("cart__item__content");
    document.querySelector(".cart__item").appendChild(cartItemContent);
    
    const cartItemContentDescription = document.createElement("div");
    article.classList.add("cart__item__content__description");
    document.querySelector(".cart__item__content").appendChild(cartItemContentDescription);

    const cartTitle = document.getElementById("title");
    cartTitle.textContent = product.name;

    const cartColors = document.getElementById("color");
    cartColors.textContent = colors;

    const cartPrice = document.getElementById("price");
    cartPrice.textContent = product.price;

    const cartItemContentSettings = document.createElement("div");
    article.classList.add("cart__item__content__settings");
    document.querySelector(".cart__item__content").appendChild(cartItemContentSettings);

    const cartItemContentSettingsQuantity = document.createElement("div");
    article.classList.add("cart__item__content__settings__quantity");
    document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsQuantity);

    const p = document.createElement("p");
    //p.textContent = product.name;
    document.querySelector(".cart__item__content__settings").appendChild(p);

    const input = document.createElement("input");
    //p.textContent = product.name;
    document.querySelector(".cart__item__content__settings").appendChild(input);

    const cartItemContentSettingsDelete = document.createElement("div");
    article.classList.add("cart__item__content__settings__delete");
    document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsDelete);

    const deleteItem = document.createElement("p");
    article.classList.add("deleteItem");
    document.querySelector(".cart__item__content__settings__delete").appendChild(deleteItem);

