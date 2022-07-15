/* 8- Afficher un tableau récapitulatif des achats dans la page Panier */


let cart = JSON.parse(localStorage.getItem("productsAddCart"));
console.table(cart);


//Afficher les éléments qui doivent apparaitre sur la page Panier

function seeProductCart() {

    if(cart === null) {
        alert("Il n'y a aucun article dans le panier")
    }

    else {

        for (let i in cart) {

            fetch("http://localhost:3000/api/products/" + cart[i].id)

            .then((res)=> {
                if (res.ok) {
                    return res.json()
                }
            })
            
            .then((productFromApi) => {   

                if(productFromApi){          

                    const article = document.createElement("article");
                    article.classList.add("cart__item");
                    document.getElementById("cart__items").appendChild(article);

                    const cartItemImg = document.createElement("div");
                    cartItemImg.classList.add("cart__item__img");
                    article.appendChild(cartItemImg);

                    const cartImage = document.createElement("img");
                    cartItemImg.appendChild(cartImage);
                    cartImage.setAttribute("src", productFromApi.imageUrl);
                    cartImage.alt = productFromApi.altTxt;

                    const cartItemContent = document.createElement("div");
                    cartItemContent.classList.add("cart__item__content");
                    article.appendChild(cartItemContent);
                    
                    const cartItemContentDescription = document.createElement("div");
                    cartItemContentDescription.classList.add("cart__item__content__description");
                    cartItemContent.appendChild(cartItemContentDescription);

                    const cartTitle = document.createElement("h2");
                    cartTitle.innerHTML = productFromApi.name;
                    cartItemContentDescription.appendChild(cartTitle);

                    const cartColors = document.createElement("p");
                    cartColors.innerHTML = cart[i].color;
                    cartItemContentDescription.appendChild(cartColors);
                    
                    const cartPrice = document.createElement("p");
                    cartPrice.innerHTML = productFromApi.price + " €";
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
                    input.setAttribute("value", cart[i].quantity);
                    input.addEventListener("change", () => {
                        modifyQuantity(input, cart, i);
                    });
                    cartItemContentSettingsQuantity.appendChild(input);

                    const cartItemContentSettingsDelete = document.createElement("div");
                    cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
                    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

                    const deleteItem = document.createElement("p");
                    deleteItem.classList.add("deleteItem");
                    deleteItem.addEventListener("click", () => {
                        deleteProduct(cart, i);
                    });
                    cartItemContentSettingsDelete.appendChild(deleteItem);
                    deleteItem.innerHTML = "Supprimer";
                }                  
            })

            .catch(function(err) {
                console.log("Une erreur est survenue" + err.message);
            })
        }
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
let totalCart = 0

for (let i in cart) {

    fetch("http://localhost:3000/api/products/" + cart[i].id)

    .then((res)=> {
        if (res.ok) {
            return res.json()
        }
    })
    
    .then((productFromApi) => {   

        if(productFromApi){

            //JSON.parse(localStorage.getItem("productsAddCart")).forEach(product => {
                amountTotal = parseInt(cart[i].quantity) * productFromApi.price;
                price.push(amountTotal)
            //})
        }

        if (price.length) {
            //for (let i = 0; i < price.length; i++) {
            totalCart = totalCart + price[i]; 
            
        }

        let productTotalPrice = document.getElementById('totalPrice');
        productTotalPrice.innerHTML = totalCart;
    })

    .catch(function(err) {
        console.log("Une erreur est survenue" + err.message);
    })
}

// Modification d'une quantité de produit
function modifyQuantity(input, cart, i) {

        let oldQuantity = cart[i].quantity;
        let newQuantity = input.value;

        if(newQuantity !== oldQuantity) {
            cart[i].quantity = newQuantity;
        }    

        localStorage.setItem("productsAddCart", JSON.stringify(cart));
        
        input.innerHTML = newQuantity;

        location.reload();
}

// Suppression d'un produit
function deleteProduct(cart, i) {

    //Selection de l'élément à supprimer en fonction de son id ET sa couleur
    let idDelete = cart[i].id;
    let colorDelete = cart[i].color;

    cart = cart.filter(el => el.id !== idDelete || el.color !== colorDelete);
    
    localStorage.setItem("productsAddCart", JSON.stringify(cart));

    //Alerte produit supprimé et refresh
    alert("Ce produit a bien été supprimé du panier");
    location.reload();
}

/*
function modifyQuantity() {
    console.log('a')
    const changeQuantity = document.getElementsByClassName("itemQuantity");

    for (let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener("change", (event) => {
            console.log(changeQuantity)
            event.preventDefault();

            let oldQuantity = cart[i].quantity;
            let newQuantity = changeQuantity[i].value;

            if(newQuantity !== oldQuantity) {
                cart[i].quantity = newQuantity;
            }    

            localStorage.setItem("productsAddCart", JSON.stringify(cart));
            
            changeQuantity.innerHTML = newQuantity;

            location.reload();
        })
    }
}
modifyQuantity();



function deleteProductCart() {

    const deleteItem = document.getElementsByClassName("deleteItem");

    for (let i = 0; i < deleteItem.length; i++){
        deleteItem[i].addEventListener("click", (event) => {

            event.preventDefault();

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
*/

/* 10- Passer la commande */
/* Instauration des regex dans le formulaire de la page Panier */
const validField = [
    {field: 'firstName', isValid: false},
    {field: 'lastName', isValid: false},
    {field: 'address', isValid: false},
    {field: 'city', isValid: false},
    {field: 'email', isValid: false}
];
 
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
        let firstNameStyle = document.getElementById("firstName");
    
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = ""
            firstNameStyle.style.color = "#64BC78"
            firstNameStyle.style.border = "2px solid #64DC50"
            const index = validField.findIndex(el => el.field === 'firstName')
            validField[index].isValid = true;
        } else {
            firstNameErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre prénom."
            firstNameStyle.style.color = "#FF2A27"
            firstNameStyle.style.border = "2px solid #FF2A27"
        }
    };

    form.firstName.addEventListener("change", function() {
        validationFirstName(this);
    });
    

    // Evènement saisie nom
    function validationLastName(inputLastName) {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        let lastNameStyle = document.getElementById("lastName");
    
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = "";
            lastNameStyle.style.color = "#64BC78"
            lastNameStyle.style.border = "2px solid #64DC50"
            const index = validField.findIndex(el => el.field === 'lastName')
            validField[index].isValid = true;

        } else {
            lastNameErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre nom."
            lastNameStyle.style.color = "#FF2A27"
            lastNameStyle.style.border = "2px solid #FF2A27"
        }
    };

    form.lastName.addEventListener("change", function() {
        validationLastName(this);
    });


    // Evènement saisie adresse
    function validationAddress(inputAddress) {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        let addressStyle = document.getElementById("address");

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = "";
            addressStyle.style.color = "#64BC78"
            addressStyle.style.border = "2px solid #64DC50"
            const index = validField.findIndex(el => el.field === 'address')
            validField[index].isValid = true

        } else {
            addressErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre adresse.";
            addressStyle.style.color = "#FF2A27"
            addressStyle.style.border = "2px solid #FF2A27"
        }
    };

    form.address.addEventListener("change", function() {
        validationAddress(this);
    });


    // Evènement saisie ville
    function validationCity(inputCity) {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        let cityStyle = document.getElementById("city");
    
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = "";
            cityStyle.style.color = "#64BC78"
            cityStyle.style.border = "2px solid #64DC50"
            const index = validField.findIndex(el => el.field === 'city')
            validField[index].isValid = true

        } else {
            cityErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre ville.";
            cityStyle.style.color = "#FF2A27"
            cityStyle.style.border = "2px solid #FF2A27"
        }
    };

    form.city.addEventListener("change", function() {
        validationCity(this);
    });


    // Evènement saisie email
    function validationEmail(inputEmail) {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        let emailStyle = document.getElementById("email");
    
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "";
            emailStyle.style.color = "#64BC78"
            emailStyle.style.border = "2px solid #64DC50"
            const index = validField.findIndex(el => el.field === 'email')
            validField[index].isValid = true
        } else {
            emailErrorMsg.innerHTML = "Votre saisie n'est pas valide ! Merci de saisir votre email.";
            emailStyle.style.color = "#FF2A27"
            emailStyle.style.border = "2px solid #FF2A27"
        }
    };

    form.email.addEventListener("change", function() {
        validationEmail(this);
    });
}
errorMsgForm();

