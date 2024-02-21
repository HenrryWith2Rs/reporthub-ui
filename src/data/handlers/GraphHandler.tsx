// GraphHandler.tsx
import React, { useState, useEffect } from "react"
import { tokens } from "../../ThemeRegistry/theme"
import { IconButton, useTheme } from "@mui/material"
import TagsButtonGroup from "../../components/TagsButtonGroup"
import BarChart from "../../components/BarChart"
import { HandlerProps } from "../../types/koreTypes"
import { extractUniqueTags } from "../utils/koreDataUtils"
import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"
import PercentIcon from "@mui/icons-material/Percent"
import NumbersIcon from "@mui/icons-material/Numbers"

const GraphHandler: React.FC<HandlerProps> = ({ apiResponse }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const tags = extractUniqueTags(apiResponse)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [checked, setChecked] = useState<boolean>(false)

  const updateFilteredData = (apiResponse: any, selectedTagsArr: string[]) => {
    try {
      if (selectedTagsArr.length === 0) {
        setFilteredData([])
      } else if (selectedTagsArr.length === tags.length) {
        const allResults = apiResponse.flatMap(
          (dateEntry: any) => dateEntry.resultSet
        )
        setFilteredData(allResults)
      } else {
        const newData = apiResponse.map((dateEntry: any) => {
          const filteredResultSet = dateEntry.resultSet.filter(
            (item: { Tags: string }) => {
              const itemTags = item.Tags.split(",").map((tag: string) =>
                tag.trim()
              )
              return selectedTagsArr.every((selectedTag) =>
                itemTags.includes(selectedTag)
              )
            }
          )
          return { date: dateEntry.date, resultSet: filteredResultSet }
        })

        setFilteredData(newData)
      }
    } catch (error) {
      console.error("Error updating filtered data:", error)
      // Handle the error as needed
    }
  }

  useEffect(() => {
    updateFilteredData(apiResponse, selectedTags)
  }, [selectedTags])

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  return (
    <div>
      <TagsButtonGroup
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Box height="75vh">
        <Switch
          checked={checked}
          onChange={handleChange}
          color="secondary"
          inputProps={{ "aria-label": "toggle dark mode" }}
        />
        <IconButton onClick={handleChange} aria-label="toggle dark mode">
          {checked ? <PercentIcon /> : <NumbersIcon />}
        </IconButton>
        <BarChart
          isDashboard={false}
          filteredData={filteredData}
          checked={checked}
        />
      </Box>
    </div>
  )
}

export default GraphHandler
