import {
  BankIcon,
  RocketIcon,
  SocialIcon,
  ThunderIcon,
} from '@/components/Icons';
import { Setter } from '@/lib/store/setter';
import { useRef } from 'react';

interface GameButtonProps {
  label: string;
  icon: JSX.Element;
}

const GameButton = (props: GameButtonProps) => {
  const { label, icon } = props;

  return (
    <button className="flex flex-row items-center rounded-xl border border-transparent bg-dark-900 px-4 py-4 text-zinc-300 shadow-md transition delay-100 duration-200 ease-linear hover:bg-dark-800 focus:ring-1 focus:ring-primary-500 *:focus:text-primary-500 *:focus:transition *:focus:duration-100 *:focus:ease-in-out ">
      <div className="text-zinc-400">{icon}</div>
      <span className="ml-3 text-[16px] font-medium text-zinc-200">
        {label}
      </span>
    </button>
  );
};

const AgeUpButton = () => {
  const ageUpButtonRef = useRef<HTMLButtonElement>(null);
  const ageUp = () => {
    console.log('Player aged +1 month');
    Setter.increaseAge(1);
    if (ageUpButtonRef.current) {
      // Handle case when the user just keeps clicking the button in a short time frame
    }
  };
  return (
    <button
      onClick={() => ageUp()}
      ref={ageUpButtonRef}
      className="flex w-full items-center justify-center rounded-xl border border-dark-700 bg-dark-900 text-zinc-200 shadow-md transition delay-100 duration-200 ease-linear hover:border-sky-500 hover:bg-sky-500 hover:text-white"
    >
      Age 1 month
    </button>
  );
};

const ButtonGroup = () => {
  return (
    <div className="flex flex-row gap-x-3">
      <GameButton label={'Actions'} icon={<RocketIcon />}></GameButton>
      <GameButton label={'Activities'} icon={<ThunderIcon />}></GameButton>
      <GameButton label={'Special'} icon={<ThunderIcon />}></GameButton>
      <AgeUpButton />
      <div className="hidden 2xl:block">
        <GameButton label={'Special'} icon={<ThunderIcon />}></GameButton>
      </div>
      <GameButton label={'Finances'} icon={<BankIcon />}></GameButton>
      <GameButton label={'Socials'} icon={<SocialIcon />}></GameButton>
    </div>
  );
};

export default ButtonGroup;
