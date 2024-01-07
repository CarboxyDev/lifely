import {
  BankIcon,
  RocketIcon,
  SocialIcon,
  ThunderIcon,
} from '@/components/Icons';

interface GameButtonProps {
  label: string;
  icon: JSX.Element;
}

const GameButton = (props: GameButtonProps) => {
  const { label, icon } = props;

  return (
    <button className="flex flex-row items-center rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-zinc-300 shadow-md transition delay-100 duration-200 ease-linear hover:bg-dark-800 focus:text-primary-500 focus:ring-1 focus:ring-primary-500">
      <div className="">{icon}</div>
      <span className="ml-3 text-[16px] font-medium">{label}</span>
    </button>
  );
};

const AgeUpButton = () => {
  return (
    <button className="flex w-full items-center justify-center rounded-xl border border-dark-700 bg-dark-900 text-zinc-200 shadow-md transition delay-100 duration-200 ease-linear hover:border-sky-500 hover:bg-sky-500 hover:text-white">
      Age +1 month
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
