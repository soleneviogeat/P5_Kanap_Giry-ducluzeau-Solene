// 11- Afficher le numéro de commande
function numOrder(){

    const orderId = document.getElementById("orderId");
    orderId.innerText = localStorage.getItem("orderId");
    
    localStorage.clear();
}
numOrder();
