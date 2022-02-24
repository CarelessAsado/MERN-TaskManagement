import React from "react";
import { useParams } from "react-router-dom";

export const ForgotChangePassword = () => {
  const { secretLinkId } = useParams();
  console.log(secretLinkId);

  return <div>ForgotChangePassword</div>;
};
