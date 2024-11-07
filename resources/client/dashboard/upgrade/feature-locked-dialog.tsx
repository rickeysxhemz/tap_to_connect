import {UpgradeDialog} from '@app/dashboard/upgrade/upgrade-dialog';
import {Trans} from '@common/i18n/trans';
import {ReactNode} from 'react';

interface FeatureLockedDialogProps {
  message?: ReactNode;
  messageSuffix?: ReactNode;
}
export function FeatureLockedDialog({
  message,
  messageSuffix,
}: FeatureLockedDialogProps) {
  return (
    <UpgradeDialog
      message={message}
      messageSuffix={
        messageSuffix === undefined ? (
          <Trans message="Upgrade to unlock this feature and many more." />
        ) : (
          messageSuffix
        )
      }
    />
  );
}
