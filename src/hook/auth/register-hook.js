import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import notify from "../useNotification";

const RegisterHook = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [department, setDepartment] = useState();
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
    setRole(e.target.value);
  };
  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const validationValues = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
      notify("من فضلك ادخل اسم المستخدم", "error");
      return false;
    }
    if (email === "") {
      notify("من فضلك ادخل الايميل", "error");
      return false;
    }
    if (password === "") {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    if (!emailRegex.test(email)) {
      notify("من فضلك ادخل ايميل صحيح", "error");
      return false;
    }
    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }
    if (password !== passwordConfirm) {
      notify("من فضلك تاكد من كلمه السر", "error");
      return false;
    }
    return true;
  };

  // const res = useSelector((state) => state.auth);
  const { user, error } = useSelector((state) => state.auth);

  const OnSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(
        registerUser({
          name: name,
          email: email,
          phone: phone,
          password: password,
          passwordConfirm: passwordConfirm,
          department: department,
          role: role,
        })
      );
    } catch (error) {
      notify("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach((err) => {
            if (err.msg === "Email already exists") {
              notify("البريد الإلكتروني مستخدم من قبل", "error");
            } else {
              notify(err.msg, "error");
            }
          });
        } else if (typeof error === "string") {
          notify(error, "error");
        }
        return;
      }

      notify("تم التسجيل بنجاح", "success");
    }
  }, [loading]);

  return [
    role,
    name,
    email,
    phone,
    password,
    passwordConfirm,
    department,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeRole,
    onChangeDepartment,
    OnSubmit,
  ];
};

export default RegisterHook;
