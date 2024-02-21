// koreDataUtils.ts
import { ReactNode } from "react"
import {
  BotType,
  ReportType,
  ResultSetItem,
  reportApiResponse,
} from "../../types/koreTypes"
import HtmlHandler from "../handlers/HtmlHandler"
import TableHandler from "../handlers/TableHandler"
import GraphHandler from "../handlers/GraphHandler"

export function renderByFormat(
  apiResponse: any,
  bot: BotType,
  reportType: ReportType,
  viewAs: string,
  date: string
): ReactNode {
  let content: ReactNode = null

  switch (viewAs) {
    case "html":
      content = (
        <HtmlHandler
          apiResponse={apiResponse}
          bot={bot}
          reportType={reportType}
          date={date}
        />
      )
      break
    case "graph":
      content = (
        <GraphHandler
          apiResponse={apiResponse}
          bot={bot}
          reportType={reportType}
          date={date}
        />
      )
      break
    case "table":
      content = (
        <TableHandler
          apiResponse={apiResponse}
          bot={bot}
          reportType={reportType}
          date={date}
        />
      )
      break
    default:
      // Handle other cases if needed
      break
  }
  return content
}

export function extractUniqueTags(apiResponse: any): string[] {
  try {
    const uniqueTagsSet = new Set<string>()
    apiResponse.forEach((dateEntry: any) => {
      dateEntry.resultSet.forEach((element: any) => {
        const tags = element.Tags.split(",").map((tag: string) => tag.trim())
        tags.forEach((tag: string) => uniqueTagsSet.add(tag))
      })
    })

    return Array.from(uniqueTagsSet)
  } catch (error) {
    console.error("Error extracting unique tags:", error)
    return [] // Return an empty array or handle the error as per your requirement
  }
}

function getSubsetAtIndex(apiResponse: any[], index: number): number[] {
  return apiResponse.map((item) => item?.resultSet?.[index].Result ?? 0) // Result value or zero
}

function getAvgRateOfChange(values: number[]) {
  console.log(values)
  let totalChange = 0

  for (let i = 1; i < values.length; i++) {
    totalChange += values[i] - values[i - 1]
  }

  console.log("totalChange", totalChange)
  const averagePercentageChange = totalChange / (values.length - 1)

  const sign = averagePercentageChange >= 0 ? "+" : ""
  const resultString = `${sign}${Math.trunc(averagePercentageChange)}%`
  return resultString
}

export function processArrayAtIndex(apiResponse: any[], index: number) {
  const subset = getSubsetAtIndex(apiResponse, index)
  const avgRateOfChange = getAvgRateOfChange(subset)
  return avgRateOfChange
}

export function aggregateResponse(
  apiResponse: reportApiResponse[]
): reportApiResponse {
  const aggregatedResultSet: reportApiResponse = {
    date: "",
    resultSet: [],
  }

  let totalResults: number[] = []
  let totalPercentages: number[] = []
  const resultSetLength = apiResponse[0].resultSet.length

  // Initialize totalResults and totalPercentages arrays
  for (let i = 0; i < resultSetLength; i++) {
    totalResults.push(0)
    totalPercentages.push(0)
  }

  // Aggregate values
  apiResponse.forEach((result) => {
    result.resultSet.forEach((item: any, index: number) => {
      totalResults[index] += item.Result
      totalPercentages[index] += item.Percentage
    })
  })

  // Calculate averages
  const numResponses = apiResponse.length
  const averagedPercentages = totalPercentages.map((total) =>
    (total / numResponses).toFixed(2)
  )

  // Create aggregated resultSet
  for (let i = 0; i < resultSetLength; i++) {
    const aggregatedItem = {
      Cell_Percentage: apiResponse[0].resultSet[i].Cell_Percentage,
      Cell_Result: apiResponse[0].resultSet[i].Cell_Result,
      Description: apiResponse[0].resultSet[i].Description,
      Order: apiResponse[0].resultSet[i].Order,
      Percentage: averagedPercentages[i],
      Result: totalResults[i],
      Tags: apiResponse[0].resultSet[i].Tags,
    }
    aggregatedResultSet.resultSet.push(aggregatedItem)
  }

  // Set date from first to last date
  aggregatedResultSet.date =
    apiResponse[0].date + " to " + apiResponse[apiResponse.length - 1].date

  return aggregatedResultSet
}
