import React from 'react';
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
  const nodes = messages.map((message, index) => ({
    id: `node-${index}`,
    data: { label: `${message.timestamp}\n${message.nodeName}` },
    position: { x: 0, y: index * 150 }, // Adjust the y-coordinate for vertical spacing
  }));

  const edges = messages.slice(1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
  }));

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodesConnectable={false}
        nodesDraggable={false}
        zoomOnScroll={false}
        paneMoveable={false}
        minZoom={0.5}
        maxZoom={2}
        defaultZoom={0.8}
      >
        <Background color="#f0f0f0" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ConversationFlow;
