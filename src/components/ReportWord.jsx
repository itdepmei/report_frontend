import React from "react";
import {
  Document,
  Packer,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  ImageRun,
  WidthType,
  AlignmentType,
  BorderStyle,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import ur from "../assets/urlogo.png";
import system from "../assets/systemslogo.jpg";
import GetOneReportHook from "../hook/get-one_report-hook";
import GetTasksFromReportHook from "../hook/get-tasks-from-report-hook";
import formatDate from "../hook/UtilsFunctions/FormatDate";
import GetAllSuggestionsHook from "../hook/get-all-suggestions-hook";
import GetAllComplaintsHook from "../hook/get-all-complaints-hook";
import GetAllObstaclesHook from "../hook/get-all-obstacles-hook";
import GetAllOutOfHoursWorkHook from "../hook/get-all-outOfHoursWork-hook";
import formatTime from "../hook/UtilsFunctions/FormatTime";

const ReportWord = ({ id }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [singleReport] = GetOneReportHook(id);
  const [task] = GetTasksFromReportHook(id);
  const [suggestion] = GetAllSuggestionsHook(id);
  const [complaint] = GetAllComplaintsHook(id);
  const [obstacle] = GetAllObstaclesHook(id);
  const [outOfHoursWork] = GetAllOutOfHoursWorkHook(id);
  const generate = async () => {
    const urResponse = await fetch(ur);
    const urBuffer = await urResponse.arrayBuffer();

    const systemResponse = await fetch(system);
    const systemBuffer = await systemResponse.arrayBuffer();

    const doc = new Document({
      sections: [
        {
          properties: {
            rtl: true,
          },
          children: [
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE },
              },

              // Headers
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new ImageRun({
                              data: systemBuffer,
                              transformation: {
                                width: 110,
                                height: 100,
                              },
                            }),
                          ],
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({})],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [
                            new ImageRun({
                              data: urBuffer,
                              transformation: {
                                width: 100,
                                height: 100,
                              },
                            }),
                          ],
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 300,
              },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "شركة هندسة المارج للصناعات الالكترونية",
                  bold: true,
                  size: 36,
                  font: "Calibri",
                  rightToLeft: true,
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "استمارة التقرير اليومي",
                  bold: true,
                  size: 36,
                  font: "Calibri",
                  rightToLeft: true,
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              bidirectional: true,
              spacing: { before: 200 },
              children: [
                new TextRun({
                  text: formatDate(singleReport?.date),
                  bold: true,
                  size: 36,
                  font: "Calibri",
                  rightToLeft: true,
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 400,
              },
            }),

            // Table
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              tableLayout: {
                type: "fixed",
              },
              rows: [
                new TableRow({
                  tableHeader: true,
                  children: [
                    new TableCell({
                      width: {
                        size: 30,
                        type: WidthType.PERCENTAGE,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "الملاحظات",
                              bold: true,
                              size: 24,
                              font: "Calibri",
                              rightToLeft: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 20,
                        type: WidthType.PERCENTAGE,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "الوقت",
                              bold: true,
                              size: 24,
                              font: "Calibri",
                              rightToLeft: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 40,
                        type: WidthType.PERCENTAGE,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "المهام",
                              bold: true,
                              size: 24,
                              font: "Calibri",
                              rightToLeft: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 10,
                        type: WidthType.PERCENTAGE,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "ت",
                              bold: true,
                              size: 24,
                              font: "Calibri",
                              rightToLeft: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                ...task.map((task, index) => {
                  return new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            bidirectional: true,
                            children: [
                              new TextRun({
                                text: task.note || "",
                                font: "Calibri",
                                size: 24,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            bidirectional: true,
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text:
                                  (formatTime(task.timeStart) || "") +
                                  " - " +
                                  (formatTime(task.timeEnd) || ""),
                                size: 24,
                                font: "Calibri",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            bidirectional: true,
                            children: [
                              new TextRun({
                                text: task.title || "",
                                size: 24,
                                font: "Calibri",
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            bidirectional: true,
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: String(index + 1),
                                size: 24,
                                font: "Calibri",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  });
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: (suggestion && suggestion[0]?.note) || "",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "لا يوجد",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "المقترحات التي تخص العمل",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: String(task.length + 1),
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: (complaint && complaint[0]?.note) || "",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "لا يوجد",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "الشكاوى",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: String(task.length + 2),
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: (obstacle && obstacle[0]?.note) || "",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "لا يوجد",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "المعوقات",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: String(task.length + 3),
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text:
                                (outOfHoursWork && outOfHoursWork[0]?.note) ||
                                "",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text:
                                outOfHoursWork[0]?.timeStart &&
                                outOfHoursWork[0]?.timeEnd
                                  ? formatTime(outOfHoursWork[0]?.timeStart) +
                                    " - " +
                                    formatTime(outOfHoursWork[0]?.timeEnd)
                                  : "لا يوجد",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          children: [
                            new TextRun({
                              text: "اعمال منفذة خارج أوقات الدوام الرسمي",
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          bidirectional: true,
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: String(task.length + 4),
                              size: 24,
                              font: "Calibri",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // footer
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              spacing: { before: 200 },
              children: [
                new TextRun({
                  text: "الاسم: " + singleReport.user.name,

                  bold: true,
                  size: 32,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "قسم: البرمجيات وتكنلوجيا المعلومات",
                  bold: true,
                  size: 32,
                  font: "Calibri",
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `تقرير_يومي_${formatDate(singleReport?.date)}/${singleReport?.user.name}.docx`
    );
  };

  return (
    <button
      onClick={generate}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      📄 تحميل التقرير بصيغة وورد
    </button>
  );
};

export default ReportWord;
