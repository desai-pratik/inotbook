import React from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

const Home = (props) => {
  return (
    <div className="container mt-5 "> 
      <div className="row">
        <Notes showAlert={props.showAlert}/>
      </div>
    </div>
  );
};

export default Home;
