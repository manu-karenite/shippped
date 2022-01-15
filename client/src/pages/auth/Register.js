import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase.js";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../../components/Utilities/Title.js";
function Register() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) {
      navigate("/home");
    }
  }, [user]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: "https://shippped.herokuapp.com/register-continue",
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);
      window.localStorage.setItem("emailForRegistration", email);
      setLoading(false);
      toast.success(`Confirmation email Sent to ${email}. Please check Inbox`);
    } catch (error) {
      setLoading(false);
      toast.error("Confirm your Network Connection");
    }
  };
  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-raised mt-3">
          Register
        </button>
      </form>
    );
  };
  return (
    <>
      <Title />
      {loading && (
        <>
          <LoadingOutlined
            spin
            className="d-flex justify-content-center display-1 text-primary p-5"
          />
          <h5 className="text-center">
            Please Wait while We proceed with your Registration
          </h5>
        </>
      )}
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>

            {registerForm()}
          </div>
        </div>
        ;
      </div>
    </>
  );
}

export default Register;
