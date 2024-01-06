import { cn } from '@/lib/util';
import { HTMLProps } from 'react';

type ClassName = HTMLProps<HTMLElement>['className'];

interface GenericTextProps extends React.PropsWithChildren {
  className?: ClassName;
}

export class Responsive {
  public static BigText = (props: GenericTextProps) => {
    return (
      <span
        className={cn(props.className, 'font-semibold text-xl 2xl:text-2xl')}
      >
        {props.children}
      </span>
    );
  };
}
