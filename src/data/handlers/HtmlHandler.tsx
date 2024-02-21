// HtmlHandler.ts
import React, { useState } from "react"
import { BotType, ReportType, HandlerProps } from "../../types/koreTypes"
import HtmlViewer from "../../components/HtmlViewer"
import SpeedDialViewer from "../../components/SpeedDialViewer"
import { ExcelHandler } from "./ExcelHandler"
import { aggregateResponse } from "../utils/koreDataUtils"

const HtmlHandler: React.FC<HandlerProps> = ({
  apiResponse,
  bot,
  reportType,
  date,
}) => {
  let htmlFunction = generateContent(bot, reportType)
  const aggregatedArray = aggregateResponse(apiResponse)
  const resultsArray = aggregatedArray.resultSet

  // Directly call the dynamically generated function
  const html: string = htmlFunction(date, resultsArray)

  /* Keep state(s) for Speed Dial */
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleAction = (actionName: string) => {
    // Handle click on each action
    switch (actionName) {
      case "Save":
        console.log(`Clicked on: Save action`)
        ExcelHandler(resultsArray, bot, reportType, date)
        break
      case "email":
        console.log(`Clicked on: Email action`)
        break
      case "print":
        console.log(`Clicked on: Print action`)
        break
      default:
        console.log(`Clicked on: ${actionName}`)
        break
    }
    handleClose()
  }
  /* END Speed Dial */

  return (
    <div style={{ height: "100vh" }}>
      <SpeedDialViewer
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleAction={handleAction}
      />
      <HtmlViewer html={html} />
    </div>
  )
}

export default HtmlHandler

const generateContent = (bot: BotType, reportType: ReportType) => {
  const mapBot = (bot: BotType): string =>
    bot === "appointment" ? "Appt" : "Bill"
  const mapReportType = (reportType: ReportType): string =>
    reportType === "detailed" ? "Dtld" : "Smmr"

  const botValue = mapBot(bot)
  const reportTypeValue = mapReportType(reportType)

  // Directly return the reference to the function
  return generateFunction(botValue, reportTypeValue)
}

function generateFunction(botValue: string, reportTypeValue: string) {
  const funcMap: Record<string, Record<string, any>> = {
    Appt: {
      Dtld: generateApptDtldHtml,
      Smmr: generateApptSmmrHtml,
    },
    Bill: {
      Smmr: generateBillSmmrHtml,
    },
  }
  // Dynamically generate the function name and return the reference to the function
  return funcMap[botValue][reportTypeValue]
}

