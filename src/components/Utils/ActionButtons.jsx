import { Trash2, Pencil } from "lucide-react";
import DeleteModel from "../model/DeleteModel";

const ActionButtons = ({ onDelete, onEdit }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onDelete}
        className="p-2 text-rose-600 hover:bg-rose-100/80 rounded-lg transition-all duration-300 shadow-sm hover:shadow-rose-100"
        aria-label="حذف"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <button
        onClick={onEdit}
        className="p-2 text-emerald-600 hover:bg-emerald-100/80 rounded-lg transition-all duration-300 shadow-sm hover:shadow-emerald-100"
        aria-label="تعديل"
      >
        <Pencil className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ActionButtons;
