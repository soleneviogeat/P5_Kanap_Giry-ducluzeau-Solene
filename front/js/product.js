/* 4- Faire le lien entre un produit de la page d'accueil et la page Produit */

/** “URLSearchParams” :
var str = "https://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris";
var url = new URL(str);
var name = url.searchParams.get("name");
console.log(name);
*/



//Créer une nouveau URL contenant l'id du produit correspondant
function getProductId() {
    const pageUrl = new URL(window.location.href);
    const productId = pageUrl.searchParams.get("id");
    return productId
}

getProductId();

/* 5- Récupérer l'id du produit à afficher */

//Récupérer la nouvelle adresse avec un id spécifique pour chaque produit


let product = null;

function getProductTable() {
    const productId = getProductId();
    fetch("http://localhost:3000/api/products/" + productId)

    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })

    .then(function(productsApi) {
        product = productsApi;
        if (product){
            getProductDetails(product);
        }
    })

    .catch(function(err) {
        console.log("Une erreur est survenue" + err.message);
    })
}

getProductTable();


/* 6- Insérer un produit et ses détails dans la page Produit */


// Répartition des données de l'API dans le DOM pour le détail des produits à afficher  
function getProductDetails(product) {
    
    const productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    const productTitle = document.getElementById("title");
    productTitle.textContent = product.name;

    const productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    const productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

    for (let colors of product.colors) {
        const productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.textContent = colors;
        productColors.value = colors;
    }
}


/* 7- Ajouter des produits dans le panier */
// Récupération de la couleur sélectionnée 
document.addEventListener("change", function(event) {
    const color = document.querySelector("#colors").value;
    product.colorSelected = color;
});


// Récupération de la quantité saisie
document.addEventListener("change", function(event) {
    const quantity = document.getElementById("quantity").value;
    product.quantitySelected = quantity;
});

// Activation du bouton Ajouter dans le panier
const boutonAjouterPanier = document.getElementById("addToCart");

boutonAjouterPanier.addEventListener("click", function eventOnClick() {
    // Création du tableau répertoriant les éléments du Panier
    let productAdded = {
        id: product._id,
        color: product.colorSelected,
        quantity: product.quantitySelected
    };
    checkIfAlreadyInLocalStorage(productAdded);
});

//Si le panier est vide
function checkIfAlreadyInLocalStorage (productAdded) {

    //Importation dans le local storage
    let cart = localStorage.getItem("productsAddCart");

    if (cart == null) {
        cart = [productAdded]
        popupValidation(cart);
    }
    //Si le produit commandé est déjà dans le panier
    else {
        cart = JSON.parse(cart);
        let productFoundOnLocalStorage = false;
        cart.forEach((productCart, index) => {
            if (productAdded.id === productCart.id && productAdded.color === productCart.color) {
                productCart.quantity = parseInt(productCart.quantity) + parseInt(productAdded.quantity);
                productFoundOnLocalStorage = true
                popupValidation(cart);
            }
        })
        //Si le panier comporte déjà au moins 1 article ou si le produit commandé n'est pas dans le panier
        if (productFoundOnLocalStorage == false) {
            cart.push(productAdded);
            popupValidation(cart);
        }
    }
}
//Mise en fonction du changement du page lors du clic sur le bouton "Ajouter au panier"
//Messages d'alerte en cas de non sélection de la couleur ou de la quantité
function popupValidation(cart) {
    if (product.colorSelected == null || product.colorSelected === 0 || product.colorSelected === "0" || product.colorSelected === "" || product.colorSelected == undefined) {
        alert("Merci de sélectionner une couleur")
    
    } else if (product.quantitySelected < 1) {
        alert("Merci de renseigner une quantité")
    
    } else if(window.confirm(`Votre commande de ${product.quantitySelected} ${product.name} ${product.colorSelected} est ajoutée au panier :
    - pour consulter votre panier, cliquez sur OK
    - pour continuer vos achats, cliquez sur Annuler`)){
        localStorage.setItem("productsAddCart", JSON.stringify(cart));
        window.location.href ="/front/html/cart.html"
    } else {
        localStorage.setItem("productsAddCart", JSON.stringify(cart));
    }
}


