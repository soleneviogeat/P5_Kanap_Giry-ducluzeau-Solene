/* 3- Insérer les produits dans la page d'accueil */

// Récupération des articles de l'API
function productsTableIndex() {
  return fetch("http://localhost:3000/api/products")

    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      return value;
    })
    .catch(function(err) {
      console.log("Une erreur est survenue");
    });
}

// Répartition des données de l'API dans le DOM
function displayProduct() {
  // mettre dans une variable la récupération de la section avec l'id items dans le DOM
  const section = document.getElementById("items");

  //créer une constante de chaque enfant de la balise "section"
  
  productsTableIndex().then((products) => {
    for (let i in products) {
      const product = products[i]; //un élément = à l'index i du tableau products

      const a = document.createElement("a");  
      a.setAttribute("href",`./product.html?id=${product._id}`);
      section.appendChild(a);

      const article = document.createElement("article");
      a.appendChild(article);
      
      const img = document.createElement("img");
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      article.appendChild(img);

      const h3 = document.createElement("h3");
      h3.classList.add("productName");
      h3.textContent = product.name;
      article.appendChild(h3);

      const p = document.createElement("p");
      p.classList.add("productDescription");
      p.textContent = product.description;
      article.appendChild(p);
     }
  }); 
}

displayProduct();

 /** 
1. Fonctionnement de Fetch :

  fetch(url)
  .then(function(response) {
  response.text()

  .then(function(text) {
    poemDisplay
    .textContent = text;
  });
});

2. const newElt = document.createElement("div");
let elt = document.getElementById("main"); 
elt.appendChild(newElt);
Appeler chaque élément en commençant par la section et finir par le p
*/



