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
  const { user } = useSelector((state) => state.auth);

  console.log(res)

  useEffect(() => {
  if (!loading && loginClicked) {
    if (res && res.error) {
      // في حالة وجود خطأ في الـ state
      if (res.error.message === "Incorrect email or password") {
        notify("البريد الألكتروني او كلمة المرور غير صحيحة", "error");
      } else {
        notify("حدث خطأ", "error");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return;
    }

    if (user && user.token) {
      // تسجيل الدخول ناجح فقط إذا كان هناك توكن
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user.data));
      notify("تم تسجيل الدخول بنجاح", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (user && user.data && user.data.error) {
      // هنا إذا كان هناك خطأ ضمن بيانات المستخدم
      notify(user.data.error, "error");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } else {
      // أي حالة أخرى
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
}, [loading, user, loginClicked]);



  return [email, password, loading, onChangeEmail, onChangePassword, onSubmit];
};

export default LoginHook;
