describe("twice", () => {
  it("génère une séquence infinie", () => {
    expect(infini([1, 2]).next().value).toBe(1);

    const infiniDeux = infini([1, 2]);
    infiniDeux.next();
    expect(infiniDeux.next().value).toBe(2);

    const infiniTrois = infini([1, 2]);
    infiniTrois.next();
    infiniTrois.next();
    expect(infiniTrois.next().value).toBe(1);
  });
});

function* infini(tableau) {
  while (true) {
    for (let i = 0; i < tableau.length; i++) yield tableau[i];
  }
}
