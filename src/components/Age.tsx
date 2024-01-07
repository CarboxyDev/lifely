import { HourglassIcon } from '@/components/Icons';
import { Responsive } from '@/components/Responsive';

const Age = () => {
  return (
    <div className="ml-auto flex flex-row items-center justify-center rounded-xl border border-dark-700 bg-dark-900 px-5 py-4">
      <HourglassIcon className="text-dark-400" />
      <Responsive.BigText className="ml-3 text-dark-200">
        18y 5m
      </Responsive.BigText>
    </div>
  );
};

export default Age;
