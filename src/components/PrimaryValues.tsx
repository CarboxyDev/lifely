'use client';

import {
  BrainIcon,
  HeartIcon,
  LooksIcon,
  MoraleIcon,
} from '@/components/Icons';
import { PrimaryValue } from '@/lib/types/general';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const primaryValueInfo = {
  health: {
    color: '#ef4444',
    icon: <HeartIcon />,
  },
  morale: {
    color: '#f59e0b',
    icon: <MoraleIcon />,
  },
  intellect: {
    color: '#0ea5e9',
    icon: <BrainIcon />,
  },
  looks: {
    color: '#ec4899',
    icon: <LooksIcon />,
  },
};

interface ProgressRingProps {
  name: PrimaryValue;
  value: number;
}
export const ProgressRing = (props: ProgressRingProps) => {
  const { name, value } = props;

  return (
    <div className="w-20 h-20">
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={9}
        counterClockwise={true}
        styles={{
          path: {
            stroke: primaryValueInfo[name].color,
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 0.5s ease 0s',
          },
          trail: {
            stroke: primaryValueInfo[name].color,
            strokeOpacity: 0.2,
          },
        }}
      >
        <div
          style={{ color: primaryValueInfo[name].color }}
          className="flex items-center justify-center"
        >
          {primaryValueInfo[name].icon}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

interface PrimaryValueItemProps {
  name: PrimaryValue;
  value: number;
}

export const PrimaryValueItem = (props: PrimaryValueItemProps) => {
  const { name } = props;
  return (
    <>
      <ProgressRing {...props} />
    </>
  );
};

const PrimaryValues = () => {
  return (
    <div className="bg-dark-900 rounded-xl border-dark-700 border flex items-center justify-center flex-col py-8 gap-y-12">
      <PrimaryValueItem name={'health'} value={86} />
      <PrimaryValueItem name={'morale'} value={73} />
      <PrimaryValueItem name={'intellect'} value={81} />
      <PrimaryValueItem name={'looks'} value={45} />
    </div>
  );
};

export default PrimaryValues;
