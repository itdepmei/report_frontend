import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";

const RegisterHook = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setpasswordConfirm(e.target.value);
  };

  const onChangeRole = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const validationValues = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
      console.log("من فضلك ادخل اسم المستخدم", "error");
      return false;
    }
    if (email === "") {
      console.log("من فضلك ادخل الايميل", "error");
      return false;
    }
    if (password === "") {
      console.log("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    if (!emailRegex.test(email)) {
      console.log("من فضلك ادخل ايميل صحيح", "error");
      return false;
    }
    if (phone.length <= 10) {
      console.log("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }
    if (password !== passwordConfirm) {
      console.log("من فضلك تاكد من كلمه السر", "error");
      return false;
    }
    return true;
  };

  const { user } = useSelector((state) => state.auth);

  const OnSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(
        registerUser({
          name: name,
          email: email,
          phone_number: phone,
          password: password,
          passwordConfirm: passwordConfirm,
          role: role,
        })
      );
    } catch (error) {
      console.log("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading ) {
      console.log("تم التسجيل بنجاح", "success");
    }
  }, [loading]);

  return [
    role,
    name,
    email,
    phone,
    password,
    passwordConfirm,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeRole,
    OnSubmit,
  ];
};

export default RegisterHook;
