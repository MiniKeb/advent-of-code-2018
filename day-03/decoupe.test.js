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

    expect(placerUnePiece(carre, tissu)).toEqual([[1, 1], [1, 1]]);
  });

  it("place une pièce rectangulaire sur le tissu", () => {
    const largeur = `1`;
    const hauteur = `2`;
    const rectangle = `#234 @ 0,0: ${largeur}x${hauteur}`;

    const tissu = [[0, 0], [0, 0]];

    expect(placerUnePiece(rectangle, tissu)).toEqual([[1, 0], [1, 0]]);
  });

  it("place 2 pièces non superposées sur le tissu", () => {
    const surLaPremiereLigne = "#1 @ 0,0: 1x1";
    const surLaSecondeLigne = "#2 @ 1,1: 1x1";

    const tissu = [[0, 0], [0, 0]];

    expect(
      placerLesPieces([surLaPremiereLigne, surLaSecondeLigne], tissu)
    ).toEqual([[1, 0], [0, 1]]);
  });

  it("place 2 pièces superposées sur le tissu", () => {
    const piece = "#1 @ 0,0: 1x1";

    const tissu = [[0, 0], [0, 0]];

    expect(placerLesPieces([piece, piece], tissu)).toEqual([[2, 0], [0, 0]]);
  });
});

function placerLesPieces(regles, tissu) {
  return regles.reduce((tissuEnCours, regle) => {
    return placerUnePiece(regle, tissuEnCours);
  }, tissu);
}

function placerUnePiece(regle, tissu) {
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
