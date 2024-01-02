import React from "react";

const ErrorComponent = props => {
  const { formErrors, serverErrors } = props;
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        <li style={{ color: "red" }}>{formErrors.image}</li>
        {serverErrors.length > 0
          ? serverErrors.map((el, index) => {
              return (
                <li key={index} style={{ color: "red" }}>
                  {el.msg}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default ErrorComponent;
