import React from "react";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType } from "docx";
import { saveAs } from "file-saver";

// بيانات الجدول باستخدام كائن
const reportData = [
  { id: "1", task: "عمل برمجة وتدريب على تطبيق الأداة الداخلية", time: "8:00 - 1:00", notes: "" },
  { id: "2", task: "العمل على GPS", time: "1:00 - 1:30", notes: "" },
  { id: "3", task: "عمل برمجة وتدريب على تطبيق الأداة الداخلية", time: "1:30 - 3:00", notes: "" },
  { id: "4", task: "المقترحات التي تخص العمل", time: "لا يوجد", notes: "" },
  { id: "5", task: "الشكاوى", time: "لا يوجد", notes: "" },
  { id: "6", task: "المعوّقات", time: "لا يوجد", notes: "" },
  { id: "7", task: "أعمال منفذة خارج أوقات الدوام الرسمي", time: "لا يوجد", notes: "" },
];

const ReportGenerator = () => {
  const createParagraph = (text, options = {}) =>
    new Paragraph({
      ...options,
      children: [
        new TextRun({
          text,
          font: "Arial",
          size: 24,
          bidi: true,
        }),
      ],
      bidirectional: true,
      alignment: options.alignment || AlignmentType.RIGHT,
    });

  const generateDoc = () => {
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        // الصف الأول: رؤوس الأعمدة
        new TableRow({
          children: ["ت", "المهام", "الوقت", "الملاحظات"].map(cell =>
            new TableCell({
              children: [createParagraph(cell)],
            })
          ),
        }),
        // باقي الصفوف من البيانات
        ...reportData.map(item =>
          new TableRow({
            children: [
              new TableCell({ children: [createParagraph(item.id)] }),
              new TableCell({ children: [createParagraph(item.task)] }),
              new TableCell({ children: [createParagraph(item.time)] }),
              new TableCell({ children: [createParagraph(item.notes)] }),
            ],
          })
        ),
      ],
    });

    const doc = new Document({
      sections: [
        {
          children: [
            createParagraph("شركة هندسة المارج للصناعات الالكترونية", { alignment: AlignmentType.CENTER }),
            createParagraph("استمارة التقرير اليومي", { alignment: AlignmentType.CENTER }),
            createParagraph("يوم الخميس 4/17", { alignment: AlignmentType.CENTER }),
            new Paragraph({ text: "", spacing: { after: 200 } }),
            table,
            new Paragraph({ text: "", spacing: { after: 200 } }),
            createParagraph("الاسم: الحسن محمد رشيد"),
            createParagraph("قسم: البرمجيات وتكنولوجيا المعلومات"),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "تقرير_يومي.docx");
    });
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={generateDoc}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition"
      >
        تحميل التقرير كـ Word
      </button>
    </div>
  );
};

export default ReportGenerator;
