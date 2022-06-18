/**let eleve1 = {
    nom: "Jean",
    note: [15, 16, 18]
}

let eleve2 = {
   nom: "Marc",
   note: [5, 18, 20]
}

function moyenne(notes) {
    let somme = 0
    for (let i = 0; i < notes.lenght; i++){
        somme = somme + notes[i]
    }
   
    return somme / notes.lenght
    
}

function estMeilleur (a, b) {
    return moyenne(a.notes) > moyenne(b.notes)
}

console.log(estMeilleur(eleve1, eleve2))



function afficheQuiALaMoyenne(eleves) {
for (let i = 0; i < eleves.length; i++) {
    let eleve = eleves[i];
    if (eleve.moyenne < 10) {
        console.log(eleve.nom + " n'as pas la moyenne ce trimestre : " + eleve.moyenne + "/20");
    } else {
        console.log("Bravo, " + eleve.nom + " as la moyenne ce trimestre ! " + eleve.moyenne + "/20");
    }
}
}

afficheQuiALaMoyenne(classA);
afficheQuiALaMoyenne(classB);*/
