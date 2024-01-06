import { DollarIcon } from '@/components/Icons';
import { Responsive } from '@/components/Responsive';

const SecondaryValues = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center px-6 py-5 bg-dark-900 rounded-xl border-dark-700 border mr-auto">
        <DollarIcon className="text-green-400" />
        <Responsive.BigText className="ml-3 text-dark-200">
          1,285,521
        </Responsive.BigText>
      </div>
    </div>
  );
};

export default SecondaryValues;
