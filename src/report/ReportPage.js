import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true,
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false,
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false,
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true,
  },
];

function ReportPage() {
  return (
    <>
      <ExcelFile
        element={
          <button className="btn btn-success btn-sm mt-4 ml-4">
            Download Data
          </button>
        }
      >
        <ExcelSheet data={dataSet1} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={(col) => (col.is_married ? "Married" : "Single")}
          />
        </ExcelSheet>
      </ExcelFile>
    </>
  );
}

export default ReportPage;
