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
  const initNodes = messages.flatMap((message, index) => {
    const nodes = [];

    if (message.messageType === 'outgoing') {
      // Outgoing messages on the left
      nodes.push({
        id: `node-${index}-outgoing`,
        data: { label: message.message },
        position: { x: 100, y: index * 150 },
      });
    } else if (message.messageType === 'incoming') {
      // Incoming messages on the right
      nodes.push({
        id: `node-${index}-incoming`,
        data: { label: message.message },
        position: { x: 700, y: index * 150 },
      });
    }

    // Node names in the middle
    nodes.push({
      id: `node-${index}-name`,
      data: { label: `${message.timestamp}\n${message.nodeName}` },
      position: { x: 400, y: index * 150 },
    });

    return nodes;
  });

  const initEdges = messages.flatMap((_, index) => {
    const edges = [];

    if (index > 0) {
      // Add edge from previous node name to this node name
      edges.push({
        id: `edge-${index}-name`,
        source: `node-${index - 1}-name`,
        target: `node-${index}-name`,
      });
    }

    // Add edge from node name to outgoing message
    if (messages[index].messageType === 'outgoing') {
      edges.push({
        id: `edge-${index}-outgoing`,
        source: `node-${index}-name`,
        target: `node-${index}-outgoing`,
      });
    }

    // Add edge from node name to incoming message
    if (messages[index].messageType === 'incoming') {
      edges.push({
        id: `edge-${index}-incoming`,
        source: `node-${index}-name`,
        target: `node-${index}-incoming`,
      });
    }

    return edges;
  });

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
