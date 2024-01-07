import { cn } from '@/lib/util';
import { HTMLProps } from 'react';

type ClassName = HTMLProps<HTMLElement>['className'];

interface GenericTextProps extends React.PropsWithChildren {
  className?: ClassName;
}

export class Responsive {
  public static BigText = (props: GenericTextProps) => {
    return (
      <span className={cn(props.className, 'text-xl font-medium')}>
        {props.children}
      </span>
    );
  };
}
