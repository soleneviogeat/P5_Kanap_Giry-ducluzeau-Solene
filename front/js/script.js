/* 3- Insérer les produits dans la page d'accueil */

//Récupération des articles de l'API
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
      alert("Une erreur est survenue : " + err.message);
    });
}

//Répartition des données de l'API dans le DOM pour tous les produits de la page d'accueil
function displayProduct() {
  
  const section = document.getElementById("items");

  productsTableIndex().then((products) => {
    for (let i in products) {
      const product = products[i];

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





