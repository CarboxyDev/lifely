import { HourglassIcon } from '@/components/Icons';

const Age = () => {
  return (
    <div className="flex flex-row items-center justify-center px-6 py-5 bg-dark-900 rounded-xl border-dark-700 border ml-auto">
      <HourglassIcon className="text-dark-400" />
      <span className="mx-3 text-dark-300 font-semibold text-2xl">18y 5m</span>
    </div>
  );
};

export default Age;
