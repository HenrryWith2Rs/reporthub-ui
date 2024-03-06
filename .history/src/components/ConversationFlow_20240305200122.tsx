import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Message {
  ucid: string;
  timestamp: string;
  nodeName: string;
  messageType: string;
  message: string;
}

interface ConversationFlowProps {
  messages: Message[];
}

const ConversationFlow: React.FC<ConversationFlowProps> = ({ messages }) => {
  const initNodes = messages.map((message, index) => ({
    id: `node-${index}`,
    data: { label: `${message.timestamp}\n${message.nodeName}` },
    position: { x: index * 200, y: 100 },
  }));

  const initEdges = messages.slice(1).map((message, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
  }));

  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  return (
    <ReactFlow elements={[...nodes, ...edges]} onElementsRemove={() => {}}>
      <Background color="#f0f0f0" gap={16} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default ConversationFlow;
