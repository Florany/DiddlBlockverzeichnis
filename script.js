const inhalt = document.getElementById("inhalt");

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
            wrapper.appendChild(grid);

            fuelleGrid(grid, daten.normale);
        }

        // Duftblöcke
        if (daten.duft && daten.duft.length > 0) {

            const h4 = document.createElement("h4");
            h4.textContent = "Duftblöcke";
            wrapper.appendChild(h4);

            const grid = document.createElement("div");
            grid.className = "grid";
            wrapper.appendChild(grid);

            fuelleGrid(grid, daten.duft);
        }

        // Spezialblöcke
        if (daten.sonder && daten.sonder.length > 0) {

            const h4 = document.createElement("h4");
            h4.textContent = "Spezialblöcke";
            wrapper.appendChild(h4);

            const grid = document.createElement("div");
            grid.className = "grid";
            wrapper.appendChild(grid);

            fuelleGrid(grid, daten.sonder);
        }

    });

    abschnitt.appendChild(wrapper);
    inhalt.appendChild(abschnitt);

});


function fuelleGrid(container, bloecke) {

    bloecke.forEach(dateiname => {

        const karte = document.createElement("div");
        karte.className = "karte";

        const dateiOhneEndung = dateiname.substring(0, dateiname.lastIndexOf("."));
        const endung = dateiname.substring(dateiname.lastIndexOf("."));

        const nummer = dateiOhneEndung.slice(-2);

        const match = dateiOhneEndung.match(/^([A-Z]+)([456])(\d{2})$/);

        let blatt = "";

        if (match) {
            const prefix = match[1];
            const groesse = match[2];
            const blockNummer = match[3];

            blatt = `${prefix}${groesse}B${blockNummer}${endung}`;
        }

        karte.innerHTML = `
        <div class="bilder-paar">
        <img src="bilder/${dateiname}" alt="${nummer}">
        <img src="bilder/${blatt}" alt="Blatt ${nummer}" onerror="this.style.display='none'">
        </div>
        `;

        container.appendChild(karte);

    });

}