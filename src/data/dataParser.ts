// dataParser.ts
export function getDataByTags(
  filteredData: any[],
  numberPercentageToggle: string
) {
  try {
    const graphData = filteredData.map((entry) => {
      const date = entry.date
      const resultSet = entry.resultSet
      if (!Array.isArray(resultSet)) {
        throw new Error("Invalid resultSet format")
      }

      const matchingPairs = resultSet.reduce(
        (
          result: any,
          item: {
            Result: string
            Percentage: number
            Description: string | number
          }
        ) => {
          if (item.Result !== "NA" && numberPercentageToggle === "Result") {
            ;(result as any)[item.Description] = item.Result
          } else if (
            item.Result !== "NA" &&
            numberPercentageToggle === "Percentage"
          ) {
            const value = item.Percentage === 100 ? 0 : item.Percentage
            ;(result as any)[item.Description] = value
          }
          return result
        },
        {}
      )

      if (Object.keys(matchingPairs).length > 0) {
        return { Date: date, ...matchingPairs }
      }
      return null // Skip this entry if there are no matching pairs without 'NA'
    })

    return graphData.filter((entry) => entry !== null)
  } catch (error) {
    console.error("Error processing data by tags:", error)
    return [] // Return an empty array or handle the error as per your requirement
  }
}

export function getKeysByTags(filteredData: any[]) {
  try {
    const uniqueKeys = new Set()
    filteredData.forEach((entry) => {
      const resultSet = entry.resultSet

      if (!Array.isArray(resultSet)) {
        throw new Error("Invalid resultSet format")
      }

      resultSet.forEach((element: { Result: string; Description: string }) => {
        if (element.Result !== "NA") {
          uniqueKeys.add(element.Description)
        }
      })
    })

    return [...uniqueKeys]
  } catch (error) {
    console.error("Error getting keys by tags:", error)
    return [] // Return an empty array or handle the error as per your requirement
  }
}
