import {
  Search,
  Filter,
  Calendar,
  FilePlus, FileX, Send, LogIn, UserPlus
} from "lucide-react";
import formatDate from "../hook/UtilsFunctions/FormatDate";
import GetAllLog from "../hook/Get-all-log";

export default function Logs() {
  const [logs, isLoading] = GetAllLog();

  const getActionIcon = (message) => {
    if (message.includes("أضافة تقرير") || message.includes("بأضافة تقرير")) {
      return <FilePlus className="text-green-500" size={20} />;
    } else if (message.includes("حذف تقرير")) {
      return <FileX className="text-red-500" size={20} />;
    } else if (message.includes("ارسال تقرير")) {
      return <Send className="text-blue-500" size={20} />;
    } else if (message.includes("تسجيل الدخول")) {
      return <LogIn className="text-yellow-500" size={20} />;
    } else if (message.includes("تسجيل مستخدم")) {
      return <UserPlus className="text-purple-500" size={20} />;
    }
  
    return <FilePlus className="text-gray-500" size={20} />;
  };

  const getActionBadgeColor = (action) => {
    switch (action) {
      case "اضافة":
        return "bg-green-100 text-green-800";
      case "حذف":
        return "bg-red-100 text-red-800";
      case "تعديل":
      case "ارسال":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden" dir="rtl">
      {/* الترويسة */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">سجل الأحداث</h1>
          <p className="text-sm text-gray-500">تتبع نشاطات المستخدمين في النظام</p>
        </div>
      </div>

      {/* شريط البحث والتصفية */}
      <div className="flex items-center space-x-4 space-x-reverse px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="البحث في السجل..."
            className="w-full px-10 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex space-x-2 space-x-reverse">
          <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">جميع المستخدمين</option>
            <option value="hassan">الحسن محمد رشيد</option>
            <option value="fatima">فاطمة احمد عبد الرضا</option>
            <option value="zahraa">زهراء عيسى لطيف</option>
            <option value="basim">باسم حسين عبدالامير</option>
          </select>

          <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">جميع الإجراءات</option>
            <option value="add">إضافة تقرير</option>
            <option value="delete">حذف تقرير</option>
            <option value="send">إرسال تقرير</option>
          </select>

          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Filter size={18} className="ml-1" />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* قائمة الأحداث */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : (
          <div className="space-y-3">
            {logs.map((activity) => (
              <div
                key={activity._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start p-4">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-2 mr-4">
                    {getActionIcon(activity.message)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="font-medium text-gray-900">
                          {activity.userName}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getActionBadgeColor(
                            activity.action
                          )}`}
                        >
                          {activity.action}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="ml-1" />
                        <span>{formatDate(activity.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{activity.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
