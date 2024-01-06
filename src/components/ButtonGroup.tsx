import { RocketIcon } from '@/components/Icons';

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

const ButtonGroup = () => {
  return (
    <div>
      <GameButton label={'Actions'} icon={<RocketIcon />}></GameButton>
    </div>
  );
};

export default ButtonGroup;
