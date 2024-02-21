// TableHandler.tsx
import React, { useState, useEffect } from "react"
// import TagsViewer from '../../components/TagsViewer';
import TableViewer from "../../components/TableViewer"
import TagsButtonGroup from "../../components/TagsButtonGroup"
import { HandlerProps } from "../../types/koreTypes"
import { aggregateResponse, extractUniqueTags } from "../utils/koreDataUtils"

const TableHandler: React.FC<HandlerProps> = ({ apiResponse }) => {
  const aggregatedArray = aggregateResponse(apiResponse)
  const resultsArray = aggregatedArray.resultSet

  const tags = extractUniqueTags(apiResponse)
  console.log("tags", tags)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<any[]>(resultsArray)

  const updateFilteredData = (data: any[], selectedTagsArr: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredData([])
    } else if (selectedTags.length === tags.length) {
      setFilteredData(resultsArray)
    } else {
      const newData = data.filter((item: { Tags: string }) => {
        const itemTags = item.Tags.split(",").map((tag) => tag.trim())
        return selectedTagsArr.every((selectedTag) =>
          itemTags.includes(selectedTag)
        )
      })
      setFilteredData(newData)
    }
  }

  useEffect(() => {
    updateFilteredData(resultsArray, selectedTags)
  }, [selectedTags])

  console.log("selectedTags", selectedTags)

  return (
    <div>
      <TagsButtonGroup
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <TableViewer data={filteredData} />
    </div>
  )
}

export default TableHandler
