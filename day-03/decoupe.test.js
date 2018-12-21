describe("découpe", () => {
  it("parse une claim", () => {
    const claimText = "#1 @ 483,830: 24x18";

    expect(parserClaim(claimText)).toEqual({
      position: {
        gauche: 483,
        haut: 830
      },
      taille: {
        largeur: 24,
        hauteur: 18
      }
    });
  });
});

function parserClaim(claimText) {
  const decoupeDeClaim = /^#\d+ @ (\d+),(\d+): (\d+)x(\d+)$/g;

  const captures = decoupeDeClaim.exec(claimText);

  return {
    position: {
      gauche: Number(captures[1]),
      haut: Number(captures[2])
    },
    taille: {
      largeur: Number(captures[3]),
      hauteur: Number(captures[4])
    }
  };
}
