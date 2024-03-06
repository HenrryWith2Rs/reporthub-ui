import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodes,
  useEdges,
} from 'reactflow';

import 'reactflow/dist/style.css';

const ConversationFlow = ({ messages }) => {
  const initialNodes = messages.map((message, index) => ({
    id: `node-${index}`,
    data: { label: `${message.timestamp}\n${message.nodeName}` },
    position: { x: index * 200, y: 100 },
  }));

  const initialEdges = messages.slice(1).map((message, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
  }));

  const [nodes, setNodes] = useNodes(initialNodes);
  const [edges, setEdges] = useEdges(initialEdges);

  return (
    <ReactFlow elements={[...nodes, ...edges]} onElementsRemove={() => {}}>
      <Background color="#f0f0f0" gap={16} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default ConversationFlow;
