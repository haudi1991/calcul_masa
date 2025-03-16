document.getElementById('calculeaza-btn').addEventListener('click', function() {
    // Citirea valorilor introduse
    const prezenteLunaTrecuta = parseInt(document.getElementById('prezente_luna_trecuta').value) || 0;
    const vacantaLunaTrecuta = parseInt(document.getElementById('vacanta_luna_trecuta').value) || 0;
    const vacantaLunaCurenta = parseInt(document.getElementById('vacanta_luna_curenta').value) || 0;

    const costPeZi = 20;

    const today = new Date();
    const anCurent = today.getFullYear();
    const lunaCurenta = today.getMonth() + 1;

    // Funcție pentru a număra zilele lucrătoare dintr-o lună
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

    const zileLucratoareLunaTrecuta = numaraZileLucratoare(anCurent - (lunaCurenta === 1 ? 1 : 0), lunaCurenta === 1 ? 12 : lunaCurenta - 1);
    const zileLucratoareLunaCurenta = numaraZileLucratoare(anCurent, lunaCurenta);

    const absenteLunaTrecuta = zileLucratoareLunaTrecuta - prezenteLunaTrecuta;
    let zileDePlata = Math.max(0, zileLucratoareLunaCurenta - absenteLunaTrecuta);
    zileDePlata -= vacantaLunaCurenta;

    const costTotal = (zileDePlata + vacantaLunaTrecuta) * costPeZi;

    // Afișarea rezultatului
    const rezultatElement = document.getElementById('rezultat');
    rezultatElement.innerHTML = `
        <p><strong>Cost total:</strong> ${costTotal} lei</p>
    `;

    // Afișarea detaliilor suplimentare la apăsarea butonului
    document.getElementById('detalii-btn').style.display = 'block';
    document.getElementById('detalii-btn').addEventListener('click', function() {
        const detaliiElement = document.getElementById('detalii');
        detaliiElement.style.display = 'block';
        detaliiElement.innerHTML = `
            <p><strong>Luna trecută:</strong> ${zileLucratoareLunaTrecuta} zile lucrătoare.</p>
            <p><strong>Prezențe luna trecută:</strong> ${prezenteLunaTrecuta} zile, <strong>Absențe:</strong> ${absenteLunaTrecuta} zile.</p>
            <p><strong>Luna curentă:</strong> ${zileLucratoareLunaCurenta} zile lucrătoare, <strong>Zile de vacanță:</strong> ${vacantaLunaCurenta}.</p>
            <p><strong>Zile de plată:</strong> ${zileDePlata} zile.</p>
            <p><strong>Formula utilizată:</strong> (Zile de plată + Zile de vacanță luna trecută) * Cost pe zi = ${costTotal} lei</p>
        `;
    });
});
