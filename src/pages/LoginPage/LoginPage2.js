import React, { useRef, useState } from "react";
import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginPage2() {
  const containerRef = useRef();
  let navigate = useNavigate();
  const oauthLogin = async (user, authProvider) => {
    const access_token = user.accessToken;
    const url = `/auth/login/${authProvider}`;
    const res = await api.post(url, { access_token, user });
    const newUser = res.data.data.user;
    if (newUser) {
      dispatch(authActions.getCurrentUser());
    }
  };

  const signUp = () => {
    containerRef.current.classList.add("right-panel-active");
  };

  const signIn = () => {
    containerRef.current.classList.remove("right-panel-active");
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //const loading = useSelector((state) => state.auth.loading);
  //const classes = toggle ? "abc" : "123";
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.loginRequest({ email, password }));
  };

  if (isAuthenticated) navigate("/");

  return (
    <div className="FormLogin">
      <div className="container" ref={containerRef} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>

            <input type="text" placeholder="Name" />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="form-text text-danger">{errors.email}</small>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleSubmit}>
            <h1>Sign in</h1>

            <div className="social-container">
              {/*     <a hreft="#" className="social">
                <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
            </a> */}
            </div>
            <span>or use your account</span>
            <FacebookLogin
              style={{
                border: "1px solid transparent",
                borderRadius: "40px",
              }}
              appId={FB_APP_ID}
              icon="fa-facebook"
              fields="name,email,picture"
              callback={(u) => oauthLogin(u, "facebook")}
              onFailure={() => console.log("Facebook Login Failure")}
            />

            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={(u) => oauthLogin(u, "google")}
              onFailure={() => console.log("Google Login Failure")}
            />

            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="form-text text-danger">{errors.password}</small>
            )}
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already a EMBECA member?</h1>
              <p>Explore Top Brands & Add Best-Selling Products to Your Look</p>
              <button className="ghost" id="signIn" onClick={() => signIn()}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>New to EMBECA?</h1>
              <p>{`Sign up! It's quick and easy`}</p>
              <button className="ghost" id="signUp" onClick={() => signUp()}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default LoginPage2;
