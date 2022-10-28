import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BarChartIcon from "@mui/icons-material/BarChart";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DownloadIcon from "@mui/icons-material/Download";
import ReactExport from "react-export-excel";

import { reportsSearch } from "../../helpers/searchDB";
import AlertComponent from "../../components/UI/AlertComponent";
import LoadingButtonComp from "../../components/UI/LoadingButtonComp";
import BasePage from "../../components/UI/Wrappers/BasePage";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const baseData = {
  color: "success",
  Icon: BarChartIcon,
  title: "Reports",
  subtitle: "Generate daily/monthly/yearly guest entry reports",
};

const reports = [
  {
    title: "Daily guest entries",
    id: 0,
    value: "Daily",
  },
  {
    title: "Weekly guest entries",
    id: 1,
    value: "Weekly",
  },
  {
    title: "Monthly guest entries",
    id: 2,
    value: "Monthly",
  },
  {
    title: "Yearly guest entries",
    id: 3,
    value: "Yearly",
  },
];

function Reports() {
  const [result, setResult] = useState([]);
  const [report, setReport] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [download, setDownload] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ open: false });
  };

  const handleChangeReport = (e) => {
    setReport(e.target.value);
    setDownload(false);
  };

  const generateReport = async (event) => {
    event.preventDefault();
    setIsloading(true);

    try {
      const reportData = await reportsSearch(report, "guests");
      setResult(reportData);
      setDownload(true);
      setIsloading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <BasePage
      color={baseData.color}
      Icon={baseData.Icon}
      title={baseData.title}
      subtitle={baseData.subtitle}
    >
      <Box component="form" onSubmit={generateReport} sx={{ mt: 3 }}>
        <Grid container spacing={1} rowSpacing={0.1}>
          <Grid item xs={12} sm={12}>
            <TextField
              select
              required
              value={report}
              onChange={handleChangeReport}
              id="reports"
              label="Select report"
              helperText="Please select the report you want to generate"
            >
              {reports.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {!download && (
          <LoadingButtonComp loading={isLoading} variant="contained">
            Generate report
          </LoadingButtonComp>
        )}
        {download && (
          <ExcelFile
            filename={`${report}_report`}
            element={
              <LoadingButtonComp
                onClick={() => setDownload(false)}
                loading={isLoading}
                variant="contained"
                color={baseData.color}
                hover={baseData.hover}
                endIcon={<DownloadIcon />}
              >
                Download report
              </LoadingButtonComp>
            }
          >
            <ExcelSheet data={result} name={report}>
              <ExcelColumn label="Name" value="firstName" />
              <ExcelColumn label="Last Name" value="lastName" />
              <ExcelColumn label="ID" value="id" />
              <ExcelColumn label="Role" value="role" />
              <ExcelColumn label="Date of Entry" value="dateOfEntry" />
              <ExcelColumn label="Entrance #" value="entrance" />
              <ExcelColumn label="Destination" value="destination" />
              <ExcelColumn label="Date of Birth" value="dateOfBirth" />
            </ExcelSheet>
          </ExcelFile>
        )}
      </Box>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={snackBarCloseHandler}
      >
        <AlertComponent
          onClose={snackBarCloseHandler}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </AlertComponent>
      </Snackbar>
    </BasePage>
  );
}

export default Reports;
