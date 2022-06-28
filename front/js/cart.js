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


/* 10- Passer la commande */
/* Instauration des regex dans le formulaire de la page Panier */
function errorMsgForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$");
    let charRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç '-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,4}(?:(?:[,. ]){1}[a-zA-Zàâäéèêëïîôöùûüç]+)+");


    // Evènement saisie prénom
    function validationFirstName(inputFirstName) {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = "";
        } else {
            firstNameErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre prénom.";
        }
    };

    form.firstName.addEventListener("change", function() {
        validationFirstName(this);
    });
    

    // Evènement saisie nom
    function validationLastName(inputLastName) {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = "";
        } else {
            lastNameErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre nom.";
        }
    };

    form.lastName.addEventListener("change", function() {
        validationLastName(this);
    });


    // Evènement saisie adresse
    function validationAddress(inputAddress) {
        let addressErrorMsg = document.getElementById("addressErrorMsg");

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = "";
        } else {
            addressErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre adresse.";
        }
    };

    form.address.addEventListener("change", function() {
        validationAddress(this);
    });


    // Evènement saisie ville
    function validationCity(inputCity) {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
    
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = "";
        } else {
            cityErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre ville.";
        }
    };

    form.city.addEventListener("change", function() {
        validationCity(this);
    });


    // Evènement saisie email
    function validationEmail(inputEmail) {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
    
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre email.";
        }
    };

    form.email.addEventListener("change", function() {
        validationEmail(this);
    });
}
errorMsgForm();


//Envoi des informations client au localstorage
function sendOrder(){
    const btnOrder = document.getElementById("order");

    btnOrder.addEventListener("click", (event)=>{

        //Constitution d'un tableau de produit
        let idProducts = [];
        for (let i = 0; i<product.length;i++) {
            idProducts.push(product[i].id);
        }

        //Constitution de l'objet Contact
        const order = {
            contact : {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
            },
            products: idProducts,
        } 

        //Envoi des éléments de la commande au service web

        fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(order)
        })

            .then((response) => response.json())

            .then(function(data) {
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);

                document.location.href = "/front/html/confirmation.html";
            })

            .catch(function(err) {
                alert("Une erreur est survenue : " + err.message);
            })        
    })
}
sendOrder();





