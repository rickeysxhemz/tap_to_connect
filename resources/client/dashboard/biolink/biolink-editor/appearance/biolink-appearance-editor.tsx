import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {BackgroundSelector} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import React, {Fragment} from 'react';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {ButtonStyleSelector} from '@app/dashboard/biolink/biolink-editor/appearance/button-style-selector';
import {FontSelector as CommonFontSelector} from '@common/ui/font-selector/font-selector';
import {useSaveBiolinkAppearance} from '@app/dashboard/biolink/biolink-editor/requests/use-save-biolink-appearance';
import {BrowserSafeFonts} from '@common/ui/font-picker/browser-safe-fonts';
import {ColorInput} from '@app/dashboard/biolink/biolink-editor/appearance/color-input';
import {appearanceHeaderClassnames} from '@app/dashboard/biolink/biolink-editor/appearance/header-classnames';
import {Switch} from '@common/ui/forms/toggle/switch';
import {useSettings} from '@common/core/settings/use-settings';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {LockIcon} from '@common/icons/material/Lock';
import {FeatureLockedDialog} from '@app/dashboard/upgrade/feature-locked-dialog';
import {useAuth} from '@common/auth/use-auth';

export function BiolinkAppearanceEditor() {
  const saveAppearance = useSaveBiolinkAppearance();
  const isDirty = useBiolinkEditorStore(s => s.appearanceIsDirty);

  return (
    <Fragment>
      <header className="mb-40">
        <h1 className="text-2xl mb-4">
          <Trans message="Custom appearance" />
        </h1>
        <div className="text-sm mb-20">
          <Trans message="Fully customize your Biolink. Change background color or select gradients and images. Choose button style, text color, typeface and more." />
        </div>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          onClick={() => saveAppearance.mutate()}
          disabled={!isDirty || saveAppearance.isLoading}
        >
          <Trans message="Save changes" />
        </Button>
      </header>
      <BackgroundSelector />
      <ColorSelector />
      <ButtonStyleSelector className="my-60" />
      <FontSelector />
      {/* <BrandingSelector /> */}
    </Fragment>
  );
}

function ColorSelector() {
  const btnConfig = useBiolinkEditorStore(s => s.appearance?.btnConfig);
  const bgConfig = useBiolinkEditorStore(s => s.appearance?.bgConfig);

  return (
    <div className="my-60">
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Colors" />
      </h2>
      <div className="md:grid grid-cols-3 items-center gap-24">
        <ColorInput
          label={<Trans message="Text color" />}
          value={bgConfig?.color || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              bgConfig: {
                ...bgConfig,
                color: newValue,
              },
            });
          }}
        />
        <ColorInput
          label={<Trans message="Button color" />}
          value={btnConfig?.color || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                color: newValue,
              },
            });
          }}
        />
        <ColorInput
          label={<Trans message="Button text color" />}
          value={btnConfig?.textColor || '#000'}
          onChange={newValue => {
            biolinkEditorState().updateAppearance({
              btnConfig: {
                ...btnConfig,
                textColor: newValue,
              },
            });
          }}
        />
      </div>
    </div>
  );
}

function FontSelector() {
  const currentValue =
    useBiolinkEditorStore(s => s.appearance?.fontConfig) || BrowserSafeFonts[0];
  return (
    <div>
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Font" />
      </h2>
      <CommonFontSelector
        value={currentValue}
        onChange={newValue => {
          biolinkEditorState().updateAppearance({
            fontConfig: {
              ...currentValue,
              ...newValue,
            },
          });
        }}
      />
    </div>
  );
}

function BrandingSelector() {
  const {branding} = useSettings();
  const {isSubscribed} = useAuth();
  const currentValue =
    useBiolinkEditorStore(s => s.appearance?.hideBranding) || false;

  return (
    <div className="my-60">
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Branding" />
      </h2>
      <div className="mb-14">
        <DialogTrigger type="popover">
          <Button
            variant="flat"
            color="primary"
            size="2xs"
            startIcon={<LockIcon />}
          >
            <Trans message="Upgrade" />
          </Button>
          <FeatureLockedDialog
            message={
              <Trans
                message="Upgrade to remove :site logo."
                values={{site: branding.site_name}}
              />
            }
            messageSuffix={null}
          />
        </DialogTrigger>
      </div>
      <Switch
        disabled={!isSubscribed}
        checked={currentValue}
        onChange={e => {
          biolinkEditorState().updateAppearance({
            hideBranding: e.target.checked,
          });
        }}
      >
        <Trans message="Hide :site logo" values={{site: branding.site_name}} />
      </Switch>
    </div>
  );
}
