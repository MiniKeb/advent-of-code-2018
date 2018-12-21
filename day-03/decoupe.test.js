describe("découpe", () => {
  it("crée une pièce à partir d'une règle", () => {
    const regle = "#1 @ 483,830: 24x18";

    expect(creerPiece(regle)).toEqual({
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

  it("place une pièce de taille 1 sur le tissu", () => {
    const regle = "#1 @ 1,1: 1x1";
    const tissu = [[0, 0], [0, 0]];

    expect(placerPiece(regle, tissu)).toEqual([[0, 0], [0, 1]]);
  });
});

function placerPiece(regle, tissu) {
  const piece = creerPiece(regle);

  tissu[piece.position.gauche][piece.position.haut]++;

  return tissu;
}

function creerPiece(regle) {
  const decoupeDePiece = /^#\d+ @ (\d+),(\d+): (\d+)x(\d+)$/g;

  const captures = decoupeDePiece.exec(regle);

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
