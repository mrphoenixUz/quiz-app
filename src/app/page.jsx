"use client";
import { useGetQuestionsQuery } from "@/lib/service/api";
import { ArrowDropDown, ArrowDropUp, Psychology } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";

const degrees = ["easy", "medium", "hard"];

const HomePage = () => {
  const { data } = useGetQuestionsQuery({
    limit: 10,
    category: 25,
  });
  const [difficulty, setDifficulty] = useState("easy");
  const [diffModal, setDiffModal] = useState(false);

  const diffHandler = (diff) => {
    setDiffModal(false);
    setDifficulty(diff);
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl text-background font-bold dark:text-foreground mt-6 md:mt-10 uppercase py-3 md:py-5">
        Welcome to the quiz app
      </h1>
      <div className="fireworks-Container fixed top-0 start-0 w-full h-full"></div>

      <div className="flex justify-center items-center mt-6 md:mt-10">
        <label className="inline-flex items-center gap-2 md:gap-5 text-background px-3 md:px-5 py-2 rounded-full bg-accent text-sm md:text-base">
          <span className="flex items-center gap-1">
            <Psychology className="w-4 h-4 md:w-6 md:h-6" />
            Difficulty
          </span>
          <div className="relative z-50 border border-accent rounded-full px-2 md:px-3 py-1">
            <p
              className="cursor-pointer min-w-[80px] md:min-w-[95px] text-center capitalize flex items-center justify-center"
              onClick={() => setDiffModal(!diffModal)}
            >
              {difficulty}
              {diffModal ? <ArrowDropUp /> : <ArrowDropDown />}
            </p>
            {diffModal && (
              <ul className="absolute cursor-pointer w-full md:w-[150px] bg-white dark:bg-secondary dark:text-primary text-background top-full end-0 border-accent border rounded">
                {degrees.map((d, i) => (
                  <li
                    className="px-3 md:px-5 py-2 transition-all border-accent hover:bg-primary hover:text-black border-b capitalize font-medium text-sm md:text-base"
                    onClick={() => diffHandler(d)}
                    key={i}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </div>

      <div className="grid gap-3 md:gap-5 mt-10 md:mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            href={`/category/${c.id}?difficulty=${difficulty}`}
            className="bg-background border-accent z-0 transition-all hover:bg-accent border-2 p-3 md:p-5 rounded relative"
            key={c.id}
          >
            <h3 className="font-medium text-base md:text-xl break-words">
              {c.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

const categories = [
  { id: 9, title: "General Knowledge" },
  { id: 10, title: "Entertainment: Books" },
  { id: 11, title: "Entertainment: Film" },
  { id: 12, title: "Entertainment: Music" },
  { id: 13, title: "Entertainment: Musicals & Theatres" },
  { id: 14, title: "Entertainment: Television" },
  { id: 15, title: "Entertainment: Video Games" },
  { id: 16, title: "Entertainment: Board Games" },
  { id: 17, title: "Science & Nature" },
  { id: 18, title: "Science: Computers" },
  { id: 19, title: "Science: Mathematics" },
  { id: 20, title: "Mythology" },
  { id: 21, title: "Sports" },
  { id: 22, title: "Geography" },
  { id: 23, title: "History" },
  { id: 24, title: "Politics" },
  { id: 25, title: "Art" },
  { id: 26, title: "Celebrities" },
  { id: 27, title: "Animals" },
  { id: 28, title: "Vehicles" },
  { id: 29, title: "Entertainment: Comics" },
  { id: 30, title: "Science: Gadgets" },
  { id: 31, title: "Entertainment: Japanese Anime & Manga" },
  { id: 32, title: "Entertainment: Cartoon & Animations" }
];