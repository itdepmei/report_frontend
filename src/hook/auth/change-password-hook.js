import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMyPassword } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotification";
const ChangePasswordHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeCurrentPassword = (e) => {
    setcurrentPassword(e.target.value);
  };

  const validationValues = () => {
    if (newPassword === "") {
      notify("من فضلك أدخل كلمة السر الجديدة", "error");
      return false;
    }
    if (currentPassword === "") {
      notify("من فضلك أدخل كلمة السر القديمة", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return;

    setLoginClicked(true);
    setLoading(true);
    await dispatch(changeMyPassword({ currentPassword, newPassword }));
    setLoading(false);
  };

  const res = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  console.log(res);

  useEffect(() => {
    if (!loading && loginClicked) {
      if (res && res.error) {
        // في حالة وجود خطأ في الـ state
        if (res.error === "كلمة السر الحالية غير صحيحة") {
          notify("كلمة السر الحالية غير صحيحة", "error");
        } else {
          notify("حدث خطأ", "error");
        }
        return;
      }

      if (user && user.token) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user.data));
        notify("تم تغيير كلمة المرور", "success");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (user && user.data && user.data.error) {
        notify(user.data.error, "error");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [loading, user, loginClicked]);

  return [
    currentPassword,
    onChangeNewPassword,
    newPassword,
    onChangeCurrentPassword,
    loading,
    onSubmit,
  ];
};

export default ChangePasswordHook;
