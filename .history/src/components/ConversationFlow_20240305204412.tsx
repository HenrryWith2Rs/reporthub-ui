import React, { useCallback, useState } from 'react';
import ReactFlow, {
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
  const initNodes = messages.map((message, index) => {
    let xPos;
    if (message.messageType === 'outgoing') {
      xPos = 0; // Outgoing messages on the left
    } else if (message.messageType === 'incoming') {
      xPos = 800; // Incoming messages on the right
    } else {
      xPos = 400; // Node names in the middle
    }

    return {
      id: `node-${index}`,
      data: {
        label: `${message.timestamp}\n${message.nodeName}`,
        message: message.message,
      },
      position: { x: xPos, y: index * 150 },
    };
  });

  const initEdges = messages.slice(1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
  }));

  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      minZoom={0.5}
      maxZoom={2}
    >
      <Background color="#f0f0f0" gap={16} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default ConversationFlow;
