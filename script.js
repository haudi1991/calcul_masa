function numaraZileLucratoare(an, luna) {
    let primaZi = new Date(an, luna - 1, 1);
    let ultimaZi = new Date(an, luna, 0);
    let zileLucratoare = 0;

    for (let zi = primaZi.getDate(); zi <= ultimaZi.getDate(); zi++) {
        let data = new Date(an, luna - 1, zi);
        let ziuaSaptamanii = data.getDay();
        if (ziuaSaptamanii >= 1 && ziuaSaptamanii <= 5) {
            zileLucratoare++;
        }
    }
    return zileLucratoare;
}

function calculeaza() {
    let prezenteLunaTrecuta = parseInt(document.getElementById("prezente").value) || 0;
    let vacantaLunaTrecuta = parseInt(document.getElementById("vacanta_trecuta").value) || 0;
    let vacantaLunaCurenta = parseInt(document.getElementById("vacanta_curenta").value) || 0;

    let azi = new Date();
    let anCurent = azi.getFullYear();
    let lunaCurenta = azi.getMonth() + 1;

    let lunaTrecuta = lunaCurenta === 1 ? 12 : lunaCurenta - 1;
    let anTrecut = lunaCurenta === 1 ? anCurent - 1 : anCurent;

    let zileLucratoareLunaTrecuta = numaraZileLucratoare(anTrecut, lunaTrecuta);
    let zileLucratoareLunaCurenta = numaraZileLucratoare(anCurent, lunaCurenta) - vacantaLunaCurenta;

    let absenteLunaTrecuta = zileLucratoareLunaTrecuta - prezenteLunaTrecuta;
    let zileDePlata = Math.max(0, zileLucratoareLunaCurenta - absenteLunaTrecuta);

    let costPeZi = 20;
    let costTotal = (zileDePlata + vacantaLunaTrecuta) * costPeZi;

    document.getElementById("rezultate").innerHTML = `
        <p><strong>[INFO]</strong> Luna ${lunaTrecuta}/${anTrecut} a avut ${zileLucratoareLunaTrecuta} zile lucrătoare.</p>
        <p><strong>[INFO]</strong> Copilul a avut ${prezenteLunaTrecuta} zile de prezență, deci ${absenteLunaTrecuta} absențe.</p>
        <p><strong>[INFO]</strong> Luna ${lunaCurenta}/${anCurent} are ${zileLucratoareLunaCurenta + vacantaLunaCurenta} zile lucrătoare în total.</p>
        <p><strong>[INFO]</strong> Zile de vacanță pentru luna trecută: ${vacantaLunaTrecuta}</p>
        <p><strong>[INFO]</strong> Zile de vacanță pentru luna curentă: ${vacantaLunaCurenta}</p>
        <p><strong>[INFO]</strong> Zile de plată: ${zileDePlata}</p>
        <p><strong>[INFO]</strong> Cost total: ${costTotal} lei</p>
        <hr>
        <p><strong>[FORMULA]</strong> Cost total = (Zile de plată + Zile de vacanță luna trecută) * Cost pe zi</p>
        <p><strong>[FORMULA DETALIATĂ]</strong> Cost total = (${zileDePlata} + ${vacantaLunaTrecuta}) * ${costPeZi}</p>
        <p><strong>[FORMULA DETALIATĂ]</strong> Cost total = ${costTotal} lei</p>
    `;
}
