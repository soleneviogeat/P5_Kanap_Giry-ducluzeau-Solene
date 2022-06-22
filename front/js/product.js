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
        productColors.value = colors;
    }
}



/* 7- Ajouter des produits dans le panier */

/*let name = document.getElementById("title");
let price = document.getElementById("price");
let id = getProductId();*/


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
            name: product.name,
            image: product.imageUrl,
            altTxt: product.altTxt,
            price: product.price,
            description: product.description,
            color: product.colorSelected,
            quantity: product.quantitySelected
        };

    //let productStringify = JSON.stringify(productAdded);
    //localStorage.setItem("product", productStringify);

    if (validator(product)) {
            window.location.href ="cart.html";
        }


    function validator(product) {
        console.log(product);
        if (product.colorSelected === undefined) {
            alert("Merci de sélectionner une couleur")
            return false
        } else if (product.quantitySelected < 1) {
            alert("Merci de renseigner une quantité")
            return false
        } else { 
            return true
        }
    }



    //Initialisation du local storage
    
    function addToCart(productClicked) {
        const productLocalStorage = JSON.parse(localStorage.getItem("productsAddCart"));
        const newArray = [];

        productLocalStorage.forEach(product => {
            if(product.id === productClicked.id) {
                const object = {
                    id: productClicked.id,
                    color: productClicked.color,
                    quantity: productClicked.quantity
                }
                newArray.push(object);
            } else {
                newArray.push(product);
            }
        });
        localStorage.setItem("productsAddCart", JSON.stringify(newArray));
    }

    addToCart();
    
    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article

    /*productLocalStorage.forEach((productLocalStorage, index) => {
        //if (product.id === productCart.id && product.color === productCart.color){
        .then(function(res) {
            if (res.ok && product.id === productLocalStorage.id && product.color === productLocalStorage.color) {
                productLocalStorage();
                productLocalStorage.quantity = productLocalStorage.quantity + product.quantity
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
        })
        .catch(function(err) {
            // Une erreur est survenue
        });
    }    //Si le produit commandé n'est pas dans le panier ou si le panier est vide
    else {
        productLocalStorage =[];
        productLocalStorage.push(productAdded);
        localStorage.setItem("productAddCart", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
    }
});
      
    if (productLocalStorage == null) {
        let productLocalStorage = [productAdded]
        localStorage.setItem("productAddCart", JSON.stringify(productLocalStorage));
        
    }*/
    /*productAdded.forEach((productAdded, index) => {
        if(product.id === productAdded.id && product.color === productAdded.color) {
            let productLocalStorage = JSON.parse(productAdded);
            productAdded.quantity = productAdded.quantity + product.quantity;
        } 
        //Si le produit commandé n'est pas dans le panier ou si le panier est vide
        else {
            let productLocalStorage =[];
            productLocalStorage.push(productAdded);
            localStorage.setItem("productAddCart", JSON.stringify(productLocalStorage));

            console.table(productLocalStorage);
        }*/
    });
    

            
   

/* Dans le LOCAL STORAGE, si PRODUCT + couleur n'existe pas alors METTRE le PRODUCT sélectionné dans le LOCAL STORAGE
SINON SI même PRODUCT + même COULEUR existe incrémenter la quantité de la QUANTITE saisie et ne rien rajouter dans le LOCAL STORAGE
SINON SI même PRODUCT avec une autre couleur, créer un nouveau PRODUCT pour faire une ligne différente et ajouter le PRODUCT dans le LOCAL STORAGE
*/
//Lors du clic sur le bouton :
//       Pour que les éléments apparaissent dans la page Panier, il faut :
//    7- Créer une clé pour rendre chaque article unique : id + couleur
//    8- Si Panier contient déjà la clé à ajouter, alors incrémenter la quantité de cette clé
//    9- Si Panier ne contient pas la clé, alors ajouter la clé id+couleur au Panier avec la quantité 1
//    PAGE PANIER :
//    10- Gérer le montant total du Panier
//    11- Gérer la suppression et l'ajout dans le tableau Panier
//    12- Faire apparaître tous les éléments souhaités sur la page Panier
