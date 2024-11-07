import { WidgetRendererProps } from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import { RemoteFavicon } from '@common/ui/remote-favicon';
import vfcImage from '../widget-selector/widget-images/vcf.png';
import { useEffect, useState, forwardRef, Children } from 'react';
import lazyLoader from '@common/utils/http/lazy-loader';
import { ConnectWidget } from './connect-widget-dialog';
import { Button } from '@common/ui/buttons/button';
import type {
  Biolink,
  BiolinkAppearance,
  BiolinkBtnConfig,
  BiolinkLink,
} from '@app/dashboard/biolink/biolink';
import clsx from 'clsx';
import { useDialogContext } from '@common/ui/overlays/dialog/dialog-context';
import { useForm } from 'react-hook-form';
import { DialogTrigger } from '@common/ui/overlays/dialog/dialog-trigger';
import { ConnectMailDialog } from './connect-mail-dialog';


export function ConnectWidgetRenderer({
  widget,
  variant,
  appearance,
  biolink
}: WidgetRendererProps<ConnectWidget>) {

  useEffect(() => {
    // lazyLoader.loadAsset('https://www.tiktok.com/embed.js', {type: 'js'});
  }, []);


  // if (!widget.config.url) return null;

  if (variant === 'editor') {
    return (
      <div className="flex items-center gap-8">
        <RemoteFavicon url={widget.config.button_text} />
        <a
          href={widget.config.button_text}
          target="_blank"
          className="text-muted text-sm hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[80%]"
          rel="noreferrer"
        >
          {widget.config.button_text}
        </a>
      </div>
    );
  }

  const variants: BiolinkBtnConfig['variant'] =
    appearance?.btnConfig?.variant ?? 'flat';
  const radius: BiolinkBtnConfig['radius'] =
    appearance?.btnConfig?.radius ?? 'rounded';
  const shadow: BiolinkBtnConfig['shadow'] =
    appearance?.btnConfig?.shadow ?? undefined;
  const buttonColor: BiolinkBtnConfig['color'] =
    appearance?.btnConfig?.color ?? 'primary';
  const buttonTextColor = appearance?.btnConfig?.textColor ?? undefined;

  const isCustomBgColor = buttonColor !== 'primary' && buttonColor !== 'paper';

  return (
    <>

      <DialogTrigger type="modal">
        <Button
          className={clsx(
            'w-full min-h-54 break-words hyphens-auto',
            // link.animation && `animate__animated animate__${link.animation}`
          )}
          variant={variants}
          radius={radius}
          color={!isCustomBgColor ? buttonColor : null}
          // startIcon={
          //   link.image ? (
          //     <img
          //       className="w-24 h-24 object-cover rounded"
          //       src={link.image}
          //       alt=""
          //     />
          //   ) : undefined
          // }
          whitespace="whitespace-normal"
          style={{
            boxShadow: shadow,
            backgroundColor: isCustomBgColor ? buttonColor : undefined,
            borderColor: isCustomBgColor ? buttonColor : undefined,
            color: buttonTextColor,
          }}
        >
          {widget.config.button_text}
        </Button>
        <ConnectMailDialog widget={widget} biolink={biolink} />
      </DialogTrigger>



    </>

  );

}
