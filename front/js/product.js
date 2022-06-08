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
        console.log("Une erreur est survenue");
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

