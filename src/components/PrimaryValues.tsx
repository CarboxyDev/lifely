'use client';

import {
  BrainIcon,
  HeartIcon,
  LooksIcon,
  MoraleIcon,
} from '@/components/Icons';
import { Getter } from '@/lib/store/getter';
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

/** Reference: https://www.npmjs.com/package/react-circular-progressbar?activeTab=readme */

export const ProgressRing = (props: ProgressRingProps) => {
  const { name, value } = props;

  return (
    <div className="h-20 w-20">
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
        <div style={{ color: primaryValueInfo[name].color }}>
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
  const values = Getter.usePrimaryValues();

  return (
    <div className="flex flex-col items-center justify-center gap-y-12 rounded-xl border border-dark-700 bg-dark-900 py-8">
      <PrimaryValueItem name={'health'} value={values?.health || 0} />
      <PrimaryValueItem name={'morale'} value={values?.morale || 0} />
      <PrimaryValueItem name={'intellect'} value={values?.intellect || 0} />
      <PrimaryValueItem name={'looks'} value={values?.looks || 0} />
    </div>
  );
};

export default PrimaryValues;
