const input = require("../day-01/input");

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

  it("détecte une répétition de fréquence", () => {
    const sequence = [1, -2, 3, 1];
    expect(twice(sequence)).toBe(2);
  });

  it("donne la solution", () => {
    expect(twice(input)).toBe(256);
  });
});

function twice(variations) {
  const seq = infini(variations);
  const frequences = [];

  let courante = seq.next();

  while (!courante.done) {
    const precedente =
      frequences.length === 0 ? 0 : frequences[frequences.length - 1];
    const variation = precedente + courante.value;

    if (frequences.includes(variation)) return variation;

    frequences.push(variation);
    courante = seq.next();
  }
}

function* infini(tableau) {
  while (true) {
    for (let i = 0; i < tableau.length; i++) yield tableau[i];
  }
}
