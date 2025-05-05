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
  HeadingLevel,
  TableOfContents
} from "docx";
import { saveAs } from "file-saver";
import ur from "../assets/urlogo.png";
import system from "../assets/systemslogo.jpg";
import formatDate from "../hook/UtilsFunctions/FormatDate";
import formatTime from "../hook/UtilsFunctions/FormatTime";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";

const DepartmentReportWord = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const flitterWord = localStorage.getItem("flitterWord");

  const [reportsByDate, isLoading] = GetAllSendReportHook(flitterWord);

  const generate = async () => {
    const urResponse = await fetch(ur);
    const urBuffer = await urResponse.arrayBuffer();

    const systemResponse = await fetch(system);
    const systemBuffer = await systemResponse.arrayBuffer();

    const sections = [
      // {
      //   properties: {
      //     rtl: true,
      //   },
      //   children: [
      //     new Paragraph({}), 
      //   ],
      // },
    ];

    // إضافة قسم لكل تقرير
    reportsByDate.forEach((report, index) => {
      sections.push({
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
            children: [
              new TextRun({
                text: formatDate(report?.date),
                bold: true,
                size: 36,
                font: "Calibri",
                rightToLeft: true,
              }),
            ],
          }),

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
              ...report.tasks.map((task, index) => {
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
                            text:
                              Array.isArray(report?.suggestions) &&
                              report.suggestions.length > 0
                                ? report.suggestions[0].note || ""
                                : "",
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
                            text: String(report.tasks?.length + 1),
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
                              Array.isArray(report?.complaints) &&
                              report.complaints.length > 0
                                ? report.complaints[0].note || ""
                                : "",
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
                            text: String(report.tasks?.length + 2),
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
                              Array.isArray(report?.Obstacles) &&
                              report.Obstacles.length > 0
                                ? report.Obstacles[0].note || ""
                                : "",
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
                            text: String(report.tasks?.length + 3),
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
                              Array.isArray(report?.outOfHoursWork) &&
                              report.outOfHoursWork.length > 0
                                ? report.outOfHoursWork[0].note || ""
                                : "",
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
                              Array.isArray(report?.outOfHoursWork) &&
                              report.outOfHoursWork.length > 0 &&
                              report.outOfHoursWork[0]?.timeStart &&
                              report.outOfHoursWork[0]?.timeEnd
                                ? formatTime(
                                    report.outOfHoursWork[0].timeStart
                                  ) +
                                  " - " +
                                  formatTime(report.outOfHoursWork[0].timeEnd)
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
                            text: String(report.tasks?.length + 4),
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

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "الاسم: " + report.user.name,
                bold: true,
                size: 28,
                font: "Calibri",
                color: "000000", 
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({
                text: "القسم: " + report.department,
                bold: true,
                size: 28,
                font: "Calibri",
              }),
            ],
          }),
        ],
      });
    });

    const doc = new Document({
      sections: sections
    });

    // حفظ الملف وورد
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${flitterWord}.docx`);
  };

  return (
    <button
      onClick={generate}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      📄 تحميل التقارير بصيغة وورد
    </button>
  );
};

export default DepartmentReportWord;