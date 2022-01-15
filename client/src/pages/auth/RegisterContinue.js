import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Title from "../../components/Utilities/Title.js";
const { sendDetails } = require("../../functions/axios.js");

function RegisterContinue() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user && user.token) {
      navigate("/home");
    }
  }, [user]);
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        const user = auth.currentUser;
        await user.updatePassword(password);
        const token = await user.getIdTokenResult();
        const api = await sendDetails(token.token);
        dispatch({
          type: "LOGGED_IN",
          payload: {
            email: api.data.data.email,
            token: token.token,
            profileId: api.data.data._id,
            name: api.data.data.name,
            role: api.data.data.role,
          },
        });
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const registerCompleteForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <input
          type="password"
          className="form-control"
          value={password}
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
          minLength={5}
          placeholder="Enter Password"
        />

        <button type="submit" className="btn btn-primary mt-3">
          Finish Registration
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
            <h4 className="text-center  mb-2">Complete Registration</h4>
            {registerCompleteForm()}
          </div>
        </div>
        ;
      </div>
    </>
  );
}

export default RegisterContinue;
