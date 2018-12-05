const input = require("./input");

describe("reaction", () => {
  it("fait disparaître si même type et polarité différente", () => {
    expect(reaction("aA")).toBe("");
    expect(reaction("Aa")).toBe("");
    expect(reaction("cC")).toBe("");
  });

  it("ne fait pas disparaître si type différent", () => {
    expect(reaction("ab")).toBe("ab");
  });

  it("ne fait pas disparaître si même polarité", () => {
    expect(reaction("BB")).toBe("BB");
  });
});
describe("polymere", () => {
  describe("réduction", () => {
    it("avec seulement une réaction niveau 1", () => {
      expect(polymere("AcCd")).toBe("Ad");
      expect(polymere("daba")).toBe("daba");
    });

    it("avec une réaction de niveau 2", () => {
      expect(polymere("AcCaf")).toBe("f");
    });

    it("avec une réaction de niveau 3", () => {
      expect(polymere("dfgGFD")).toBe("");
    });

    it("réduction de l'exemple", () => {
      expect(polymere("dabAcCaCBAcCcaDA")).toBe("dabCBAcaDA");
    });
  });

  describe("compte des unites", () => {
    it("compte le nombre d'unités", () => {
      expect(polymere("AcCd").length).toBe(2);
    });

    it("donne la réponse", () => {
      expect(polymere(input).length).toBe(10384);
    });
  });
});

function polymere(chaine) {
  let precedente = chaine;
  let reduction = reduire(chaine);
  while (precedente !== reduction) {
    precedente = reduction;
    reduction = reduire(reduction);
  }

  return reduction;
}

function reduire(sequence) {
  let reduction = "";
  for (let i = 0; i < sequence.length; ) {
    const neReagitPas = reaction(sequence[i] + sequence[i + 1]) !== "";
    if (neReagitPas) {
      reduction += sequence[i];
      i++;
    } else i += 2;
  }

  return reduction;
}

function reaction(unites) {
  const gauche = unites[0];
  const droite = unites[1];

  const memeType = gauche.toUpperCase() === droite.toUpperCase();

  const polariteDifferente =
    gauche !== droite &&
    (gauche.toUpperCase() === droite || gauche === droite.toUpperCase());

  if (memeType && polariteDifferente) return "";

  return unites;
}