/*
// Ajout de l'écoute du clic sur le bouton commander
const btnOrder = document.getElementById("order");
btnOrder.addEventListener("click", (event)=>{ 
    formValidator();
});

// validation des champs du formulaire
function formValidator() {
    const divFormText = document.getElementsByClassName("cart__order__form__question");
    console.log(divFormText[0])
    const inputFormText = [];
    for (let i=0; i<divFormText.length; i++) {
        inputFormText.push(divFormText[i].children[1])
    }

    console.log(inputFormText[0].style.color)
}*/

const btnOrder = document.getElementById("order");

btnOrder.addEventListener("click", (event)=>{
    //event.preventDefault();
    console.log('lala', validField.length)
    let allFieldValid = true;
    for (let i=0; i< validField.length; i++) {
        console.log('lalafff')
        if (!validField[i].isValid) {
            console.log('celui la', validField[i].field);
            allFieldValid = false;
        }
    }
    if (allFieldValid) {
        event.preventDefault();
        console.log('laaaaaaaaaa')
        sendOrder();
    } else {
        alert('Les champs du formulaire ne sont pas renseignés correctement')
    }
    //sendOrder();

})
//Envoi des informations client au localstorage
function sendOrder(){
    
    //formValidator();
   
    //Constitution d'un tableau de produit
    let idProducts = [];
    for (let i = 0; i<cart.length;i++) {
        idProducts.push(cart[i].id);
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
       
    
    
}

