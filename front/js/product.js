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
        console.log("Une erreur est survenue", err);
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
    }
}


/* 7- Ajouter des produits dans le panier */


// Récupération de la couleur sélectionnée 
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("select[name='color-select']").onchange=changeEventHandlerColor;
    },false);

function changeEventHandlerColor(event) {
    if(!event.target.value) alert("Merci de sélectionner une couleur");
    else {
        alert("Vous avez choisi la couleur " + event.target.value);

        const productColor = JSON.stringify(changeEventHandlerColor);
        localStorage.setItem(product.color, productColor);
    }
}



// Activation du bouton Ajouter dans le panier
const boutonAjouterPanier = document.getElementById("addToCart");
    boutonAjouterPanier.addEventListener("click", function eventOnClick() {
        console.log("clic");

        const productStringify = JSON.stringify(product);
        localStorage.setItem(product._id, productStringify);

});











    //Lors du clic sur le bouton :
    //    1- Transformer les éléments de la variable 'product' en string
    //    2- Stocker tous ces éléments dans le cache navigateur (Local Storage)
    //    3- Remettre les éléments sous leurs format d'origine
    //    4- Récupérer les éléments dans le Local Storage

    //       Pour que les éléments apparaissent dans la page Panier, il faut :
    //    5- Voir comment faire pour récupérer la couleur sélectionnée par le client
    //    6- Voir comment faire pour récupérer la quantité saisie par le client
    //    7- Créer une clé pour rendre chaque article unique : id + couleur
    
    //    8- Si Panier contient déjà la clé à ajouter, alors incrémenter la quantité de cette clé
    //    9- Si Panier ne contient pas la clé, alors ajouter la clé id+couleur au Panier avec la quantité 1

    //    PAGE PANIER :
    //    10- Gérer le montant total du Panier
    //    11- Gérer la suppression et l'ajout dans le tableau Panier
    //    12- Faire apparaître tous les éléments souhaités sur la page Panier
