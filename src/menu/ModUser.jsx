import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../.constants";

const ModUser = () => {
  const navigate = useNavigate();

  return (
	<div>
	  <h1>Modify user</h1>
	  <p>You're modifying your user information</p>
	  <button
		onClick={() => navigate(routes.profile)}
	  >
		Back to profile
	  </button>
	</div>
  );
};

export default ModUser;