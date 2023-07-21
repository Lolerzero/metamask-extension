import React from 'react';
import IncomingTransactionToggle from './incoming-transaction-toggle.component';

export default {
  title: 'Components/App/IncomingTransaction',
};

export const DefaultStory = (args) => {
  return <IncomingTransactionToggle {...args} />;
};

DefaultStory.storyName = 'Default';

DefaultStory.args = {
  showIncomingTransactions: true,
  setShowIncomingTransactions: (value) => console.log(value),
};
