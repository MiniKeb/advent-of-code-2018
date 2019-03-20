const input = require("./input");

describe("reaction", () => {
  it("fait disparaître si même type et polarité différente", () => {
    expect(reagit("aA")).toBe(true);
    expect(reagit("Aa")).toBe(true);
    expect(reagit("cC")).toBe(true);
  });

  it("ne fait pas disparaître si type différent", () => {
    expect(reagit("ab")).toBe(false);
  });

  it("ne fait pas disparaître si même polarité", () => {
    expect(reagit("BB")).toBe(false);
  });
});
describe("réduction", () => {
  it("avec seulement une réaction niveau 1", () => {
    expect(reduction("AcCd")).toBe("Ad");
    expect(reduction("daba")).toBe("daba");
  });

  it("avec une réaction de niveau 2", () => {
    expect(reduction("AcCaf")).toBe("f");
  });

  it("avec une réaction de niveau 3", () => {
    expect(reduction("dfgGFD")).toBe("");
  });

  it("réduction de l'exemple", () => {
    expect(reduction("dabAcCaCBAcCcaDA")).toBe("dabCBAcaDA");
  });
});

describe("compte des unites", () => {
  it("compte le nombre d'unités", () => {
    expect(reduction("AcCd").length).toBe(2);
  });

  it("donne la réponse", () => {
    expect(reduction(input).length).toBe(10384);
  });
});


function reduction(sequence) {
  let previousIndex = 0;
  let currentIndex = 0;
  let nextIndex = currentIndex + 1;
  let array = [...sequence];

  while(nextIndex < array.length){
    if(reagit([array[currentIndex], array[nextIndex]])){
      array[currentIndex] = undefined;
      array[nextIndex] = undefined;
      while(array[previousIndex] === undefined && previousIndex > 0){
        previousIndex--;
      }
      currentIndex = previousIndex;
      nextIndex++;
    }else{
      previousIndex = currentIndex;
      currentIndex = nextIndex;
      nextIndex++;
    }
  }

  return array.filter(c => c !== undefined).join("");
}


function reagit([gauche, droite]) {
  return gauche !== undefined
      && droite !== undefined
      && Math.abs(gauche.charCodeAt(0) - droite.charCodeAt(0)) === 32;
}
