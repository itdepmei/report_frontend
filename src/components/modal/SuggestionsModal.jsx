import React from "react";
import { X, AlignLeft, Check } from "lucide-react";
import AddSuggestionHook from "../../hook/add-suggestion-hook";

const SuggestionsModal = ({ onClose, id }) => {
    const [note, handleNoteChange, handleAddSuggestion] = AddSuggestionHook(id);
    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleAddSuggestion();
        onClose();
      };
  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          المقترحات التي تخص العمل
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <AlignLeft size={16} className="ml-2 text-blue-500" />
              <span>ملاحظة</span>
            </label>
            <textarea
              name="note"
              value={note}
              onChange={handleNoteChange}
              rows="3"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
              placeholder="أضف ملاحظات إضافية هنا..."
              dir="rtl"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-colors flex items-center shadow-md"
            >
              <Check className="ml-2" size={18} />
              حفظ 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestionsModal;
