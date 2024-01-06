import { HourglassIcon } from '@/components/Icons';
import { Responsive } from '@/components/Responsive';

const Age = () => {
  return (
    <div className="flex flex-row items-center justify-center px-6 py-5 bg-dark-900 rounded-xl border-dark-700 border ml-auto">
      <HourglassIcon className="text-dark-400" />
      <Responsive.BigText className="ml-3 text-dark-200">
        18y 5m
      </Responsive.BigText>
    </div>
  );
};

export default Age;
