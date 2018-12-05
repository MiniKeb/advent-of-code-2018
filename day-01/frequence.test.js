function frequence(changements) {
  return changements.reduce((total, changement) => total + changement, 0);
}

describe("fréquence", () => {
  it("calcule la frequence résultante", () => {
    const changements = [1, 2];
    expect(frequence(changements)).toBe(3);
  });
});
