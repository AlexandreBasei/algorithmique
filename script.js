let etat = 0;

document.addEventListener("DOMContentLoaded", function () {

    //Déclaration des variables

    const chercher = document.getElementById("chercher");
    const chercherInput = document.getElementById("chercherInput");
    const afficherGraphe = document.getElementById("afficherGraphe");

    const dichoCanva = document.getElementById("dichoChart");
    const triCanva = document.getElementById("triChart");

    accueil = document.getElementById("accueil");
    const recherche = document.getElementById("recherche");
    const next = document.getElementById("next");
    const demarrer = document.getElementById("demarrer");
    const back = document.getElementById("back");

    let dichoChart;
    let triChart;

    // Cette fonction génère un tableau de taille n contenant des nombres aléatoires entre 0 et 100
    const createTab = (n) => {
        let tab = []
        for (let i = 0; i < n; i++) {
            tab[i] = Math.floor(Math.random() * 100);
        }
        return tab;
    }

    // Cette fonction génère un tableau de taille n contenant des nombres aléatoires entre 0 et 100, trié par ordre croissant
    const createTabTrié = (n) => {
        let tabTrié = [];
        for (let i = 0; i < n; i++) {
            tabTrié.push(Math.floor(Math.random() * 101));
        }
        tabTrié.sort((a, b) => a - b);
        return tabTrié;
    }

    // Cette fonction crée 4 tableaux contenant eux-même des tableaux de taille croissante et permet de générer des graphes ChartJS affichant le temps d'exécution de différentes fonction en fonction de la taille des données. Pour cela le temps d'exéctution de chaque fonction est stocké dans un tableau, qui sera ensuite utilisé dans les graphes
    const genGraph = (tri, etat, n) => {
        let tab = [createTab(5000), createTab(10000), createTab(50000), createTab(100000)];
        let tab2 = [createTab(5000), createTab(10000), createTab(50000), createTab(100000), createTab(500000)];
        let tab3 = [createTab(5000), createTab(10000), createTab(50000), createTab(100000), createTab(500000), createTab(1000000), createTab(10000000)];
        let tab0 = [createTabTrié(5000), createTabTrié(10000), createTabTrié(50000), createTabTrié(100000), createTabTrié(500000), createTabTrié(10000000)];
        let start;
        let end;

        //Mise à jour du graphe
        if (tri == 0 && etat == 1) {
            let tempsTab = [];
            let tempsTab1 = [];

            for (let i = 0; i < 6; i++) {
                start = performance.now();
                dicho(tab0[i], n);
                end = performance.now();
                tempsTab.push(end - start);
            }

            for (let i = 0; i < 6; i++) {
                start = performance.now();
                naif(tab0[i], n);
                end = performance.now();
                tempsTab1.push(end - start);
            }

            dichoChart.data.datasets.forEach((dataset, index) => {
                if (index === 0) {
                    dataset.data = tempsTab;
                } else if (index === 1) {
                    dataset.data = tempsTab1;
                }
            });
            dichoChart.update();
        }

        // Ici on crée un graphe permettant de comparer la recherche dichotomique et la recherche naive dans un tableau trié
        else if (tri === 0 && etat == 0) {
            let tempsTab = [];
            let tempsTab1 = [];

            for (let i = 0; i < 6; i++) {
                start = performance.now();
                dicho(tab0[i], n);
                end = performance.now();
                tempsTab.push(end - start);
            }

            for (let i = 0; i < 6; i++) {
                start = performance.now();
                naif(tab0[i], n);
                end = performance.now();
                tempsTab1.push(end - start);
            }

            dichoChart = new Chart(dichoCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10000", "50 000", "100 000", "500 000", "1 000 000"],
                    datasets: [
                        {
                            label: "Durée de la recherche dichotomique(en ms)",
                            data: tempsTab,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: "Durée de la recherche naïve (en ms)",
                            data: tempsTab1,
                            fill: false,
                            borderColor: 'rgb(75,30,183)',
                            tension: 0.1
                        }
                    ]
                },
            });
        }

        //Mise à jour du graphe
        else if (tri == 1 && etat == 2) {

            let tempsTab = [];
            let tempsTab1 = [];
            let tempsTab2 = [];

            //Ici tri à bulles
            for (let i = 0; i < 4; i++) {
                start = performance.now();
                trierBulle(tab[i]);
                end = performance.now();
                tempsTab.push(end - start);
            }

            //Ici tri par insertion
            for (let i = 0; i < 5; i++) {
                start = performance.now();
                trierInsert(tab2[i]);
                end = performance.now();
                tempsTab1.push(end - start);
            }

            //Ici tri fusion
            for (let i = 0; i < 7; i++) {
                start = performance.now();
                trierFusion(tab3[i]);
                end = performance.now();
                tempsTab2.push(end - start);
            }

            triChart.data.datasets.forEach((dataset, index) => {
                if (index === 0) {
                    dataset.data = tempsTab;
                } else if (index === 1) {
                    dataset.data = tempsTab1;
                }
                else if (index === 2) {
                    dataset.data = tempsTab2;
                }
            });

            triChart.update();
        }

        //Ensuite on crée un graphe pour chaque algorithme de tri, qui affiche la durée du tri en fonction de la taille des donénes

        else if (tri == 1 && etat == 1) {

            let tempsTab = [];
            let tempsTab1 = [];
            let tempsTab2 = [];

            //Ici tri à bulles
            for (let i = 0; i < 4; i++) {
                start = performance.now();
                trierBulle(tab[i]);
                end = performance.now();
                tempsTab.push(end - start);
            }

            //Ici tri par insertion
            for (let i = 0; i < 5; i++) {
                start = performance.now();
                trierInsert(tab2[i]);
                end = performance.now();
                tempsTab1.push(end - start);
            }

            //Ici tri fusion
            for (let i = 0; i < 7; i++) {
                start = performance.now();
                trierFusion(tab3[i]);
                end = performance.now();
                tempsTab2.push(end - start);
            }

            triChart = new Chart(triCanva, {
                type: 'line',
                data: {
                    labels: ["5000", "10 000", "50000", "100 000", "500 000", "1000 000", "10 000 000"],
                    datasets: [
                        {
                            label: "Temps du tri à bulle (en ms)",
                            data: tempsTab,
                            fill: false,
                            borderColor: 'rgb(255, 189, 51)',
                        },
                        {
                            label: "Temps du tri par insertion (en ms)",
                            data: tempsTab1,
                            fill: false,
                            borderColor: 'rgb(117, 255, 51)',
                        },
                        {
                            label: "Temps du tri fusion (en ms)",
                            data: tempsTab2,
                            fill: false,
                            borderColor: 'rgb(51, 255, 189)',
                        }
                    ]
                }
            });
        }
    }

    //Fonctions de tri

    //Tri à bulles : parcourt le tableau en comparant les éléments adjacents deux par deux. Si l'élément actuel est plus grand que le suivant, ils sont échangés.
    const trierBulle = (tab) => {
        let n = tab.length;

        for (let i = 0; i < n - 1; i++) {
            let swapped = false; // On vérifie s'il y a eu un échange dans cette itération

            // Parcours du tableau - 1 élément
            for (let j = 0; j < n - i - 1; j++) {
                // On compare les éléments adjacents
                if (tab[j] > tab[j + 1]) {
                    // On échange les éléments s'ils sont dans le mauvais ordre
                    let temp = tab[j];
                    tab[j] = tab[j + 1];
                    tab[j + 1] = temp;
                    swapped = true; // On indique qu'un échange a eu lieu dans cette itération
                }
            }

            // Si aucun échange n'a eu lieu dans cette itération, le tableau est trié, on sort de la boucle
            if (!swapped) {
                break;
            }
        }

        return tab; // On retourne le tableau trié
    }

    //Tri par insertion : trie un tableau en insérant un élément non trié à sa place dans la partie triée du tableau, de manière itérative.
    const trierInsert = (tab) => {

        // On parcours les éléments non triés, en commençant à l'index 1
        for (let i = 1; i < tab.length; i++) {
            // On sélectionne l'élément à insérer dans la partie triée
            let val = tab[i];
            let j = i - 1;

            // On déplace les éléments plus grands que la valeur courante vers la droite
            while (j >= 0 && tab[j] > val) {
                tab[j + 1] = tab[j];
                j--;
            }

            // On insert la valeur courante à sa position correcte dans la partie triée
            tab[j + 1] = val;
        }
        return tab;
    }

    // Fonction de tri fusion
    const trierFusion = (tab) => {
        // Si la longueur du tableau est inférieure ou égale à 1, le tableau est considéré comme trié
        if (tab.length <= 1) {
            return tab;
        }

        // On trouve le milieu du tableau
        let milieu = Math.floor(tab.length / 2);

        // On divise le tableau en deux parties : gauche et droite
        let gauche = tab.slice(0, milieu);
        let droite = tab.slice(milieu);

        // On trie récursivement chaque moitié
        let triGauche = trierFusion(gauche);
        let triDroite = trierFusion(droite);

        // On fusionne les moitiés triées
        return fusion(triGauche, triDroite);
    }

    // Fonction de fusion
    const fusion = (gauche, droite) => {
        let res = [];
        let iGauche = 0;
        let iDroite = 0;

        // Tant qu'il reste des éléments dans les deux moitiés à fusionner
        while (iGauche < gauche.length && iDroite < droite.length) {
            // On compare les éléments des deux moitiés
            if (gauche[iGauche] < droite[iDroite]) {
                // Si l'élément de la moitié gauche est plus petit, il est ajouté au tableau final (res)
                res.push(gauche[iGauche]);
                iGauche++; // On passe à l'élément suivant dans la moitié gauche
            } else {
                // Sinon, l'élément de la moitié droite est ajouté au tableau final (res)
                res.push(droite[iDroite]);
                iDroite++; // On passe à l'élément suivant dans la moitié droite
            }
        }

        // On concatène les éléments restants des deux moitiés
        return res.concat(gauche.slice(iGauche), droite.slice(iDroite));
    }

    //Fonctions de recherche dans un tableau trié

    //Recherche dichotomique : réalise une recherche dans un tableau trié, en divisant le tableau en deux à chaque itération et en continuant la recherche dans la moitié appropriée. À chaque itération on compare la valeur recherchée à l'élément situé au milieu du tableau, jusqu'à trouver la bonne valeur.
    const dicho = (tab, n, debut = 0, fin = tab.length - 1) => {

        // Si l'indice de début est supérieur à l'indice de fin, l'élément n'a pas été trouvé, on retourne -1
        if (debut > fin) return -1;

        // On récupère l'élément situé au milieu du tableau
        let milieu = Math.floor((debut + fin) / 2);

        // Si n est égal à l'élément situé au milieu du tableau, la valeur recherchée a été trouvée
        if (n == tab[milieu]) return "trouvé";

        // Si la valeur recherchée est plus grande que l'élément situé au milieu,
        // on effectue une recherche dans la moitié droite du tableau
        else if (tab[milieu] < n) {
            return (dicho(tab, n, milieu + 1, fin));
        }

        // Si la valeur recherchée est plus petite que l'élément du milieu,
        // on effectue une recherche dans la moitié gauche du tableau.
        else if (tab[milieu] > n) {
            return (dicho(tab, n, debut, milieu - 1));
        }
    }

    //Recherche naïve : on parcourt le tableau trié jusqu'à ce qu'on trouve l'élément recherché
    const naif = (tab, n) => {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i] == n) {
                return "trouvé";
            }
        }
    }

    //Fonctionnement des boutons sur la page html

    chercher.addEventListener("click", () => {
        n = chercherInput.value;
        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            genGraph(0, etat, n);
            etat = 1;
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader");
            dichoCanva.style.opacity = "1";
            document.querySelector("#pRecherche").style.display = "block";
            document.querySelector("#recherche div p").style.display = "block";
            next.style.display = "block";
        }, 600);
        
    })

    afficherGraphe.addEventListener("click", () => {

        document.querySelector("loader h3").style.display = "block";
        document.querySelector("loader").classList.add("loader");
        setTimeout(() => {
            genGraph(1, etat);
            etat = 2;
        }, 500);
        setTimeout(() => {
            document.querySelector("loader").classList.remove("loader");
            triCanva.style.opacity = "1";
            document.querySelector("loader h3").style.display = "none";
            document.querySelector("#tri div p").style.display = "block";
            document.querySelector("#pTri").style.display = "block";
            document.querySelector("#tri #back").style.display = "block";
        }, 3000);
        
    })

    demarrer.addEventListener("click", () => {
        accueil.classList.add("next");
    })

    next.addEventListener("click", () => {
        recherche.classList.add("next")
    })

    back.addEventListener("click", () => {
        recherche.classList.remove("next");
    })
})