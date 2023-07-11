import React from "react";
import "../App.css";

function Home() {
  const cards = [
    {
      title: "Basic Sudoku",
      excerpt:
        "Place a digit from 1 to 9 into each of the empty cells so that each digit appears exactly once in each row, column and 3x3 coloured box.",
      img1: "Basic_Incorrect.png",
      img2: "Basic_Correct.png",
      href: "/basic9",
      current: false,
    },
    {
      title: "Anti-King Move",
      excerpt:
        "Basic Sudoku Rules apply. Additionally, no two identical digits can be a chess King's move away from each other.",
      img1: "Antikingincorrect.png",
      img2: "Antikingcorrect.png",
      href: "/antiking",
      current: false,
    },
    {
      title: "Anti-Knight Move",
      excerpt:
        "Basic Sudoku Rules apply. Additionally, no two identical digits can be a chess knight's move away from each other.",
      img1: "Antiknightincorrect.png",
      img2: "Antiknightcorrect.png",
      href: "/antiknight",
      current: false,
    },
    {
      title: "Unique Diagonal",
      excerpt:
        "Place a digit from 1 to 9 into each of the empty squares so that each digit appears exactly once in each of the rows, columns, coloured 3x3 box, and two main diagonals.",
      img1: "Diagonalincorrect.png",
      img2: "Diagonalcorrect.png",
      href: "/diagonal",
      current: false,
    },
    {
      title: "Disjoint Groups Sudoku",
      excerpt:
        "Basic Sudoku Rules apply. Additionally, cells with the same position in 3x3 boxes contain a number from 1 to 9 i.e no number can repeat in the same position in 3x3 boxes.",
      img1: "Scatteredincorrect.png",
      img2: "Scatteredcorrect.png",
      href: "/scattered",
      current: false,
    },
    {
      title: "Non-consecutive",
      excerpt:
        "Basic Sudoku Rules apply. Moreover, no orthogonal cell pairs (sharing an edge) can contain digits which are consecutive to each other.",
      img1: "Nonconsincorrect.png",
      img2: "Nonconscorrect.png",
      current: false,
    },

    // Add more card objects as needed
  ];

  const handleButtonClick = (href) => {
    window.location.href = href;
  };

  return (
    <div className="pt-6 pb-12 bg-gray-300">
      <div>
        <h2 className="text-center font-bold font-serif uppercase text-5xl xl:text-5xl">
          SUDOKU VARIANTS
        </h2>
        <div className="container w-auto mx-auto flex flex-col">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row overflow-hidden bg-white rounded-lg shadow-xl mt-4 w-full mx-2"
            >
              <div className="flex flex-row w-full m-1 lg:w-2/3">
                <div className="w-1/2  m-1">
                  <img
                    className="inset-0 h-full w-full object-cover object-center"
                    src={card.img1}
                    alt={card.title}
                  />
                </div>
                <div className="w-1/2 m-1">
                  <img
                    className="inset-0 h-full w-full object-cover object-center"
                    src={card.img2}
                    alt={card.title}
                  />
                </div>
              </div>

              <div className="lg:w-1/3 w-full py-4 px-3 text-gray-800 flex flex-col">
                <button
                  className={`mb-2 px-0 py-2 rounded-md ${
                    card.current
                      ? "bg-gradient-to-r from-blue-900 to-blue-600 text-white"
                      : "bg-gradient-to-r from-blue-200 to-blue-500 text-blue-700 hover:from-blue-400 hover:to-blue-600 hover:text-white"
                  } sm:w-auto sm:mx-2 sm:mb-0 mb-2 sm:px-6 sm:py-3 
          }`}
                  onClick={() => handleButtonClick(card.href)}
                >
                  Play Now
                </button>
                <h3 className=" mt-10 font-semibold text-3xl leading-tight truncate">
                  {card.title}
                </h3>
                <p className="mt-3">{card.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
