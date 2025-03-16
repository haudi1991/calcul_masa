// Variabile globale pentru stocarea datelor
let rezultateCalculate = {};

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

function incrementValue(id) {
    const input = document.getElementById(id);
    input.value = (parseInt(input.value) || 0) + 1;
}

function decrementValue(id) {
    const input = document.getElementById(id);
    const currentValue = parseInt(input.value) || 0;
    if (currentValue > 0) {
        input.value = currentValue - 1;
    }
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
    
    // Salvăm rezultatele pentru a le folosi în afișarea detaliilor
    rezultateCalculate = {
        lunaTrecuta,
        anTrecut,
        lunaCurenta,
        anCurent,
        zileLucratoareLunaTrecuta,
        zileLucratoareLunaCurenta,
        prezenteLunaTrecuta,
        absenteLunaTrecuta,
        vacantaLunaTrecuta,
        vacantaLunaCurenta,
        zileDePlata,
        costPeZi,
        costTotal
    };
    
    // Afișăm doar costul total
    const rezultatSimpluDiv = document.getElementById("rezultat-simplu");
    rezultatSimpluDiv.innerHTML = `
        <div class="cost-total">Cost total: ${costTotal} lei</div>
        <button class="details" onclick="afiseazaDetalii()">Afișează detalii</button>
    `;
    rezultatSimpluDiv.classList.add("active");
    
    // Resetăm detaliile dacă sunt vizibile
    const rezultateDetaliateDiv = document.getElementById("rezultate-detaliate");
    rezultateDetaliateDiv.classList.remove("active");
    
    // Smooth scroll to results
    setTimeout(() => {
        rezultatSimpluDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function afiseazaDetalii() {
    const r = rezultateCalculate;
    
    const rezultateDetaliateDiv = document.getElementById("rezultate-detaliate");
    rezultateDetaliateDiv.innerHTML = `
        <div class="result-container">
            <div class="result-item"><strong>[INFO]</strong> Luna ${r.lunaTrecuta}/${r.anTrecut} a avut ${r.zileLucratoareLunaTrecuta} zile lucrătoare.</div>
            <div class="result-item"><strong>[INFO]</strong> Copilul a avut ${r.prezenteLunaTrecuta} zile de prezență, deci ${r.absenteLunaTrecuta} absențe.</div>
            <div class="result-item"><strong>[INFO]</strong> Luna ${r.lunaCurenta}/${r.anCurent} are ${r.zileLucratoareLunaCurenta + r.vacantaLunaCurenta} zile lucrătoare în total.</div>
            <div class="result-item"><strong>[INFO]</strong> Zile de vacanță pentru luna trecută: ${r.vacantaLunaTrecuta}</div>
            <div class="result-item"><strong>[INFO]</strong> Zile de vacanță pentru luna curentă: ${r.vacantaLunaCurenta}</div>
            <div class="result-item"><strong>[INFO]</strong> Zile de plată: ${r.zileDePlata}</div>
        </div>
        
        <div class="formula-container">
            <div class="result-item"><strong>[FORMULA]</strong> Cost total = (Zile de plată + Zile de vacanță luna trecută) * Cost pe zi</div>
            <div class="result-item"><strong>[FORMULA DETALIATĂ]</strong> Cost total = (${r.zileDePlata} + ${r.vacantaLunaTrecuta}) * ${r.costPeZi}</div>
            <div class="result-item"><strong>[FORMULA DETALIATĂ]</strong> Cost total = ${r.costTotal} lei</div>
        </div>
    `;
    
    rezultateDetaliateDiv.classList.add("active");
    
    // Smooth
