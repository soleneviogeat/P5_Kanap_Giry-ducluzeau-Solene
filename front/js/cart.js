/* 8- Afficher un tableau récapitulatif des achats dans la page Panier */


let cart = JSON.parse(localStorage.getItem("productsAddCart"));
console.table(cart);


//Afficher les éléments qui doivent apparaitre sur la page Panier

let product = "";

function seeProductCart() {
    for (let i in cart) {
        product = cart[i];

        const article = document.createElement("article");
        article.classList.add("cart__item");
        document.querySelector("#cart__items").appendChild(article);
        

        const cartItemImg = document.createElement("div");
        article.classList.add("cart__item__img");
        document.querySelector(".cart__item").appendChild(cartItemImg);

        const cartImage = document.createElement("img");
        document.querySelector(".cart__item__img").appendChild(cartImage);
        cartImage.setAttribute("src", product.image);
        cartImage.alt = product.altTxt;

        const cartItemContent = document.createElement("div");
        article.classList.add("cart__item__content");
        document.querySelector(".cart__item").appendChild(cartItemContent);
        
        const cartItemContentDescription = document.createElement("div");
        article.classList.add("cart__item__content__description");
        document.querySelector(".cart__item__content").appendChild(cartItemContentDescription);

        const cartTitle = document.createElement("h2");
        cartTitle.innerHTML = product.name;
        document.querySelector(".cart__item__content__description").appendChild(cartTitle);


        const cartColors = document.createElement("p");
        cartColors.innerHTML = product.color;
        document.querySelector(".cart__item__content__description").appendChild(cartColors);


        const cartPrice = document.createElement("p");
        cartPrice.innerHTML = product.price + " €";
        document.querySelector(".cart__item__content__description").appendChild(cartPrice);


        const cartItemContentSettings = document.createElement("div");
        article.classList.add("cart__item__content__settings");
        document.querySelector(".cart__item__content").appendChild(cartItemContentSettings);

        const cartItemContentSettingsQuantity = document.createElement("div");
        article.classList.add("cart__item__content__settings__quantity");
        document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsQuantity);

        const p = document.createElement("p");
        p.innerHTML = "Qté : ";
        document.querySelector(".cart__item__content__settings__quantity").appendChild(p);

        const input = document.createElement("input");
        input.value = product.quantity;
        document.querySelector(".cart__item__content__settings__quantity").classList.add("itemQuantity");
        document.querySelector(".cart__item__content__settings__quantity").appendChild(input);

        const cartItemContentSettingsDelete = document.createElement("div");
        article.classList.add("cart__item__content__settings__delete");
        document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsDelete);

        const deleteItem = document.createElement("p");
        document.querySelector(".cart__item__content__settings__delete").classList.add("deleteItem");
        document.querySelector(".cart__item__content__settings__delete").appendChild(deleteItem);
        deleteItem.innerHTML = "Supprimer";
    }
}

seeProductCart();

//Afficher le montant total du panier
//Récupération des quantités pour afficher le nombre d'articles
let quantity = [];

JSON.parse(localStorage.getItem("productsAddCart")).forEach(product => {
    quantity.push(parseInt(product.quantity))
});

let sumQuantity = 0

for (let i = 0; i < quantity.length; i++) {
    sumQuantity = sumQuantity + quantity[i];
}

let productTotalQuantity = document.getElementById('totalQuantity');
productTotalQuantity.innerHTML = sumQuantity;


//Récupération des montants pour afficher le montant total du panier
//Montant total = quantité sélectionnée * prix => pour chaque produit
// Somme des [quantité sélectionnée * prix] de chaque produit
let price = [];
let amountTotal = 0

JSON.parse(localStorage.getItem("productsAddCart")).forEach(product => {
    amountTotal = parseInt(product.quantity) * product.price;
    price.push(amountTotal)
});

let totalCart = 0

for (let i = 0; i < price.length; i++) {
    totalCart = totalCart + price[i]; 
}

let totalPrice = document.getElementById('totalPrice');
totalPrice.innerHTML = totalCart;
