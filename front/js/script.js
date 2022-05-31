/* Insérer les produits dans la page d'accueil */

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
      // Une erreur est survenue
    });
}

function displayProduct() {
  // mettre dans une variable la récupération de la section avec l'id items dans le DOM
  const section = document.getElementById("items");

  //créer une constante de chaque enfant de la balise  "section"
  
  productsTableIndex().then((products) => {
    for (let i in products) {
      const product = products[i]; //un élément = à l'index i du tableau products

      const a = document.createElement("a");  
      a.setAttribute("href","./product.html?id=42");
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

3.  Créer une classe avec le style ou écrire le style directement dans la boucle for si besoin */



/* Faire le lien entre un produit de la page d'accueil et la page Produit */

/*function productsID() {
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
      // Une erreur est survenue
    });
}

var str = "./product.html?id=42";
var url = new URL(str);
var name = url.get("name");

// Itère sur les paramètres de recherche
/*for (let id of url) {
  console.log(id);
}



/* Récupérer l'id du produit à afficher */