function generateApptDtldHtml(date: string, resultsArray: any[]) {
  const styledPage = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  
  <html>
  <head>
      
      <meta http-equiv="content-type" content="text/html; charset=windows-1252"/>
      <title></title>
      <meta name="generator" content="LibreOffice 7.2.6.2 (Windows)"/>
      <meta name="author" content="Henrry Becerra"/>
      <meta name="created" content="2015-06-05T18:17:20"/>
      <meta name="changedby" content="Unknown"/>
      <meta name="changed" content="2023-11-21T15:58:48"/>
      <meta name="AppVersion" content="16.0300"/>
      
      <style type="text/css">
          body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Calibri"; font-size:x-small }
          a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  } 
          a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  } 
          comment { display:none;  } 
      </style>
      
  </head>
  
  <body>
  <table cellspacing="0" border="0">
      <colgroup width="431"></colgroup>
      <colgroup span="2" width="86"></colgroup>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment Calls - Summary</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050" sdnum="1033;0;0.00"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Total Appointment Calls to MOD</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4827" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[0]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="100" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[0]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Calls remained with in MOD IVR (Not transferred to BOT)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1579" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[1]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="32.71" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[1]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Missing Records in BOT (Platform Bug)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[2]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[2]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Total Appointment Calls from MOD to Bot</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3248" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[3]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="67.29" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[3]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Transfers to BOT after Intercept</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3127" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[4]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="96.27" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[4]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Transfers to BOT after MOD NLU</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="121" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[5]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3.73" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[5]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td height="20" align="left" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="center" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="left" valign=bottom sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment Confirmation</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050" sdnum="1033;0;0.00"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Total Confirm Intent</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3250" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[6]["Result"]}</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Confirm Calls MOD Intercept (Proactive and Explicit)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" bgcolor="#FFFFFF"><font face="Times New Roman" size=3 color="#000000">${resultsArray[7]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[7]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Confirm Calls MOD NLU (Proactive and Explicit)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" bgcolor="#FFFFFF" sdval="46" sdnum="1033;"><font face="Times New Roman" size=3 color="#000000">${resultsArray[8]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Confirm Success (Proactive and Explicit)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" bgcolor="#FFFFFF" sdval="3171" sdnum="1033;"><font face="Times New Roman" size=3 color="#000000">${resultsArray[9]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Proactive Confirm Readout - Attempted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3248" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[10]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Proactive Confirm Readout - Success</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#C5E0B4" sdval="3171" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[11]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="97.63" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[11]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Proactive Confirm Readout - Failure</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="77" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[12]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2.37" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[12]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Proactive Confirm Readout - Transfer</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[13]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[13]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Explicit Confirm Readout - Attempted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[14]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Explicit Confirm Readout - Success</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#C5E0B4" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[15]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[15]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Explicit Confirm Readout - Failure</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[16]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[16]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Explicit Confirm Readout - Transfer</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[17]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="100" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[17]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td height="20" align="left" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="center" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="left" valign=bottom sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment Cancel</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050" sdnum="1033;0;0.00"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel Calls MOD Intercept</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3>${resultsArray[18]["Result"]}</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[18]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel Calls MOD NLU</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="172" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[19]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel - Attempted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1058" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[20]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel - Success</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#C5E0B4" sdval="929" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[21]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="87.81" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[21]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel - Failure</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[22]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0.09" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[22]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel - Transfer (Including Ineligible)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="125" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[23]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="11.81" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[23]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Cancel - Ineligible</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="84" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[24]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="7.94" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[24]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td height="20" align="left" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="center" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="left" valign=bottom sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment Reschedule</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050" sdnum="1033;0;0.00"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule Calls MOD Intercept</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3>${resultsArray[25]["Result"]}</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[25]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule Calls MOD NLU</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="37" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[26]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule &ndash; Attempted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="400" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[27]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000"><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule - Success</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#C5E0B4" sdval="350" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[28]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="87.5" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[28]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule - Failure</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[29]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[29]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule - Transfer (Including Ineligible)</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="50" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[30]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="12.5" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[30]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Reschedule - Ineligible</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="42" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[31]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="10.5" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[31]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td height="20" align="left" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="center" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="left" valign=bottom sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment Glympse Offer</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Glympse Offer - Attempted</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[32]["Result"]}</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Glympse Offer - Accepted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3>${resultsArray[33]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[33]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Glympse Offer - Failure</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3>${resultsArray[34]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[34]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Glympse Offer - Not Accepted</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3>${resultsArray[35]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdnum="1033;0;0.00"><font face="Times New Roman" size=3>${resultsArray[35]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td height="20" align="left" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="center" valign=bottom><font face="Times New Roman" size=3><br></font></td>
          <td align="left" valign=bottom sdnum="1033;0;0.00"><font face="Times New Roman" size=3><br></font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" height="20" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Appointment FAQ</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">Count</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#92D050"><b><font face="Times New Roman" size=3 color="#000000">%</font></b></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Do I need to be at home ?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[36]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1.41" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[36]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Is there any fee for the appointment?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[37]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2.82" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[37]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">I have a missed call from Spectrum ?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="60" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[38]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="84.51" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[38]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">FAQ how long does it take to complete the work?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[39]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4.23" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[39]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">How old does the person need to be to meet with the technician?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[40]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="1.41" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[40]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Do you call me before you start?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[41]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="5.63" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">${resultsArray[41]["Percentage"]}</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="left" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" size=3 color="#000000">Can I manage my appointments online?</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font face="Times New Roman" size=3>${resultsArray[42]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00"><font face="Times New Roman" size=3 color="#000000">0.00</font></td>
      </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="20" align="center" valign=bottom bgcolor="#D9D9D9"><b><font face="Times New Roman" size=3 color="#000000">Total</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000" align="center" valign=bottom bgcolor="#D9D9D9" sdval="71" sdnum="1033;"><b><font face="Times New Roman" size=3 color="#000000">${resultsArray[43]["Result"]}</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-right: 2px solid #000000" align="right" valign=bottom bgcolor="#D9D9D9" sdval="100" sdnum="1033;0;0.00"><b><font face="Times New Roman" size=3 color="#000000">100.00</font></b></td>
      </tr>
  </table>
  <!-- ************************************************************************** -->
  </body>
  
  </html>
  `
  console.log("Returning ApptDtldHtml page")
  return styledPage
}

function generateApptSmmrHtml(date: string, resultsArray: any[]) {
  const styledPage = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  
  <html>
  <head>
      
      <meta http-equiv="content-type" content="text/html; charset=windows-1252"/>
      <title></title>
      <meta name="generator" content="LibreOffice 7.2.6.2 (Windows)"/>
      <meta name="author" content="Unknown"/>
      <meta name="created" content="2023-11-22T15:30:06"/>
      <meta name="changed" content="2023-11-22T10:38:29.331000000"/>
      <meta name="AppVersion" content="16.0300"/>
      
      <style type="text/css">
          body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Calibri"; font-size:x-small }
          a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  } 
          a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  } 
          comment { display:none;  } 
      </style>
      
  </head>
  
  <body>
  <table cellspacing="0" border="0">
      <colgroup width="141"></colgroup>
      <colgroup span="5" width="85"></colgroup>
      <colgroup width="139"></colgroup>
      <colgroup span="5" width="85"></colgroup>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan=12 height="18" align="center" valign=middle bgcolor="#FBE5D6" sdval="45251.2083333333" sdnum="1033;0;M/D/YYYY"><b><font face="Times New Roman" color="#000000">${date}</font></b></td>
          </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-left: 2px solid #000000" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=5 align="center" valign=middle bgcolor="#DAE3F3"><b><font face="Times New Roman" color="#000000">MOD IVR</font></b></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=6 align="center" valign=middle bgcolor="#C5E0B4"><b><font face="Times New Roman" color="#000000">Conversational IVR</font></b></td>
          </tr>
      <tr>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"sdnum="1033;0;D-MMM"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Total</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Deflected #</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font face="Times New Roman" color="#000000">Deflected %</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">To Agent</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">To Agent %</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font face="Times New Roman" color="#000000">Migrated Traffic %</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Total</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Deflected #</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font face="Times New Roman" color="#000000">Deflected %</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">To Agent</font></td>
          <td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font face="Times New Roman" color="#000000">To Agent %</font></td>
      </tr>
      <tr>
          <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><b><font face="Times New Roman" color="#000000">Appointment </font></b></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2663" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[0]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="234" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[1]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="8.79" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[1]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2429" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[2]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="91.21" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[2]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="63" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[15]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4502" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[16]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2282" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[17]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="50.69" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[17]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2244" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[18]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="49.84" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[18]["Percentage"]}%</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Cancel</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="313" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[3]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="24" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[4]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="7.67" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[4]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="289" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[5]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="92.33" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[5]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="769" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[19]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="733" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[20]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="95.32" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[20]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="36" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[21]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4.68" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[21]["Percentage"]}%</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Reschedule</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="23" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[6]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[7]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="13.04" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[7]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="20" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[8]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="86.96" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[8]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="320" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[22]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="247" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[23]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="77.19" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[23]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="73" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[24]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="22.81" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[24]["Percentage"]}%</font></td>
      </tr>
      <tr>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Confirm</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="25" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[9]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[10]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="16" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[10]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="21" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[11]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="84" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[11]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="324" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[25]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="308" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[26]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="95.06" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[26]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="16" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[27]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="4.94" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[27]["Percentage"]}%</font></td>
      </tr>
      <tr>
          <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000">Other</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2302" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[12]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="203" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[13]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="8.82" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[13]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2099" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[14]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="91.18" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[14]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE"><font face="Times New Roman" color="#000000"><br></font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="3113" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[28]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="994" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[29]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="31.93" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[29]["Percentage"]}%</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="2119" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[30]["Result"]}</font></td>
          <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#EEEEEE" sdval="68.07" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[30]["Percentage"]}%</font></td>
      </tr>
      <tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000">Missing Records</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdval="7" sdnum="1033;"><font face="Times New Roman" color="#000000">${resultsArray[31]["Result"]}</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font face="Times New Roman" color="#000000"><br></font></td>
	</tr>
  </table>
  <!-- ************************************************************************** -->
  </body>
  
  </html>
  
    `
  console.log("Returning generateApptSmmrHtml page")
  return styledPage
}

