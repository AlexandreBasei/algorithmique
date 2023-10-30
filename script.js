document.addEventListener("DOMContentLoaded", function () {

    const selectTri = document.getElementById("selectTri");
    const triBulle = document.getElementById("triBulle");
    const triInsertion = document.getElementById("triInsert");
    const triFusion = document.getElementById("triFusion");
    const printBulle = document.getElementById("printBulle");
    const printInsert = document.getElementById("printInsert");
    const printFusion = document.getElementById("printFusion");
    const chercherInput = document.getElementById("chercherInput");
    const chercher = document.getElementById("chercher");

    const dichoCanva = document.getElementById("dichoChart");
    const bulleCanva = document.getElementById("bulleChart");
    const insertCanva = document.getElementById("insertChart");
    const fusionCanva = document.getElementById("fusionChart");
    let dichoChart;
    let bulleChart;
    let insertChart;
    let fusionChart;

    function createTab(n) {
        let tab = []
        for (let i = 0; i < n; i++) {
            tab[i] = Math.floor(Math.random() * 100);
        }
        return tab;
    }

    function createTabTrié(n) {
        let tabTrié = [];
        for (let i = 0; i < n; i++) {
            tabTrié.push(Math.floor(Math.random() * 101)); // Génère des nombres aléatoires entre 0 et 100
        }
        tabTrié.sort((a, b) => a - b); // Trie le tableau en ordre croissant
        console.log(tabTrié);
        return tabTrié;
    }

    function sixTab(tri, n) {
        let tab = [createTab(5000), createTab(10000), createTab(50000), createTab(100000)];
        let tab2 = [createTab(5000), createTab(10000), createTab(50000), createTab(100000), createTab(500000)];
        let tab3 = [createTab(5000), createTab(10000), createTab(50000), createTab(100000), createTab(500000), createTab(1000000), createTab(10000000)];
        let tab0 = [createTabTrié(5000), createTabTrié(10000), createTabTrié(50000), createTabTrié(100000), createTabTrié(500000), createTabTrié(1000000)];
        let tempsTab0 = [];
        let tempsTabNaif = [];
        let tempsTab = [];
        let tempsTab2 = [];
        let tempsTab3 = [];
        let start;
        let end;

        if (tri === 0) {
            for (let i = 0; i < 6; i++) {
                start = performance.now();
                dicho(tab0[i], n);
                end = performance.now();
                tempsTab0.push(end - start);
            }

            for (let i = 0; i < 6; i++) {
                start = performance.now();
                naif(tab0[i], n);
                end = performance.now();
                tempsTabNaif.push(end - start);
            }


            dichoChart = new Chart(dichoCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10000", "50000", "100000", "500000", "1000000"],
                    datasets: [
                        {
                            label: "Durée de la recherche dichotomique(en ms)",
                            data: tempsTab0,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "Durée de la recherche naïve (en ms)",
                            data: tempsTabNaif,
                            fill: false,
                            borderColor: 'rgb(75,30,183)',
                            tension: 0.1
                        }
                    ]
                },
            });
        }

        else if (tri === 1) {
            for (let i = 0; i < 4; i++) {
                start = performance.now();
                trierBulle(tab[i]);
                end = performance.now();
                tempsTab.push(end - start);
            }

            bulleChart = new Chart(bulleCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10000", "50000", "100000"],
                    datasets: [{
                        label: "Temps du tri (en ms)",
                        data: tempsTab,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
            });
        } else if (tri === 2) {
            for (let i = 0; i < 5; i++) {
                start = performance.now();
                trierInsert(tab2[i]);
                end = performance.now();
                tempsTab2.push(end - start);
                console.log(tempsTab2);
            }

            insertChart = new Chart(insertCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10000", "50000", "100000", "500000"],
                    datasets: [{
                        label: "Temps du tri (en ms)",
                        data: tempsTab2,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
            });

        } else if (tri === 3) {
            for (let i = 0; i < 7; i++) {
                start = performance.now();
                trierFusion(tab3[i]);
                end = performance.now();
                tempsTab3.push(end - start);
                console.log(tempsTab3);
            }

            fusionChart = new Chart(fusionCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10000", "50000", "100000", "500000", "1000000", "10000000"],
                    datasets: [{
                        label: "Temps du tri (en ms)",
                        data: tempsTab3,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
            });
        }

        return tempsTab;
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

    function trierInsert(tab) {
        for (let i = 1; i < tab.length; i++) {
            let val = tab[i];
            let j = i - 1;

            // Déplace les éléments du tableau qui sont plus grands que la valeur courante vers la droite de leur position actuelle
            while (j >= 0 && tab[j] > val) {
                tab[j + 1] = tab[j];
                j--;
            }

            // Insère la valeur courante à la bonne position dans le tab trié
            tab[j + 1] = val;
        }
        return tab;
    }

    function trierFusion(tab) {
        if (tab.length <= 1) {
            return tab;
        }

        // Divisez le tableau en deux moitiés
        let milieu = Math.floor(tab.length / 2);
        let gauche = tab.slice(0, milieu);
        let droite = tab.slice(milieu);

        // Triez récursivement chaque moitié
        let triGauche = trierFusion(gauche);
        let triDroite = trierFusion(droite);

        // Fusionnez les deux moitiés triées
        return fusion(triGauche, triDroite);
    }

    function fusion(gauche, droite) {
        let res = [];
        let iGauche = 0;
        let iDroite = 0;

        // Comparez les éléments des deux moitiés et fusionnez-les en ordre
        while (iGauche < gauche.length && iDroite < droite.length) {
            if (gauche[iGauche] < droite[iDroite]) {
                res.push(gauche[iGauche]);
                iGauche++;
            } else {
                res.push(droite[iDroite]);
                iDroite++;
            }
        }

        // Ajoutez les éléments restants des deux moitiés (s'il y en a)
        return res.concat(gauche.slice(iGauche), droite.slice(iDroite));

        // while (leftIndex < left.length) {
        //     result.push(left[leftIndex]);
        //     leftIndex++;
        //   }

        //   while (rightIndex < right.length) {
        //     result.push(right[rightIndex]);
        //     rightIndex++;
        //   }

        //   return result;
    }

    function dicho(tab, n, debut = 0, fin = tab.length - 1) {

        if (debut > fin) return -1;
        let milieu = Math.floor((debut + fin) / 2);
        if (n == tab[milieu]) return "trouvé";
        else if (tab[milieu] < n) {
            return (dicho(tab, n, milieu + 1, fin));
        }
        else if (tab[milieu] > n) {
            return (dicho(tab, n, debut, milieu - 1));
        }
    }

    function naif(tab, n) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i] == n) {
                return "trouvé";
            }
        }
        return "non trouvé";
    }

    chercher.addEventListener("click", function () {
        n = chercherInput.value;
        console.log(n);
        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            sixTab(0, n);
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader")
        }, 3000);

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

    printBulle.addEventListener("click", function () {

        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            sixTab(1);
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader")
        }, 3000);
    })

    printInsert.addEventListener("click", function () {
        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            sixTab(2);
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader")
        }, 500);
    })

    printFusion.addEventListener("click", function () {
        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            sixTab(3);
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader")
        }, 500);
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