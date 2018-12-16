describe("steps", () => {
  const exercice = [
    "Step C must be finished before step A can begin.",
    "Step C must be finished before step F can begin.",
    "Step A must be finished before step B can begin.",
    "Step A must be finished before step D can begin.",
    "Step B must be finished before step E can begin.",
    "Step D must be finished before step E can begin.",
    "Step F must be finished before step E can begin."
  ];

  it("extrait un step d'apès une instruction", () => {
    const instruction = "Step C must be finished before step A can begin.";

    expect(extrait(instruction)).toEqual({
      step: "A",
      precedent: "C"
    });
  });

  it("crée une structure de steps d'après plusieurs instructions", () => {
    expect(structure(exercice)).toEqual({
      ["C"]: { precedents: [] },
      ["A"]: { precedents: ["C"] },
      ["F"]: { precedents: ["C"] },
      ["B"]: { precedents: ["A"] },
      ["D"]: { precedents: ["A"] },
      ["E"]: { precedents: ["B", "D", "F"] }
    });
  });

  it("prend comme prochain step celui sans précédents", () => {
    const unSansPrecedent = {
      C: { precedents: [] },
      A: { precedents: ["C"] }
    };

    expect(nextStep(unSansPrecedent)).toBe("C");
  });

  it("prend la première lettre quand plusieurs steps sont disponibles", () => {
    const avecEgalite = {
      C: { precedents: [] },
      A: { precedents: [] }
    };

    expect(nextStep(avecEgalite)).toBe("A");
  });

  it("nettoie une structure", () => {
    const unSansPrecedent = {
      C: { precedents: [] },
      A: { precedents: ["C"] }
    };

    expect(nettoyer(unSansPrecedent, "C")).toEqual({
      A: { precedents: [] }
    });
  });

  it("calcule un parcours", () => {
    expect(parcours(exercice)).toBe("CABDFE");
  });
});

function parcours(instructions) {
  let parcours = "";
  let trajet = structure(instructions);
  let next = nextStep(trajet);
  while (next) {
    parcours += next;
    trajet = nettoyer(trajet, next);
    next = nextStep(trajet);
  }
  return parcours;
}

function nettoyer(structure, cible) {
  const precedentsNettoyes = Object.entries(structure).reduce(
    (resultat, [cle, valeur]) => {
      return {
        ...resultat,
        [cle]: { precedents: valeur.precedents.filter(p => p !== cible) }
      };
    },
    {}
  );

  return Object.entries(precedentsNettoyes).reduce(
    (resultat, [cle, valeur]) => {
      if (cle === cible) return resultat;
      else
        return {
          ...resultat,
          [cle]: valeur
        };
    },
    {}
  );
}

function nextStep(structure) {
  const disponibles = Object.entries(structure).filter(
    ([key, { precedents }]) => precedents.length === 0
  );

  if (disponibles.length === 0) return null;

  let choisie = disponibles[0][0];
  if (disponibles.length > 0) {
    choisie = disponibles.reduce(
      (mini, [cle]) => (mini.charCodeAt(0) < cle.charCodeAt(0) ? mini : cle),
      disponibles[0][0]
    );
  }
  return choisie;
}

function structure(instructions) {
  return instructions.reduce((structure, instruction) => {
    const { step, precedent } = extrait(instruction);
    structure[step] = {
      precedents: structure[step]
        ? [...structure[step].precedents, precedent]
        : [precedent]
    };

    structure[precedent] = {
      precedents: structure[precedent] ? structure[precedent].precedents : []
    };
    return structure;
  }, {});
}

function extrait(instruction) {
  const regexp = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/g;

  const captures = regexp.exec(instruction);
  return {
    step: captures[2],
    precedent: captures[1]
  };
}
