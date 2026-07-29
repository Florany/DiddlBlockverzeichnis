const inhalt = document.getElementById("inhalt");
const linkBloecke = document.querySelector(".kategorien a:nth-of-type(1)");
const linkBriefpapier = document.querySelector(".kategorien a:nth-of-type(2)");
const linkHaftnotizen = document.querySelector(".kategorien a:nth-of-type(3)");
const linkBlockboxen = document.querySelector(".kategorien a:nth-of-type(4)");

linkBloecke.addEventListener("click", (e) => {
    e.preventDefault();
    linkBloecke.classList.add("aktiv");
    linkBriefpapier.classList.remove("aktiv");
    linkHaftnotizen.classList.remove("aktiv");
    linkBlockboxen.classList.remove("aktiv");
    zeigeBloecke();
});

linkBriefpapier.addEventListener("click", (e) => {
    e.preventDefault();
    linkBriefpapier.classList.add("aktiv");
    linkBloecke.classList.remove("aktiv");
    linkHaftnotizen.classList.remove("aktiv");
    linkBlockboxen.classList.remove("aktiv");
    zeigeBriefpapier();
});

linkHaftnotizen.addEventListener("click", (e) => {
    e.preventDefault();
    linkHaftnotizen.classList.add("aktiv");
    linkBloecke.classList.remove("aktiv");
    linkBriefpapier.classList.remove("aktiv");
    linkBlockboxen.classList.remove("aktiv");
    zeigeHaftnotizen();
});

linkBlockboxen.addEventListener("click", (e) => {
    e.preventDefault();
    linkBlockboxen.classList.add("aktiv");
    linkBloecke.classList.remove("aktiv");
    linkBriefpapier.classList.remove("aktiv");
    linkHaftnotizen.classList.remove("aktiv");
    zeigeBlockboxen();
});

function zeigeBloecke() {

    inhalt.innerHTML = "";

    sammlung.forEach(serie => {

        const abschnitt = document.createElement("section");
        const wrapper = document.createElement("div");
        wrapper.className = "inhalt";

        const h2 = document.createElement("h2");
        h2.textContent = serie.datum;
        wrapper.appendChild(h2);

            ["a4", "a5", "a6"].forEach(groesse => {

                const daten = serie[groesse];

                if (!daten) return;

                // Normale Blöcke
                if (daten.normale && daten.normale.length > 0) {

                    const h3 = document.createElement("h3");
                    h3.textContent = groesse.toUpperCase();
                    wrapper.appendChild(h3);

                    const grid = document.createElement("div");
                    grid.className = "grid";

                    setzeSpalten(grid, daten.normale.length);

                    wrapper.appendChild(grid);

                    fuelleGrid(grid, daten.normale);
                }

                // Spezialblöcke
                if (daten.sonder && daten.sonder.length > 0) {

                    const h4 = document.createElement("h4");
                    h4.textContent = "Spezialblöcke";
                    wrapper.appendChild(h4);

                    const grid = document.createElement("div");
                    grid.className = "grid";

                    setzeSpalten(grid, daten.sonder.length);

                    wrapper.appendChild(grid);

                    fuelleGrid(grid, daten.sonder);
                }

            });

            abschnitt.appendChild(wrapper);
            inhalt.appendChild(abschnitt);


    });

}

function zeigeBriefpapier() {

    inhalt.innerHTML = "";

    briefpapier.forEach((serie, index) => {

        const abschnitt = document.createElement("section");
        const wrapper = document.createElement("div");
        wrapper.className = "inhalt";

        const h2 = document.createElement("h2");
        h2.textContent = serie.datum;
        wrapper.appendChild(h2);

        const grid = document.createElement("div");
        grid.className = "grid";
        
        setzeSpaltenEinzelbild(grid, serie.normale.length);
        
        wrapper.appendChild(grid);

        serie.normale.forEach(eintrag => {
        grid.appendChild(erstelleKarte(eintrag, "karte-briefpapier"));

        });

        if (index < briefpapier.length - 1) {
            const linie = document.createElement("h3");
            linie.className = "trennlinie";
            wrapper.appendChild(linie);
        }

        abschnitt.appendChild(wrapper);
        inhalt.appendChild(abschnitt);

    });

}

