import { DollarIcon, HourglassIcon } from "@/components/Icons";

const SecondaryAttributes = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center px-6 py-5 bg-dark-900 rounded-xl border-dark-700 border mr-auto">
        <DollarIcon className="text-green-400" />
        <span className="mx-3 text-dark-200 font-semibold text-2xl">
          1,285,521
        </span>
      </div>
      <div className="flex flex-row items-center px-6 py-5 bg-dark-900 rounded-xl border-dark-700 border ml-auto">
        <HourglassIcon className="text-dark-400" />
        <span className="mx-3 text-dark-300 font-semibold text-2xl">
          18y 5m
        </span>
      </div>
    </div>
  );
};

export default SecondaryAttributes;
