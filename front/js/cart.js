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
        document.getElementById("cart__items").appendChild(article);
        

        const cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        article.appendChild(cartItemImg);

        const cartImage = document.createElement("img");
        cartItemImg.appendChild(cartImage);
        cartImage.setAttribute("src", product.image);
        cartImage.alt = product.altTxt;

        const cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        article.appendChild(cartItemContent);
        
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemContentDescription);

        const cartTitle = document.createElement("h2");
        cartTitle.innerHTML = product.name;
        cartItemContentDescription.appendChild(cartTitle);


        const cartColors = document.createElement("p");
        cartColors.innerHTML = product.color;
        cartItemContentDescription.appendChild(cartColors);


        const cartPrice = document.createElement("p");
        cartPrice.innerHTML = product.price + " €";
        cartItemContentDescription.appendChild(cartPrice);


        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        cartItemContent.appendChild(cartItemContentSettings);

        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        const p = document.createElement("p");
        p.innerHTML = "Qté : ";
        cartItemContentSettingsQuantity.appendChild(p);

        const input = document.createElement("input")     
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.setAttribute("value", product.quantity);
        cartItemContentSettingsQuantity.appendChild(input);

        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        const deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        cartItemContentSettingsDelete.appendChild(deleteItem);
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


// Modification d'une quantité de produit
function modifyQuantity() {

    const changeQuantity = document.getElementsByClassName("itemQuantity");

    for (let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener("change", (event) => {

            let oldQuantity = cart[i].quantity;
            let newQuantity = changeQuantity[i].value;

            if(newQuantity !== oldQuantity) {
                cart[i].quantity = newQuantity;
            }    

            localStorage.setItem("productsAddCart", JSON.stringify(cart));
            
            changeQuantity.innerHTML = newQuantity;
        })
    }
}
modifyQuantity();


// Suppression d'un produit
function deleteProductCart() {
    const deleteItem = document.getElementsByClassName("deleteItem");

    for (let i = 0; i < deleteItem.length; i++){
        deleteItem[i].addEventListener("click", (event) => {
            //event.preventDefault();

            //Selection de l'élément à supprimer en fonction de son id ET sa couleur
            let idDelete = cart[i].id;
            let colorDelete = cart[i].color;

            cart = cart.filter(el => el.id !== idDelete || el.color !== colorDelete);
            
            localStorage.setItem("productsAddCart", JSON.stringify(cart));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProductCart();


