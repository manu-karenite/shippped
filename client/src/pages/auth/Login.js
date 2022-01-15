import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase.js";
import { Button } from "antd";
import { LoadingOutlined, GoogleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Title from "../../components/Utilities/Title.js";
const { sendDetails } = require("../../functions/axios.js");

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token && user.role === "Subscriber") {
      navigate("/home");
    }
    if (user && user.token && user.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, [user && user.token, navigate, user]);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [google, setGoogle] = useState(false);
  const [em, setEm] = useState(false);
  const redirectUser = (role) => {
    if (location?.state?.from) {
      navigate(location.state.from);
    } else if (location?.state?.cart) {
      navigate(location.state.cart);
    } else {
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Subscriber") {
        navigate("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const loginForm = () => {
    const googleLoginHandler = async (e) => {
      setGoogle(true);
      //
      e.preventDefault();
      auth
        .signInWithPopup(googleAuthProvider)
        .then(async (result) => {
          const { user } = result;
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
          setGoogle(false);
          setEmail("");
          redirectUser(api.data.data.role);
        })
        .catch((error) => {
          toast.error(error.message);
          setPassword("");
          setGoogle(false);
        });
    };
    const emailLoginHandler = async (e) => {
      //
      e.preventDefault();
      setEm(true);
      try {
        const result = await auth.signInWithEmailAndPassword(email, password);

        const { user } = result;
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
        setEmail("");
        setPassword("");
        setEm(false);

        redirectUser(api.data.data.role);
      } catch (error) {
        toast.error(error.message);
        setEm(false);
        setPassword("");
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          autoFocus
          placeholder="Enter Email Here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-4"
          value={password}
          autoFocus
          placeholder="Enter Password Here"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          size="large"
          block
          shape="round"
          className="mt-4"
          onClick={emailLoginHandler}
          disabled={!email || !password}
        >
          {em ? (
            <LoadingOutlined
              spin
              className="justify-content-center text-primary"
            />
          ) : (
            "Login With Email and Password"
          )}
        </Button>

        <Button
          type="danger"
          size="large"
          block
          shape="round"
          className="mt-4"
          onClick={googleLoginHandler}
        >
          {google ? (
            <LoadingOutlined
              spin
              className="justify-content-center text-primary"
            />
          ) : (
            <>
              <GoogleOutlined size="large" className="mr-3" />
              Sign in With Google
            </>
          )}
        </Button>
        <Link to="/forgot-password">
          <h6 className="text-center mt-4">Forgotten Password ?</h6>
        </Link>
      </form>
    );
  };
  return (
    <>
      <Title />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Welcome Back</h4>

            {loginForm()}
          </div>
        </div>
        ;
      </div>
    </>
  );
}

export default Register;
