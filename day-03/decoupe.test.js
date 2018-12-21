const input = require("./input");

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
    const tissu = tissuVierge(2);

    expect(placerUnePiece(carre, tissu)).toEqual([[1, 1], [1, 1]]);
  });

  it("place une pièce rectangulaire sur le tissu", () => {
    const largeur = `1`;
    const hauteur = `2`;
    const rectangle = `#234 @ 0,0: ${largeur}x${hauteur}`;
    const tissu = tissuVierge(2);

    expect(placerUnePiece(rectangle, tissu)).toEqual([[1, 0], [1, 0]]);
  });

  it("place 2 pièces non superposées sur le tissu", () => {
    const surLaPremiereLigne = "#1 @ 0,0: 1x1";
    const surLaSecondeLigne = "#2 @ 1,1: 1x1";
    const regles = [surLaPremiereLigne, surLaSecondeLigne];
    const tissu = tissuVierge(2);

    expect(placerLesPieces(regles, tissu)).toEqual([[1, 0], [0, 1]]);
  });

  it("place 2 pièces superposées sur le tissu", () => {
    const piece = "#1 @ 0,0: 1x1";
    const deuxFoisLaMeme = [piece, piece];
    const tissu = tissuVierge(2);

    expect(placerLesPieces(deuxFoisLaMeme, tissu)).toEqual([[2, 0], [0, 0]]);
  });

  it("compte les superpositions", () => {
    const tissuAvecUneSuperposition = [[2, 0], [1, 0]];

    expect(nombreDeSuperpositions(tissuAvecUneSuperposition)).toBe(1);
  });

  it("trouve la réponse", () => {
    const tissuImmense = tissuVierge(4000);

    expect(nombreDeSuperpositions(placerLesPieces(input, tissuImmense))).toBe(
      119551
    );
  });
});

function tissuVierge(taille) {
  const tissu = new Array(taille);
  for (let i = 0; i < taille; i++) {
    tissu[i] = new Array(taille).fill(0);
  }
  return tissu;
}

function nombreDeSuperpositions(tissu) {
  let superpositions = 0;
  for (let y = 0; y < tissu.length; y++) {
    for (let x = 0; x < tissu[y].length; x++) {
      if (tissu[y][x] > 1) superpositions++;
    }
  }

  return superpositions;
}

function placerLesPieces(regles, tissu) {
  return regles.reduce(
    (tissuDeTravail, regle) => placerUnePiece(regle, tissuDeTravail),
    tissu
  );
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
