"use client";
import FireworksContainer from "@/components/fireworks";
import { useGetQuestionsQuery } from "@/lib/service/api";
import { Workspaces } from "@mui/icons-material";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const { id } = useParams();
  const sParams = useSearchParams();
  const [currentTime, setCurrentTime] = useState(150);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [finish, setFinish] = useState(false);
  const [variants, setVariants] = useState(null);
  
  const { data, isLoading, error } = useGetQuestionsQuery({
    category: id,
    difficulty: sParams.get("difficulty"),
  });

  useEffect(() => {
    setCurrentQuestion(data?.results[0]);
    if (data) {
      setVariants(shuffle([
        ...data?.results[0].incorrect_answers,
        data?.results[0].correct_answer,
      ]));
    }
  }, [data]);

  useEffect(() => {
    let n;
    if (!finish) {
      n = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(n);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(n);
  }, [finish]);

  const checkHandler = (answer) => {
    setShowCorrect(true);
    if (currentQuestion.correct_answer == answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    if (currentQuestionCount < data.results.length - 1) {
      const c = currentQuestionCount + 1;
      setCurrentQuestionCount(c);
      setTimeout(() => {
        setCurrentQuestion(data?.results[c]);
        setShowCorrect(false);
        setVariants(shuffle([
          ...data?.results[c].incorrect_answers,
          data?.results[c].correct_answer,
        ]));
      }, 1000);
    } else {
      setTimeout(() => {
        setFinish(true);
      }, 1000);
    }
  };

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  if (error) {
    window.location.reload();
    return (
      <div className="text-2xl md:text-3xl lg:text-5xl text-white text-center pt-5 md:pt-10">
        ERROR
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:py-10">
      {finish | currentTime == 0 && <FireworksContainer start={true} />}
      <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] ${
        currentTime <= 10 && "text-red-500"
      } text-center font-bold mb-6 md:mb-10`}>
        {currentTime / 60 < 10 && "0"}
        {(currentTime / 60) | 0}:
        {currentTime % 60 < 10 && "0"}
        {currentTime % 60}
      </h1>
      
      <form className="relative w-full max-w-[800px] mx-auto border rounded-xl p-4 sm:p-6 md:p-10 backdrop-blur-md border-accent">
        {isLoading ? (
          <div className="p-4 md:p-10 text-center">
            <span className="animate-spin inline-block">
              <Workspaces fontSize="large" />
            </span>
          </div>
        ) : finish | currentTime == 0 ? (
          <div className="p-4 md:p-10 text-center">
            <h1 className="text-lg md:text-xl font-bold">
              Correct Answers <br />
              <span className="text-3xl md:text-5xl">
                {correctAnswers}
              </span>
            </h1>
            <Link
              className="border border-accent rounded px-4 md:px-5 py-2 mt-4 md:mt-5 text-accent inline-block text-sm md:text-base hover:bg-accent hover:text-white transition-colors"
              href={"/"}
            >
              Go to main
            </Link>
          </div>
        ) : (
          <>
            <p className="absolute top-2 md:top-3 end-2 md:end-3 text-accent text-sm md:text-base">
              {currentQuestionCount + 1}/{data.results.length}
            </p>
            <h3
              dangerouslySetInnerHTML={{
                __html: currentQuestion?.question,
              }}
              className="text-base md:text-xl border-b pb-2 border-accent"
            ></h3>
            <div className="grid mt-3 md:mt-5 grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {variants &&
                variants.map((q) => (
                  <button
                    onClick={() => checkHandler(q)}
                    dangerouslySetInnerHTML={{
                      __html: q,
                    }}
                    type="button"
                    className={`p-2 md:p-3 text-sm md:text-base ${
                      showCorrect
                        ? currentQuestion.correct_answer == q
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-secondary hover:bg-accent"
                    } transition-all font-medium rounded-xl`}
                    key={q}
                  ></button>
                ))}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CategoryPage;