function zeigeHaftnotizen() {

    inhalt.innerHTML = "";

    haftnotizen.forEach((serie, index) => {

        const abschnitt = document.createElement("section");
        const wrapper = document.createElement("div");
        wrapper.className = "inhalt";

        const h2 = document.createElement("h2");
        h2.textContent = serie.datum;
        wrapper.appendChild(h2);

        const grid = document.createElement("div");
        grid.className = "grid";
        
        setzeSpaltenEinzelbild(grid, serie.normale.length);

        wrapper.appendChild(grid);

        serie.normale.forEach(eintrag => {
        grid.appendChild(erstelleKarte(eintrag, "karte-haftnotizen"));
        

        });

        if (index < haftnotizen.length - 1) {
            const linie = document.createElement("h3");
            linie.className = "trennlinie";
            wrapper.appendChild(linie);
        }

        abschnitt.appendChild(wrapper);
        inhalt.appendChild(abschnitt);

    });

}

function zeigeBlockboxen() {

    inhalt.innerHTML = "";

    blockboxen.forEach((serie, index) => {

        const abschnitt = document.createElement("section");
        const wrapper = document.createElement("div");
        wrapper.className = "inhalt";

        const h2 = document.createElement("h2");
        h2.textContent = serie.datum;
        wrapper.appendChild(h2);

        const grid = document.createElement("div");
        grid.className = "grid";

        setzeSpaltenEinzelbild(grid, serie.normale.length);
        
        wrapper.appendChild(grid);

        serie.normale.forEach(eintrag => {
        grid.appendChild(erstelleKarte(eintrag, "karte-blockboxen"));

        });

        if (index < blockboxen.length - 1) {
            const linie = document.createElement("h3");
            linie.className = "trennlinie";
            wrapper.appendChild(linie);
        }

        abschnitt.appendChild(wrapper);
        inhalt.appendChild(abschnitt);

    });

}


function setzeSpalten(grid, anzahl) {

    let spalten;

    if (window.innerWidth <= 900) {

        // Handy
        if (anzahl <= 1) {
            spalten = 1;
        } else if (anzahl === 2) {
            spalten = 2;
        } else if (anzahl === 4) {
            spalten = 2;
        } else {
            spalten = 3;
        }

        grid.style.gridTemplateColumns = `repeat(${spalten}, 80px)`;

    } else {

        // Desktop
        if (anzahl === 4) {
        spalten = 4;
        } else if (anzahl >= 6 && anzahl % 2 === 0) {
            spalten = anzahl / 2;
        } else {
            spalten = anzahl;
        }

        grid.style.gridTemplateColumns = `repeat(${spalten}, 200px)`;
    
    }

}

function setzeSpaltenEinzelbild(grid, anzahl) {

    const breite = window.innerWidth <= 900 ? 150 : 280;

    grid.style.gridTemplateColumns = `repeat(${anzahl}, ${breite}px)`;

}

function fuelleGrid(container, bloecke) {

    bloecke.forEach(dateiname => {

        const karte = document.createElement("div");
        karte.className = "karte";

        karte.innerHTML = `
            <img src="bilder/${dateiname}.png" alt="${dateiname}">
        `;

        container.appendChild(karte);

    });

}

function erstelleKarte(datei, klasse) {

    const dateiname = typeof datei === "string"
        ? datei
        : datei.name;

    const karte = document.createElement("div");
    karte.className = `karte ${klasse}`;

    if (typeof datei === "object" && datei.ohneRand) {
        karte.classList.add("ohne-rand");
    }

    karte.innerHTML = `
        <img src="bilder/${dateiname}.png" alt="${dateiname}">
    `;

    return karte;

}

zeigeBloecke();