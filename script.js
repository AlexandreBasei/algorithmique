document.addEventListener("DOMContentLoaded", function () {

    function createTab(n) {
    let tab = []
    for (let i = 0; i < n; i++) {
        tab[i] = Math.floor(Math.random() * 100);
    }
    return tab;
}

function trierBulle(tab) {
    let n = tab.length;
    let Superieur;

    do {
        Superieur = false;
        for (let i = 0; i < n - 1; i++) {
            if (tab[i] > tab[i + 1]) {
                let temp = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = temp;
                Superieur = true;
            }
        }
        n--;
    } while (Superieur);

    return tab;
}

    const genTab = document.getElementById("gentab");
    const selectTri = document.getElementById("selectTri");
    const triBulle = document.getElementById("triBulle");
    const triInsertion = document.getElementById("triInsert");
    const triFusion = document.getElementById("triFusion");
    const printBulle = document.getElementById("printBulle");
    const printInsert = document.getElementById("printInsert");
    let startB;
    let endB;
    let tempsB;
    let startI;
    let endI;
    let tempsI;
    let startF;
    let endF;
    let tempsF;
    let tab;
    let tabTriBulle;
    let tabTriInsert;
    let tabTriFusion;

    genTab.addEventListener("click", function () {
        ntab = document.getElementById("inputtab").value;
        tab = createTab(ntab);
        document.getElementById("printTab").innerHTML = "Tableau : " + tab;
    })

    selectTri.addEventListener("change", function () {

        if (selectTri.value == "bulle") {
            triBulle.classList.add("visible");
            triInsertion.classList.remove("visible");
            triFusion.classList.remove("visible");
        }
        else if (selectTri.value == "insertion") {
            triInsertion.classList.add("visible");
            triBulle.classList.remove("visible");
            triFusion.classList.remove("visible");
        }
        else if (selectTri.value == "fusion") {
            triFusion.classList.add("visible");
            triBulle.classList.remove("visible");
            triInsertion.classList.remove("visible");
        }
    })

    printBulle.addEventListener("click", function() {
        startB = performance.now();
        tabTriBulle = trierBulle(tab.slice());
        endB = performance.now();
        tempsB = endB - startB;
        document.getElementById("pBulle").innerHTML = "Tableau trié ! Temps d'exécution : " + tempsB + " ms<br> Tableau trié : " + tabTriBulle;
    })

    printInsert.addEventListener("click", function() {
        startI = performance.now();
        tabTriInsert = trierInsert(tab.slice());
        endI = performance.now();
        tempsI = endI - startI;
        document.getElementById("pInsert").innerHTML = "Tableau trié ! Temps d'exécution : " + tempsI + " ms<br> Tableau trié : " + tabTriInsert;
    })

})


// ALGORITHME
// CABCABCABC
// DMIRSKWIOH

// clef :
// 2 4
// 2 1
// matrice de 2x2 donc on regroupe les lettres par groupe de 2

// VELIZY => [22 5 12 9 0 25] (chaque lettre = sa position dans l'alphabet => v = 22eme lettre avec 0 pour Z)

// VE devient :
// multiplication de matrices :
// 2 4   22
// 2 1   5     mod26 (reste de la division par 26)

// =

// 64              12
// 49    mod26 =   23      écrit LW

// LI  :
// 24    12
// 21    9   mod26
// =

// 60
// 33 mod26
// =

// 8
// 7  soit HG

// ZY devient :
// 24    0
// 21    25 mod26
// =

// 100
// 25
// =

// 22
// 25 mod26 soit VY

// L E S T
// S R C D
// S O N A
// D E S Y
// A S _
// E _ L
// _ C R
// P T O
// LES SRC SONT DES AS DE LA CRYPTO