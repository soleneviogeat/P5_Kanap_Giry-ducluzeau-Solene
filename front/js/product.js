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



