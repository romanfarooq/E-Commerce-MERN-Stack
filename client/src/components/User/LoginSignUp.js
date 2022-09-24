import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { MailOutline, LockOpen, Face } from "@material-ui/icons";
import { login, register } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import Preview from "../../images/Profile.png";

function LoginSignUp() {

  const navigate = useNavigate();
  const alert = useAlert();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Preview);

  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, alert, error, isAuthenticated, navigate]);
  

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="on"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/Password/forgot">Forgot Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <Face />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  autoComplete="on"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
                // disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginSignUp;
