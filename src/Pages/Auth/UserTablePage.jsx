import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import AllUserHook from "../../hook/auth/all-user-hook";
import Register from "./Register";
import Loader from "../../components/Utils/Loader";
import Sidebar from "../../components/Utils/Sidebar";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/authSlice";
import notify from "../../hook/useNotification";
import DeleteModal from "../../components/modal/DeleteModal";
import { Toaster } from "react-hot-toast";

export default function UserTablePage() {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserId) {
      await dispatch(deleteUser(selectedUserId));
      setDeleteModalOpen(false);
      setSelectedUserId(null);
    }

    notify("تم حذف المستخدم", "success");
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const [allUsers, isLoading] = AllUserHook();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleClos = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const handleAddUser = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const handleEditUser = (user) => {
    alert(`تعديل بيانات المستخدم: ${user.name}`);
  };

  return (
    <div dir="rtl" className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="bg-gray-50 w-full min-h-screen p-4 text-right">
        <div className="mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            قائمة المستخدمين
          </h1>

          {/* زر إضافة مستخدم فقط */}
          <div dir="ltr" className="flex justify-end mb-6">
            <button
              onClick={handleAddUser}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              <span>إضافة مستخدم جديد</span>
            </button>
          </div>

          {/* جدول المستخدمين */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الاسم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنصب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    القسم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    حالة النشاط
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-sm text-center text-gray-500"
                    >
                      <Loader />
                    </td>
                  </tr>
                ) : allUsers && allUsers.length > 0 ? (
                  allUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.active === true
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.active === true ? "مفعل" : "غير مفعل"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-sm text-center text-gray-500"
                    >
                      لا توجد بيانات مستخدمين.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Toaster />
        </div>
        {isRegisterOpen && (
          <Register open={isRegisterOpen} close={handleClos} />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            onCancel={handleCancelDelete}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}