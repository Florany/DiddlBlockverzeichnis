const inhalt = document.getElementById("inhalt");

sammlung.forEach(serie => {

    const abschnitt = document.createElement("section");

    abschnitt.innerHTML = `
    

        <div class="inhalt">

                <h2>${serie.datum}</h2>

                <h3>A4</h3>
                <div class="grid"></div>

                <h3>A5</h3>
                <div class="grid"></div>

                <h4>Duftblöcke</h4>
                <div class="grid"></div>

                <h3>A6</h3>
                <div class="grid"></div>

                <h4>Duftblöcke</h4>
                <div class="grid"></div>

                <h4>Spezialblöcke</h4>
                <div class="grid"></div>

        </div>
    `;

    inhalt.appendChild(abschnitt);

    const grids = abschnitt.querySelectorAll(".grid");

    fuelleGrid(grids[0], serie.a5.normale);
    fuelleGrid(grids[1], serie.a5.duft);

    fuelleGrid(grids[2], serie.a6.normale);
    fuelleGrid(grids[3], serie.a6.duft);
    fuelleGrid(grids[4], serie.a6.sonder);

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
            const nummer = match[3];

            blatt = `${prefix}${groesse}B${nummer}${endung}`;
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