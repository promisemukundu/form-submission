import React from "react";
import { Routes } from "react-router-dom";
import Forms from "../components/Forms";

const Home = () => {
  return <Routes path="/:id" element={<Forms />} />;
};

export default Home;
