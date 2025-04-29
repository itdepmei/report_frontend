import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false); // ✅ إضافة

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validationValues = () => {
    if (email === "") {
      console.log("من فضلك ادخل البريد الالكتروني", "error");
      return false;
    }
    if (password === "") {
      console.log("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) {
      return;
    }
    setLoginClicked(true); // ✅ تسجيل أن المستخدم حاول تسجيل دخول
    setLoading(true);
    await dispatch(loginUser({ email, password }));
    setLoading(false);
  };

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && loginClicked) { // ✅ إضافة شرط loginClicked
      if (user) {
        if (user.data) {
          if (user.data.error) {
            console.log(user.data.error, "error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return;
          }
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.data));
          console.log("تم تسجيل الدخول بنجاح", "success");
          navigate("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  }, [loading, user, loginClicked]); // ✅ لاحظ إضافة loginClicked

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
