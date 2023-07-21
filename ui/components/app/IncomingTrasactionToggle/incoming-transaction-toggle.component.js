import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';
import {
  CONSENSYS_PRIVACY_LINK,
  ETHERSCAN_PRIVACY_LINK,
} from '../../../../shared/lib/ui-utils';
import ToggleButton from '../../ui/toggle-button';

const IncomingTransactionToggle = ({
  showIncomingTransactions,
  setShowIncomingTransactions,
}) => {
  const t = useContext(I18nContext);

  return (
    <div>
      <div className="settings-page__content-item">
        <span>{t('showIncomingTransactions')}</span>
        <div className="settings-page__content-description">
          {t('showIncomingTransactionsDescription', [
            // TODO: Update to use real link
            <a
              href={ETHERSCAN_PRIVACY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              key="etherscan-privacy-link"
            >
              {t('etherscan')}
            </a>,
            // TODO: Update to use real link
            <a
              href={CONSENSYS_PRIVACY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              key="ic-consensys-privacy-link"
            >
              {t('privacyMsg')}
            </a>,
          ])}
        </div>
      </div>
      <div className="settings-page__content-item">
        <div
          className="settings-page__content-item-col"
          data-testid="showIncomingTransactions"
        >
          <ToggleButton
            value={showIncomingTransactions}
            onToggle={(value) => setShowIncomingTransactions(!value)}
            offLabel={t('off')}
            onLabel={t('on')}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomingTransactionToggle;

IncomingTransactionToggle.propTypes = {
  showIncomingTransactions: PropTypes.bool,
  setShowIncomingTransactions: PropTypes.func,
};
