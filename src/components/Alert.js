import React from "react";

const Alert = (props) => {
  return (
    props.alert && (
      <div className="container d-flex justify-content-end">
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show position-absolute w-25 `}
          role="alert"
        >
          <strong>{props.alert.type === "danger"?"Error " : props.alert.type}</strong> : {props.alert.message}
        </div>
      </div>
    )
  );
};

export default Alert;