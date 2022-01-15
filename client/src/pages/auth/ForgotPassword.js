import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../../components/Utilities/Title.js";
function ForgotPassword() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) {
      navigate("/home");
    }
  }, [user]);
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "https://shippped.herokuapp.com/login",
        handleCodeInApp: true,
      };
      await auth.sendPasswordResetEmail(email, config);
      toast.success("Email sent!");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const forgotPassword = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email Address associated with your account"
        />

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={!email}
        >
          Generate Password
        </button>
      </form>
    );
  };
  return (
    <>
      <Title />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Forgot Password ?</h4>
            {forgotPassword()}
          </div>
        </div>
        ;
      </div>
    </>
  );
}

export default ForgotPassword;
