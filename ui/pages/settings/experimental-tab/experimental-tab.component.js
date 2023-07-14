import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../../../components/ui/toggle-button';
import {
  getNumberOfSettingsInSection,
  handleSettingsRefs,
} from '../../../helpers/utils/settings-search';
import { MetaMetricsEventCategory } from '../../../../shared/constants/metametrics';
import { Text } from '../../../components/component-library';
import { TextColor } from '../../../helpers/constants/design-system';
///: BEGIN:ONLY_INCLUDE_IN(desktop)
import DesktopEnableButton from '../../../components/app/desktop-enable-button';
///: END:ONLY_INCLUDE_IN

export default class ExperimentalTab extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    useNftDetection: PropTypes.bool,
    setUseNftDetection: PropTypes.func,
    setOpenSeaEnabled: PropTypes.func,
    openSeaEnabled: PropTypes.bool,
  };

  settingsRefs = Array(
    getNumberOfSettingsInSection(
      this.context.t,
      this.context.t('experimental'),
    ),
  )
    .fill(undefined)
    .map(() => {
      return React.createRef();
    });

  componentDidUpdate() {
    const { t } = this.context;
    handleSettingsRefs(t, t('experimental'), this.settingsRefs);
  }

  componentDidMount() {
    const { t } = this.context;
    handleSettingsRefs(t, t('experimental'), this.settingsRefs);
  }

  renderOpenSeaEnabledToggle() {
    const { t } = this.context;
    const {
      openSeaEnabled,
      setOpenSeaEnabled,
      useNftDetection,
      setUseNftDetection,
    } = this.props;

    return (
      <>
        <div ref={this.settingsRefs[0]} className="settings-page__content-row">
          <div className="settings-page__content-item">
            <span>{t('enableOpenSeaAPI')}</span>
            <div className="settings-page__content-description">
              {t('enableOpenSeaAPIDescription')}
            </div>
          </div>
          <div className="settings-page__content-item">
            <div className="settings-page__content-item-col">
              <ToggleButton
                value={openSeaEnabled}
                onToggle={(value) => {
                  this.context.trackEvent({
                    category: MetaMetricsEventCategory.Settings,
                    event: 'Enabled/Disable OpenSea',
                    properties: {
                      action: 'Enabled/Disable OpenSea',
                      legacy_event: true,
                    },
                  });
                  // value is positive when being toggled off
                  if (value && useNftDetection) {
                    setUseNftDetection(false);
                  }
                  setOpenSeaEnabled(!value);
                }}
                offLabel={t('off')}
                onLabel={t('on')}
              />
            </div>
          </div>
        </div>
        <div ref={this.settingsRefs[1]} className="settings-page__content-row">
          <div className="settings-page__content-item">
            <span>{t('useNftDetection')}</span>
            <div className="settings-page__content-description">
              <Text color={TextColor.textAlternative}>
                {t('useNftDetectionDescription')}
              </Text>
              <ul className="settings-page__content-unordered-list">
                <li>{t('useNftDetectionDescriptionLine2')}</li>
                <li>{t('useNftDetectionDescriptionLine3')}</li>
                <li>{t('useNftDetectionDescriptionLine4')}</li>
              </ul>
              <Text color={TextColor.textAlternative} paddingTop={4}>
                {t('useNftDetectionDescriptionLine5')}
              </Text>
            </div>
          </div>
          <div className="settings-page__content-item">
            <div className="settings-page__content-item-col">
              <ToggleButton
                value={useNftDetection}
                onToggle={(value) => {
                  this.context.trackEvent({
                    category: MetaMetricsEventCategory.Settings,
                    event: 'NFT Detected',
                    properties: {
                      action: 'NFT Detected',
                      legacy_event: true,
                    },
                  });
                  if (!value && !openSeaEnabled) {
                    setOpenSeaEnabled(!value);
                  }
                  setUseNftDetection(!value);
                }}
                offLabel={t('off')}
                onLabel={t('on')}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  ///: BEGIN:ONLY_INCLUDE_IN(desktop)
  renderDesktopEnableButton() {
    const { t } = this.context;

    return (
      <div
        ref={this.settingsRefs[6]}
        className="settings-page__content-row"
        data-testid="advanced-setting-desktop-pairing"
      >
        <div className="settings-page__content-item">
          <span>{t('desktopEnableButtonDescription')}</span>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <DesktopEnableButton />
          </div>
        </div>
      </div>
    );
  }
  ///: END:ONLY_INCLUDE_IN

  render() {
    return (
      <div className="settings-page__body">
        {this.renderOpenSeaEnabledToggle()}
        {
          ///: BEGIN:ONLY_INCLUDE_IN(desktop)
          this.renderDesktopEnableButton()
          ///: END:ONLY_INCLUDE_IN
        }
      </div>
    );
  }
}
