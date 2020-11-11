import React from "react";
import { Header } from "../../components/Header";
import { JobOpeningsGrid } from "../../components/JobOpening/JobOpeningsGrid";
import '../__shared__/styles.css';


export const main = () => {
  return (
    <div>
      <Header email="pepito@me.com" />
      <JobOpeningsGrid />
    </div>
  );
};
