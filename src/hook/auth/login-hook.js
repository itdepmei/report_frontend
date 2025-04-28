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
    setLoading(true);
    await dispatch(loginUser({ email, password }));
    setLoading(false);
  };

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.data) {
          if (user.data.error) {
            // في حالة وجود خطأ (مثل بيانات خاطئة)
            console.log(user.data.error, "error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return;
          }

          // في حالة نجاح تسجيل الدخول
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.data));
          console.log("تم تسجيل الدخول بنجاح", "success");
          navigate("/");
        } else {
          // في حال لم يرجع بيانات صحيحة
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  }, [loading, user]);

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
