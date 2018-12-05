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
    })
  });
});

function polymere(chaine) {
  let reduire = function (sequence) {
    let resultat = "";
    for (let i = 0; i < sequence.length;) {
      const neReagitPas = reaction(sequence[i] + sequence[i + 1]) !== "";
      if (neReagitPas) {
        resultat += sequence[i];
        i++;
      } else i += 2;
    }

    return resultat;
  };


  let reduction = reduire(chaine);
  if (reduction !== chaine) {
    reduction = reduire(reduction)
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
