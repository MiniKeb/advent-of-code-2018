const input = require("./input");

describe("reaction", () => {
  it("fait disparaître si même type et polarité différente", () => {
    expect(reagit("aA")).toBe(true);
    expect(reagit("Aa")).toBe(true);
    expect(reagit("cC")).toBe(true);
  });

  it("ne fait pas disparaître si type différent", () => {
    expect(reagit("ab")).toBe(false);
  });

  it("ne fait pas disparaître si même polarité", () => {
    expect(reagit("BB")).toBe(false);
  });
});
describe("réduction", () => {
  it("avec seulement une réaction niveau 1", () => {
    expect(reduction("AcCd")).toBe("Ad");
    expect(reduction("daba")).toBe("daba");
  });

  it("avec une réaction de niveau 2", () => {
    expect(reduction("AcCaf")).toBe("f");
  });

  it("avec une réaction de niveau 3", () => {
    expect(reduction("dfgGFD")).toBe("");
  });

  it("réduction de l'exemple", () => {
    expect(reduction("dabAcCaCBAcCcaDA")).toBe("dabCBAcaDA");
  });
});

describe("compte des unites", () => {
  it("compte le nombre d'unités", () => {
    expect(reduction("AcCd").length).toBe(2);
  });

  it("donne la réponse", () => {
    expect(reduction(input).length).toBe(10384);
  });
});

function reduction(sequence) {
  let precedente = sequence;
  let courante = reduire(sequence);
  while (precedente !== courante) {
    precedente = courante;
    courante = reduire(courante);
  }

  return courante;
}

function reduire(sequence) {
  let reduction = "";
  for (let i = 0; i < sequence.length; ) {
    if (!reagit(sequence[i] + sequence[i + 1])) {
      reduction += sequence[i];
      i++;
    } else i += 2;
  }

  return reduction;
}

function reagit(unites) {
  const gauche = unites[0];
  const droite = unites[1];

  const memeType = gauche.toUpperCase() === droite.toUpperCase();

  const polariteDifferente =
    gauche !== droite &&
    (gauche.toUpperCase() === droite || gauche === droite.toUpperCase());

  return memeType && polariteDifferente
}
