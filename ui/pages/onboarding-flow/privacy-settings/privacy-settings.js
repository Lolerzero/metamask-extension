import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Box from '../../../components/ui/box/box';
import Button from '../../../components/ui/button';
import Typography from '../../../components/ui/typography';
import {
  COLORS,
  FONT_WEIGHT,
  TYPOGRAPHY,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { addUrlProtocolPrefix } from '../../../helpers/utils/ipfs';
import {
  setCompletedOnboarding,
  setFeatureFlag,
  setUseMultiAccountBalanceChecker,
  setUsePhishDetect,
  setUseTokenDetection,
  showModal,
  setIpfsGateway,
} from '../../../store/actions';
import { ONBOARDING_PIN_EXTENSION_ROUTE } from '../../../helpers/constants/routes';
import { Icon, TextField } from '../../../components/component-library';
import { Setting } from './setting';

export default function PrivacySettings() {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const [usePhishingDetection, setUsePhishingDetection] = useState(true);
  const [turnOnTokenDetection, setTurnOnTokenDetection] = useState(true);
  const [showIncomingTransactions, setShowIncomingTransactions] =
    useState(true);
  const [
    isMultiAccountBalanceCheckerEnabled,
    setMultiAccountBalanceCheckerEnabled,
  ] = useState(true);
  const [ipfsURL, setIPFSURL] = useState('');
  const [ipfsError, setIPFSError] = useState(null);

  const handleSubmit = () => {
    dispatch(
      setFeatureFlag('showIncomingTransactions', showIncomingTransactions),
    );
    dispatch(setUsePhishDetect(usePhishingDetection));
    dispatch(setUseTokenDetection(turnOnTokenDetection));
    dispatch(
      setUseMultiAccountBalanceChecker(isMultiAccountBalanceCheckerEnabled),
    );
    dispatch(setCompletedOnboarding());

    if (ipfsURL && !ipfsError) {
      const { host } = new URL(addUrlProtocolPrefix(ipfsURL));
      dispatch(setIpfsGateway(host));
    }

    history.push(ONBOARDING_PIN_EXTENSION_ROUTE);
  };

  const handleIPFSChange = (url) => {
    setIPFSURL(url);
    try {
      const { host } = new URL(addUrlProtocolPrefix(url));
      if (!host || host === 'gateway.ipfs.io') {
        throw new Error();
      }
      setIPFSError(null);
    } catch (error) {
      setIPFSError(t('onboardingAdvancedPrivacyIPFSInvalid'));
    }
  };

  return (
    <>
      <div className="privacy-settings" data-testid="privacy-settings">
        <div className="privacy-settings__header">
          <Typography variant={TYPOGRAPHY.H2} fontWeight={FONT_WEIGHT.BOLD}>
            {t('setAdvancedPrivacySettings')}
          </Typography>
          <Typography variant={TYPOGRAPHY.H4}>
            {t('setAdvancedPrivacySettingsDetails')}
          </Typography>
        </div>
        <div
          className="privacy-settings__settings"
          data-testid="privacy-settings-settings"
        >
          <Setting
            value={showIncomingTransactions}
            setValue={setShowIncomingTransactions}
            title={t('showIncomingTransactions')}
            description={t('onboardingShowIncomingTransactionsDescription', [
              <a
                key="etherscan"
                href="https://etherscan.io/"
                target="_blank"
                rel="noreferrer"
              >
                {t('etherscan')}
              </a>,
              <a
                href="https://etherscan.io/privacyPolicy"
                target="_blank"
                rel="noreferrer"
                key="privacyMsg"
              >
                {t('privacyMsg')}
              </a>,
            ])}
          />
          <Setting
            value={usePhishingDetection}
            setValue={setUsePhishingDetection}
            title={t('usePhishingDetection')}
            description={t('onboardingUsePhishingDetectionDescription', [
              <a
                href="https://www.jsdelivr.com"
                target="_blank"
                rel="noreferrer"
                key="jsDeliver"
              >
                {t('jsDeliver')}
              </a>,
              <a
                href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-com"
                target="_blank"
                rel="noreferrer"
                key="privacyMsg"
              >
                {t('privacyMsg')}
              </a>,
            ])}
          />
          <Setting
            value={turnOnTokenDetection}
            setValue={setTurnOnTokenDetection}
            title={t('turnOnTokenDetection')}
            description={t('useTokenDetectionPrivacyDesc')}
          />
          <Setting
            value={isMultiAccountBalanceCheckerEnabled}
            setValue={setMultiAccountBalanceCheckerEnabled}
            title={t('useMultiAccountBalanceChecker')}
            description={t('useMultiAccountBalanceCheckerDescription')}
          />
          <Setting
            title={t('onboardingAdvancedPrivacyNetworkTitle')}
            showToggle={false}
            description={
              <>
                {t('onboardingAdvancedPrivacyNetworkDescription', [
                  <a
                    href="https://consensys.net/privacy-policy/"
                    key="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('privacyMsg')}
                  </a>,
                ])}
                <Box paddingTop={2}>
                  <Button
                    type="secondary"
                    rounded
                    large
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(showModal({ name: 'ONBOARDING_ADD_NETWORK' }));
                    }}
                    icon={<Icon name="add-outline" marginRight={2} />}
                  >
                    {t('onboardingAdvancedPrivacyNetworkButton')}
                  </Button>
                </Box>
              </>
            }
          />
          <Setting
            title={t('onboardingAdvancedPrivacyIPFSTitle')}
            showToggle={false}
            description={
              <>
                {t('onboardingAdvancedPrivacyIPFSDescription')}
                <Box paddingTop={2}>
                  <TextField
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      handleIPFSChange(e.target.value);
                    }}
                  />
                  {ipfsURL ? (
                    <Typography
                      variant={TYPOGRAPHY.H7}
                      color={
                        ipfsError
                          ? COLORS.ERROR_DEFAULT
                          : COLORS.SUCCESS_DEFAULT
                      }
                    >
                      {ipfsError || t('onboardingAdvancedPrivacyIPFSValid')}
                    </Typography>
                  ) : null}
                </Box>
              </>
            }
          />
        </div>
        <Button type="primary" rounded onClick={handleSubmit}>
          {t('done')}
        </Button>
      </div>
    </>
  );
}
