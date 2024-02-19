import React, { useState, useEffect, ChangeEvent } from "react"
import TextField from "@mui/material/TextField"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

type TagsViewerProps = {
  tags: string[]
  displayedTags: string[]
  onDeleteTag: (tag: string) => void
  updateDisplayedTags: (newDisplayedTags: string[]) => void
  onRestoreAllTags: () => void
}

const TagsViewer: React.FC<TagsViewerProps> = ({
  tags,
  displayedTags,
  onDeleteTag,
  updateDisplayedTags,
  onRestoreAllTags,
}) => {
  const [filter, setFilter] = useState<string>("")
  const [localDisplayedTags, setLocalDisplayedTags] = useState<string[]>([])

  // Initialize localDisplayedTags when the component mounts
  useEffect(() => {
    setLocalDisplayedTags(displayedTags)
  }, [displayedTags])

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleDeleteTag = (tag: string) => {
    const newLocalDisplayedTags = localDisplayedTags.filter(
      (prevTag) => prevTag !== tag
    )
    setLocalDisplayedTags(newLocalDisplayedTags)
    updateDisplayedTags(newLocalDisplayedTags)
    onDeleteTag(tag)
  }

  const handleRestoreAllTags = () => {
    setLocalDisplayedTags(tags)
    updateDisplayedTags(tags)
    onRestoreAllTags()
  }

  const filteredTags = localDisplayedTags.filter((tag) =>
    tag.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Box>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <TextField
          label="Filter Tags"
          variant="outlined"
          onChange={handleFilterChange}
        />
        <Button variant="contained" onClick={handleRestoreAllTags}>
          Display All Tags
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} marginBottom={2}>
        {filteredTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            style={{ margin: "5px" }}
            onDelete={() => handleDeleteTag(tag)}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default TagsViewer
