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

import 'react-flow-renderer/dist/style.css';
import './overview.css';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const OverviewFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((edges) => addEdge(params, edges)),
    []
  );

  return (
    <ReactFlow
      elements={nodes.concat(edges)}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      minZoom={0.5}
      maxZoom={2}
      defaultZoom={1}
      nodeSelection={null}
      snapToGrid
      snapGrid={[15, 15]}
    >
      <MiniMap style={minimapStyle} />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
