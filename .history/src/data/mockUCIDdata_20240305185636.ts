export function getMockUCIDdata() {
  return [
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:01 AM',
      nodeName: 'initializeParams',
      messageType: 'outgoing',
      message: 'Call has begun...',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:03 AM',
      nodeName: 'greetCustomer',
      messageType: 'outgoing',
      message: 'Thank you for calling Spectrum. How can I help you?',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:05 AM',
      nodeName: 'listenForIntent',
      messageType: 'incoming',
      message: 'I want to inquire about my internet bill.',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:07 AM',
      nodeName: 'confirmIntent',
      messageType: 'outgoing',
      message: 'Sure, let me check your account details.',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:11 AM',
      nodeName: 'apiResponse',
      messageType: 'outgoing',
      message: 'Retrieving account information...',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:16 AM',
      nodeName: 'apiResponse',
      messageType: 'outgoing',
      message: 'Account balance for the current month is $65.00.',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:23 AM',
      nodeName: 'processRequest',
      messageType: 'outgoing',
      message:
        'Your internet bill for this month is $65.00. Is there anything else I can assist you with?',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:30 AM',
      nodeName: 'listenForIntent',
      messageType: 'incoming',
      message: "I'm experiencing issues with my cable TV service.",
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:32 AM',
      nodeName: 'confirmIntent',
      messageType: 'outgoing',
      message: 'Let me check the status of your cable TV service.',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:34 AM',
      nodeName: 'apiResponse',
      messageType: 'outgoing',
      message: 'Checking the status of your cable TV service...',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:40 AM',
      nodeName: 'apiResponse',
      messageType: 'outgoing',
      message:
        'There seems to be an outage in your area. Our technicians are already working on it.',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:45 AM',
      nodeName: 'apiResponse',
      messageType: 'incoming',
      message: 'Do you have an expected time for it to be fixed?',
    },
    {
      ucid: '12345678901234RR',
      timestamp: '11:20:49 AM',
      nodeName: 'processRequest',
      messageType: 'incoming',
      message:
        'I apologize for the inconvenience. Our team is addressing the issue. Is there anything else I can assist you with?',
    },
  ];
}
