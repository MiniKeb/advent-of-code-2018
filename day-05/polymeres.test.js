describe("reaction", () => {
  it("fait disparaître si même type et polarité différente", () => {
    expect(reaction("aA")).toBe("");
    expect(reaction("Aa")).toBe("");
  });

  it("ne fait pas disparaître si type différent", () => {
    expect(reaction("ab")).toBe("ab");
  });

  it("ne fait pas disparaître si même polarité", () => {
    expect(reaction("BB")).toBe("BB");
  });
});

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
