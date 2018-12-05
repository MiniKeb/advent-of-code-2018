const input = require("./input");

describe("fréquence", () => {
  it("calcule la frequence résultante", () => {
    const changements = [1, 2];
    expect(frequence(changements)).toBe(3);
  });
  it("donne la solution", () => {
    expect(frequence(input)).toBe(433);
  });
});

function frequence(changements) {
  return changements.reduce((total, changement) => total + changement, 0);
}
