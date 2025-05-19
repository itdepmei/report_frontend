import React, { useState } from "react";
import ReportCard from "../components/ReportCard";
import Heading from "../components/Utils/Heading";
import GetAllReportsHook from "../hook/get-all-reports-hook";
import Loader from "../components/Utils/Loader";
import AddReportButton from "../components/AddReportButton";
import Sidebar from "../components/Utils/Sidebar";
import DeleteModal from "../components/modal/DeleteModal"; 
import { useDispatch } from "react-redux";
import {
  deleteReport,
  getAllReports,
  sendReportToAssistant,
} from "../redux/reportsSlice";
import notify from "../hook/useNotification";

const AllReportPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, isLoading] = GetAllReportsHook();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteClick = (id) => {
    setSelectedReportId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedReportId) {
      await dispatch(deleteReport(selectedReportId));
      setDeleteModalOpen(false);
      setSelectedReportId(null);
    }

    notify("تم حذف التقرير", "success");
  };

  const handleSendClick = async (id) => {
    await dispatch(sendReportToAssistant(id));
    await dispatch(getAllReports());
    notify("تم ارسال التقرير", "success");
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedReportId(null);
  };

  return (
    <div dir="rtl" className="flex min-h-screen">
      <div className="sticky top-0 self-start h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <Heading title="قائمة التقارير" subtitle="قائمة التقارير" />
        <AddReportButton />
        {isLoading ? (
          <Loader />
        ) : (
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data &&
              data.map((report) => (
                <ReportCard
                  key={report._id}
                  id={report._id}
                  name={user.name}
                  date={report.date}
                  onDelete={handleDeleteClick}
                  onSend={handleSendClick}
                  send={report?.sendToAssistant}
                />
              ))}
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={handleCancelDelete}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default AllReportPage;
