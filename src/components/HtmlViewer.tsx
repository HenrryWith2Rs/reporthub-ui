// HtmlViewer.tsx
import React from "react"

type HtmlViewerProps = {
  html: string
}

const HtmlViewer: React.FC<HtmlViewerProps> = ({ html }) => {
  return (
    <iframe
      title="Bot Report"
      width="100%"
      height="100%"
      srcDoc={html}
      style={{
        border: "none",
      }}
    />
  )
}

export default HtmlViewer
