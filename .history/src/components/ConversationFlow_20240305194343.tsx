import React from 'react';
import ReactFlow, { Controls, Background } from 'react-flow-renderer';

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
  // Define elements based on messages
  const elements = messages
    .map((message, index) => {
      const isOutgoing = message.messageType === 'outgoing';
      const nodePosition = isOutgoing ? 'left' : 'right';

      return [
        {
          id: `node-${index}`,
          type: 'input',
          data: { label: `${message.nodeName} - ${message.timestamp}` },
          position: { x: 100, y: index * 150 },
        },
        {
          id: `message-${index}`,
          data: { label: message.message },
          position: {
            x: nodePosition === 'left' ? 50 : 800,
            y: index * 150 + 50,
          },
          style: {
            background: isOutgoing ? '#2196f3' : '#e0e0e0',
            color: '#fff',
            padding: '8px',
            borderRadius: '8px',
          },
          source: `node-${index}`,
          target: `node-${index}`,
          arrowHeadType: 'arrowclosed',
        },
      ];
    })
    .flat();

  return (
    <div style={{ height: '600px', width: '100%', position: 'relative' }}>
      <ReactFlow elements={elements}>
        <Controls />
        <Background color="#f0f0f0" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default ConversationFlow;
