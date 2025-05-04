import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotification";

const LoginHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validationValues = () => {
    if (email === "") {
      notify("من فضلك أدخل البريد الإلكتروني", "error");
      return false;
    }
    if (password === "") {
      notify("من فضلك أدخل كلمة السر", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return;

    setLoginClicked(true);
    setLoading(true);
    await dispatch(loginUser({ email, password }));
    setLoading(false);
  };

  const res = useSelector((state) => state.auth);
  console.log(res)
  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && loginClicked) {
      if (error && (error === "Request failed with status code 400" || error === "Incorrect email or password")) {
        notify("البريد الإلكتروني أو كلمة السر غير صحيحة", "error");
        return;
      }
      

      if (user) {
        if (user.data) {
          if (user.data.error) {
            notify(user.data.error, "error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return;
          }

          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.data));
          notify("تم تسجيل الدخول بنجاح", "success");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  }, [loading, user, loginClicked, error]);

  return [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  ];
};

export default LoginHook;
