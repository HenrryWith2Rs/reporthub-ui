// BarChart.tsx
import React, { useState } from "react"
import { useTheme } from "@mui/material"
import { ResponsiveBar, BarDatum } from "@nivo/bar"
import { tokens } from "../ThemeRegistry/theme"
import { getDataByTags, getKeysByTags } from "../data/dataParser"

type BarChartProps = {
  isDashboard: boolean
  filteredData: any[]
  checked: boolean
}

const BarChart: React.FC<BarChartProps> = ({
  isDashboard,
  filteredData,
  checked,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const numberPercentageToggle = checked ? "Percentage" : "Result"

  const data = getDataByTags(filteredData, numberPercentageToggle)
  const keys = getKeysByTags(filteredData)

  return (
    <>
      <ResponsiveBar
        groupMode="grouped"
        data={data as BarDatum[]}
        keys={keys as string[]}
        indexBy="Date"
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 50, right: 30, bottom: 50, left: 60 }
            : { top: 50, right: 170, bottom: 50, left: 60 }
        }
        padding={0.2}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -35,
          legend: isDashboard ? undefined : "Date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Count",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={
          isDashboard
            ? undefined
            : [
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
        }
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " for Date: " + e.indexValue
        }
      />
    </>
  )
}

export default BarChart
