describe("steps", () => {
  it("extrait un step d'apès une instruction", () => {
    const instruction = "Step C must be finished before step A can begin.";

    expect(extrait(instruction)).toEqual({
      step: "A",
      precedent: "C"
    });
  });

  it("crée une structure de steps d'après plusieurs instructions", () => {
    const instructions = [
      "Step C must be finished before step A can begin.",
      "Step C must be finished before step F can begin.",
      "Step A must be finished before step B can begin.",
      "Step A must be finished before step D can begin.",
      "Step B must be finished before step E can begin.",
      "Step D must be finished before step E can begin.",
      "Step F must be finished before step E can begin."
    ];

    expect(structure(instructions)).toEqual({
      ["C"]: { precedents: [] },
      ["A"]: { precedents: ["C"] },
      ["F"]: { precedents: ["C"] },
      ["B"]: { precedents: ["A"] },
      ["D"]: { precedents: ["A"] },
      ["E"]: { precedents: ["B", "D", "F"] }
    });
  });
});

function structure(instructions) {
  return instructions.reduce((structure, instruction) => {
    const {step, precedent} = extrait(instruction);
    structure[step] = {
      precedents: structure[step]
        ? [...structure[step].precedents, precedent]
        : [precedent]
    };

    structure[precedent] = {
      precedents: structure[precedent]
        ? structure[precedent].precedents
        : []
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
