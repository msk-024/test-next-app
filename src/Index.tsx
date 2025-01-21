import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { PostPage } from "./Posts";
import { Header } from "./page/Header";
import { Form } from "./page/contact/Form";
import { Article } from "./Article";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/contact" element={<Form />} />
      </Routes>
    </>
  );
};

// npm install
// npm run dev