function generateBillSmmrHtml(date: string, resultsArray: any[]) {
  const styledPage = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  
    <html>
    <head>
        
        <meta http-equiv="content-type" content="text/html; charset=windows-1252"/>
        <title></title>
        <meta name="generator" content="LibreOffice 7.2.6.2 (Windows)"/>
        <meta name="author" content="Henrry Becerra"/>
        <meta name="created" content="2015-06-05T18:17:20"/>
        <meta name="changed" content="2023-12-07T14:17:01.252000000"/>
        <meta name="AppVersion" content="16.0300"/>
        
        <style type="text/css">
            body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Calibri"; font-size:x-small }
            a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  } 
            a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  } 
            comment { display:none;  } 
        </style>
        
    </head>
    
    <body>
    <table cellspacing="0" border="0">
        <colgroup width="68"></colgroup>
        <colgroup width="52"></colgroup>
        <colgroup width="83"></colgroup>
        <colgroup width="87"></colgroup>
        <colgroup width="66"></colgroup>
        <colgroup width="80"></colgroup>
        <colgroup width="128"></colgroup>
        <colgroup width="40"></colgroup>
        <colgroup width="83"></colgroup>
        <colgroup width="87"></colgroup>
        <colgroup width="66"></colgroup>
        <colgroup width="80"></colgroup>
        <tr>
            <td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=12 height="18" align="center" valign=middle bgcolor="#FBE5D6" sdval="45266.2083333333" sdnum="1033;0;M/D/YYYY"><b><font color="#000000">${date}</font></b></td>
            </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="center" valign=middle bgcolor="#DEEBF7"><b><font color="#000000">MOD IVR</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=6 align="center" valign=middle bgcolor="#C5E0B4"><b><font color="#000000">Conversational IVR</font></b></td>
            </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;D-MMM"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Total</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Deflected #</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000">Deflected %</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">To Agent</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">To Agent %</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000">Migrated Traffic %</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Total</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Deflected #</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000">Deflected %</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">To Agent</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000">To Agent %</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><b><font color="#000000">Billing</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="227531" sdnum="1033;"><font color="#000000">${resultsArray[0]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="152853" sdnum="1033;"><font color="#000000">${resultsArray[1]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.6718" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[1]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="74678" sdnum="1033;"><font color="#000000">${resultsArray[2]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.3282" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[2]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.3106" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[21]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="709" sdnum="1033;"><font color="#000000">${resultsArray[22]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="149" sdnum="1033;"><font color="#000000">${resultsArray[23]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.2102" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[23]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="560" sdnum="1033;"><font color="#000000">${resultsArray[24]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.7898" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[24]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Increase</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="292" sdnum="1033;"><font color="#000000">${resultsArray[3]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="5" sdnum="1033;"><font color="#000000">${resultsArray[4]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.0171" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[4]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="287" sdnum="1033;"><font color="#000000">${resultsArray[5]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.9829" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[5]["Percentage"]}%%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[25]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[26]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[26]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[27]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[27]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Question</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="248" sdnum="1033;"><font color="#000000">${resultsArray[6]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="23" sdnum="1033;"><font color="#000000">${resultsArray[7]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.0927" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[7]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="225" sdnum="1033;"><font color="#000000">${resultsArray[8]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.9073" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[8]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="632" sdnum="1033;"><font color="#000000">${resultsArray[28]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="92" sdnum="1033;"><font color="#000000">${resultsArray[29]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.1456" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[29]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="540" sdnum="1033;"><font color="#000000">${resultsArray[30]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.8544" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[30]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Vague</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="5792" sdnum="1033;"><font color="#000000">${resultsArray[9]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="2244" sdnum="1033;"><font color="#000000">${resultsArray[10]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.3874" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[10]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="3548" sdnum="1033;"><font color="#000000">${resultsArray[11]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.6126" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[11]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[31]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[32]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[32]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[33]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[33]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Payment</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="158242" sdnum="1033;"><font color="#000000">${resultsArray[12]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="125347" sdnum="1033;"><font color="#000000">${resultsArray[13]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.7921" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[13]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="32895" sdnum="1033;"><font color="#000000">${resultsArray[14]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.2079" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[14]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="8" sdnum="1033;"><font color="#000000">${resultsArray[34]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="8" sdnum="1033;"><font color="#000000">${resultsArray[35]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="1" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[35]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[36]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[36]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Balance</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="20178" sdnum="1033;"><font color="#000000">${resultsArray[15]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="16906" sdnum="1033;"><font color="#000000">${resultsArray[16]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.8378" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[16]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="3272" sdnum="1033;"><font color="#000000">${resultsArray[17]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.1622" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[17]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="61" sdnum="1033;"><font color="#000000">${resultsArray[37]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="48" sdnum="1033;"><font color="#000000">${resultsArray[38]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.7869" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[38]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="13" sdnum="1033;"><font color="#000000">${resultsArray[39]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.2131" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[39]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#EEEEEE"><font color="#000000">Other</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="42779" sdnum="1033;"><font color="#000000">${resultsArray[18]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="8160" sdnum="1033;"><font color="#000000">${resultsArray[19]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.1907" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[19]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="33303" sdnum="1033;"><font color="#000000">${resultsArray[20]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0.7785" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[20]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="6" sdnum="1033;"><font color="#000000">${resultsArray[40]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;"><font color="#000000">${resultsArray[41]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="0" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[41]["Percentage"]}%</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="6" sdnum="1033;"><font color="#000000">${resultsArray[42]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=top bgcolor="#EEEEEE" sdval="1" sdnum="1033;0;0.00%"><font color="#000000">${resultsArray[42]["Percentage"]}%</font></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdnum="1033;0;0.00%"><font color="#000000">Missing Records</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FBE5D6" sdval="4" sdnum="1033;0;0"><font color="#000000">${resultsArray[43]["Result"]}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6"><font color="#000000"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FBE5D6" sdnum="1033;0;0.00%"><font color="#000000"><br></font></td>
        </tr>
    </table>
    <!-- ************************************************************************** -->
    </body>
    
    </html>
    `
  console.log("Returning BillSmmrHTMLPage")
  return styledPage
}
