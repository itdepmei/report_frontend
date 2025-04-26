import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';

const LoginHook = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangEmail = (e) => {
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
        if (user.data && user.data) {
          if (
            user.data.error ===
            "No active account found with the given credentials"
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.log("اسم المستخدم او كلمة السر غير صحيحة", "error");
            return;
          }

          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.data));

          console.log("تم تسجيل الدخول بنجاح", "success");
        } else {
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
    onChangEmail,
    onChangePassword,
    onSubmit,
  ];
};

export default LoginHook;
