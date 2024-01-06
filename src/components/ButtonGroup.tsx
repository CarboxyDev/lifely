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
    <button className="bg-dark-900 rounded-xl border-dark-700 border px-5 py-4 flex flex-row items-center">
      <div className="text-zinc-400">{icon}</div>
      <span className="text-zinc-300 text-lg font-medium ml-3">{label}</span>
    </button>
  );
};

const AgeUpButton = () => {
  return (
    <button className="bg-dark-900 rounded-xl border-dark-700 border flex flex-row items-center w-full"></button>
  );
};

const ButtonGroup = () => {
  return (
    <div className="flex flex-row gap-x-3">
      <GameButton label={'Actions'} icon={<RocketIcon />}></GameButton>
      <GameButton label={'Activities'} icon={<ThunderIcon />}></GameButton>
      <AgeUpButton />
      <GameButton label={'Finances'} icon={<BankIcon />}></GameButton>
      <GameButton label={'Socials'} icon={<SocialIcon />}></GameButton>
    </div>
  );
};

export default ButtonGroup;
