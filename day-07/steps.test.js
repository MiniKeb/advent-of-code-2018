describe("steps", () => {
  it("crée un step d'apès une instruction", () => {
    const instruction = "Step C must be finished before step A can begin.";

    expect(step(instruction)).toEqual({
      step: "A",
      prerequis: ["C"]
    });
  });
});

function step(instruction) {
  const regexp = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/g;

  const captures = regexp.exec(instruction);
  return {
    step: captures[2],
    prerequis: [captures[1]]
  };
}
