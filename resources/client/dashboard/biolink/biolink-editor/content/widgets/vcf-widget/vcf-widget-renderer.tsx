import { WidgetRendererProps } from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-renderer-props';
import { RemoteFavicon } from '@common/ui/remote-favicon';
import vfcImage from '../widget-selector/widget-images/vcf.png';
import { useEffect } from 'react';
import lazyLoader from '@common/utils/http/lazy-loader';
import { VcfWidget } from './vcf-widget-dialog';
import { Button } from '@common/ui/buttons/button';
import type {
  Biolink,
  BiolinkAppearance,
  BiolinkBtnConfig,
  BiolinkLink,
} from '@app/dashboard/biolink/biolink';
import clsx from 'clsx';

export function VcfWidgetRenderer({
  widget,
  variant,
  appearance
}: WidgetRendererProps<VcfWidget>) {

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
          elementType="a"
          href={"/api/v1/download-vcf/"+widget.id}
          download="download"
          style={{
            boxShadow: shadow,
            backgroundColor: isCustomBgColor && variants != "outline" ? buttonColor : undefined,
            borderColor: isCustomBgColor ? buttonColor : undefined,
            color: buttonTextColor,
          }}
        >
          {widget.config.button_text}
        </Button>
      );

  // const embedURL = new URL(widget.config.url).pathname.split('/').pop()?.trim();
  // return (
    // <Button
    //   className={'w-full min-h-20 break-words hyphens-auto'}
    //   variant="flat"
    //   radius="rounded"
    //   color="primary"
    //   startIcon={
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="#ffffff"
    //       stroke="#ffffff"
    //       strokeWidth={0.72}
    //       viewBox="0 0 24 24"
    //       width={20}
    //       height={20}
    //     >
    //       <g fill="#ffffff">
    //         <path d="M12.553 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.108-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013l-4 4.375Z" />
    //         <path d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191Z" />
    //       </g>
    //     </svg>


    //   }
    //   whitespace="whitespace-normal"
    //   elementType="a"
    //   href={"/api/v1/download-vcf/"+widget.id}
    //   // target="_blank"
    //   download="download"
    // >
    //   {widget.config.button_text}
    // </Button>
  // );
}
