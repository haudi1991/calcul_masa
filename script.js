function numaraZileLucratoare(an, luna) {
    const primaZi = new Date(an, luna - 1, 1);
    const ultimaZi = new Date(an, luna, 0);
    let zileLucratoare = 0;

    for (let zi = primaZi; zi <= ultimaZi; zi.setDate(zi.getDate() + 1)) {
        if (zi.getDay() !== 0 && zi.getDay() !== 6) {
            zileLucratoare++;
        }
    }
    return zileLucratoare;
}

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prezenteLunaTrecuta = parseInt(document.getElementById('prezente_luna_trecuta').value) || 0;
    const vacantaLunaTrecuta = parseInt(document.getElementById('vacanta_luna_trecuta').value) || 0;
    const vacantaLunaCurenta = parseInt(document.getElementById('vacanta_luna_curenta').value) || 0;

    const dataCurenta = new Date();
    const anCurent = dataCurenta.getFullYear();
    const lunaTrecuta = dataCurenta.getMonth();
    const lunaCurenta = lunaTrecuta + 1;

    const zileLucratoareLunaTrecuta = numaraZileLucratoare(anCurent, lunaTrecuta);
    const zileLucratoareLunaCurenta = numaraZileLucratoare(anCurent, lunaCurenta);

    const absenteLunaTrecuta = zileLucratoareLunaTrecuta - prezenteLunaTrecuta - vacantaLunaTrecuta;
    const zileDePlata = zileLucratoareLunaCurenta - vacantaLunaCurenta;
    const costTotal = zileDePlata * 50; // Exemplu: 50 lei pe zi

    document.getElementById('zile_lucratoare_luna_trecuta').innerText = zileLucratoareLunaTrecuta;
    document.getElementById('prezente_luna_trecuta_res').innerText = prezenteLunaTrecuta;
    document.getElementById('absente_luna_trecuta').innerText = absenteLunaTrecuta;
    document.getElementById('zile_lucratoare_luna_curenta').innerText = zileLucratoareLunaCurenta;
    document.getElementById('vacanta_luna_curenta_res').innerText = vacantaLunaCurenta;
    document.getElementById('zile_de_plata').innerText = zileDePlata;
    document.getElementById('cost_total').innerText = costTotal;

    document.getElementById('results').style.display = "block";
});
