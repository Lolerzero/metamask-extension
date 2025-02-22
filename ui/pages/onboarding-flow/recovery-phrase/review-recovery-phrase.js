import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '../../../components/ui/box';
import Button from '../../../components/ui/button';
import Typography from '../../../components/ui/typography';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { ONBOARDING_CONFIRM_SRP_ROUTE } from '../../../helpers/constants/routes';
import {
  TEXT_ALIGN,
  TypographyVariant,
  JustifyContent,
  FONT_WEIGHT,
  IconColor,
} from '../../../helpers/constants/design-system';
import {
  ThreeStepProgressBar,
  threeStepStages,
} from '../../../components/app/step-progress-bar';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { Icon, IconName } from '../../../components/component-library';
import RecoveryPhraseChips from './recovery-phrase-chips';

export default function RecoveryPhrase({ secretRecoveryPhrase }) {
  const history = useHistory();
  const t = useI18nContext();
  const { search } = useLocation();
  const [copied, handleCopy] = useCopyToClipboard();
  const [phraseRevealed, setPhraseRevealed] = useState(false);
  const [hiddenPhrase, setHiddenPhrase] = useState(false);
  const searchParams = new URLSearchParams(search);
  const isFromReminderParam = searchParams.get('isFromReminder')
    ? '/?isFromReminder=true'
    : '';
  const trackEvent = useContext(MetaMetricsContext);

  return (
    <div className="recovery-phrase" data-testid="recovery-phrase">
      <ThreeStepProgressBar stage={threeStepStages.RECOVERY_PHRASE_REVIEW} />
      <Box
        justifyContent={JustifyContent.center}
        textAlign={TEXT_ALIGN.CENTER}
        marginBottom={4}
      >
        <Typography
          variant={TypographyVariant.H2}
          fontWeight={FONT_WEIGHT.BOLD}
          className="recovery-phrase__header"
        >
          {t('seedPhraseWriteDownHeader')}
        </Typography>
      </Box>
      <Box
        justifyContent={JustifyContent.center}
        textAlign={TEXT_ALIGN.CENTER}
        marginBottom={4}
      >
        <Typography variant={TypographyVariant.H4}>
          {t('seedPhraseWriteDownDetails')}
        </Typography>
      </Box>
      <Box
        textAlign={TEXT_ALIGN.LEFT}
        marginBottom={4}
        className="recovery-phrase__tips"
      >
        <Typography
          variant={TypographyVariant.H4}
          fontWeight={FONT_WEIGHT.BOLD}
        >
          {t('tips')}:
        </Typography>
        <ul>
          <li>
            <Typography variant={TypographyVariant.H4}>
              {t('seedPhraseIntroSidebarBulletOne')}
            </Typography>
          </li>
          <li>
            <Typography variant={TypographyVariant.H4}>
              {t('seedPhraseIntroSidebarBulletThree')}
            </Typography>
          </li>
          <li>
            <Typography variant={TypographyVariant.H4}>
              {t('seedPhraseIntroSidebarBulletFour')}
            </Typography>
          </li>
        </ul>
      </Box>
    </div>
  );
}

RecoveryPhrase.propTypes = {
  secretRecoveryPhrase: PropTypes.string,
};
