import React from "react"

const RenderHeader = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          onClick={() => {
            window.location.href =
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D"
          }}
          src="/reporthub.png"
          alt="reporthub"
        />
      </div>
      <h1>Authentication</h1>
    </div>
  )
}

export default RenderHeader
