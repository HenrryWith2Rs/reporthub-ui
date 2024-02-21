// ExcelHandler.ts
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { BotType, ReportType } from "../../types/koreTypes"

export function ExcelHandler(
  resultsArray: any[],
  bot: BotType,
  reportType: ReportType,
  date: string
) {
  let excelFunction = generateContent(bot, reportType)

  console.log(excelFunction)
  // Directly call the dynamically generated function
  const excelFile: string = excelFunction(date, resultsArray)
}

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
      Dtld: generateApptDtldExcel,
      Smmr: generateApptSmmrExcel,
    },
    Bill: {
      Smmr: generateBillSmmrExcel,
    },
  }
  // Dynamically generate the function name and return the reference to the function
  return funcMap[botValue][reportTypeValue]
}

async function generateApptDtldExcel(date: string, resultsArray: any[]) {
  // Sort the results array by the 'Order' field
  resultsArray.sort((a, b) => a.Order - b.Order)
  try {
    // Input and Output variables
    const existingTemplatePath = "/templates/ApptDtldTemplate.xlsx"
    const outputFileName = `Kore-Appt-Dtld-Report for ${date}.xlsx`

    // Load the Excel file
    const response = await fetch(existingTemplatePath)
    const existingTemplateBuffer = await response.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(existingTemplateBuffer)
    workbook.clearThemes()

    // Get the first sheet (assuming it's the one you want to rename)
    const firstSheet = workbook.getWorksheet(1)
    if (!firstSheet) throw new Error("Worksheet not found in template")

    // Change the title of the first sheet to the date
    firstSheet.name = date

    // Iterate through data
    resultsArray.forEach((element) => {
      const { Result, Cell_Result, Percentage, Cell_Percentage } = element
      firstSheet.getCell(Cell_Result).value = Result
      firstSheet.getCell(Cell_Percentage).value = Percentage
    })

    // Create buffer out of excel data
    const excelBuffer = (await workbook.xlsx.writeBuffer()) as Buffer

    // Convert buffer to blob
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    // Save the blob using file-saver
    saveAs(excelBlob, outputFileName)
  } catch (error) {
    throw error
  }
}

async function generateApptSmmrExcel(date: string, resultsArray: any[]) {
  try {
    // Input and Output variables
    const existingTemplatePath = "/templates/ApptSmmrTemplate.xlsx"
    const outputFileName = `Kore-Appt-Smmr-Report for ${date}.xlsx`

    // Load the Excel file
    const response = await fetch(existingTemplatePath)
    const existingTemplateBuffer = await response.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(existingTemplateBuffer)
    workbook.clearThemes()

    // Get the first sheet
    const firstSheet = workbook.getWorksheet(1)
    if (!firstSheet) throw new Error("Worksheet not found in template")

    // Iterate through data
    resultsArray.forEach((element) => {
      const { Result, Cell_Result, Percentage, Cell_Percentage } = element

      try {
        if (Cell_Percentage !== "") {
          firstSheet.getCell(Cell_Result).value = Result
          firstSheet.getCell(Cell_Percentage).value = Percentage
        } else {
          firstSheet.getCell(Cell_Result).value = Result
        }
      } catch (error) {
        throw "error" + error
      }
    })

    // Format the date to "mm/dd/yyyy" and print it in cell C1
    const dateParts = date.split("-")
    const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
    console.log(formattedDate)
    firstSheet.getCell("C1").value = new Date(formattedDate)

    // Create buffer out of excel data
    const excelBuffer = (await workbook.xlsx.writeBuffer()) as Buffer

    // Convert buffer to blob
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    // Save the blob using file-saver
    saveAs(excelBlob, outputFileName)
  } catch (error) {
    throw error
  }
}

async function generateBillSmmrExcel(date: string, resultsArray: any[]) {
  try {
    // Input and Output variables
    const existingTemplatePath = "/templates/BillSmmrTemplate.xlsx"
    const outputFileName = `Kore-Bill-Smmr-Report for ${date}.xlsx`

    // Load the Excel file
    const response = await fetch(existingTemplatePath)
    const existingTemplateBuffer = await response.arrayBuffer()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(existingTemplateBuffer)
    workbook.clearThemes()

    // Get the first sheet
    const firstSheet = workbook.getWorksheet(1)
    if (!firstSheet) throw new Error("Worksheet not found in template")

    // Iterate through data
    resultsArray.forEach((element) => {
      const { Result, Cell_Result, Percentage, Cell_Percentage } = element

      try {
        if (Cell_Percentage !== "") {
          firstSheet.getCell(Cell_Result).value = Result
          firstSheet.getCell(Cell_Percentage).value = Percentage
        } else {
          firstSheet.getCell(Cell_Result).value = Result
        }
      } catch (error) {
        throw "error" + error
      }
    })

    // Format the date to "mm/dd/yyyy" and print it in cell C1
    const dateParts = date.split("-")
    const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
    console.log(formattedDate)
    firstSheet.getCell("C1").value = new Date(formattedDate)

    // Create buffer out of excel data
    const excelBuffer = (await workbook.xlsx.writeBuffer()) as Buffer

    // Convert buffer to blob
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    // Save the blob using file-saver
    saveAs(excelBlob, outputFileName)
  } catch (error) {
    throw error
  }
}
