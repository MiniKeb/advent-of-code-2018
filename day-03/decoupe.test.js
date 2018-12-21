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

  it("place une pièce carré sur le tissu", () => {
    const carre = "#1 @ 0,0: 2x2";
    const tissu = [[0, 0], [0, 0]];

    expect(placerPiece(carre, tissu)).toEqual([[1, 1], [1, 1]]);
  });

  it("place une pièce rectangulaire sur le tissu", () => {
    const largeur = `1`;
    const hauteur = `2`;
    const rectangle = `#234 @ 0,0: ${largeur}x${hauteur}`;

    const tissu = [[0, 0], [0, 0]];

    expect(placerPiece(rectangle, tissu)).toEqual([[1, 0], [1, 0]]);
  });
});

function placerPiece(regle, tissu) {
  const {
    taille: { largeur, hauteur },
    position: { gauche, haut }
  } = creerPiece(regle);

  for (let x = 0; x < largeur; x++) {
    for (let y = 0; y < hauteur; y++) {
      tissu[haut + y][gauche + x]++;
    }
  }

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
