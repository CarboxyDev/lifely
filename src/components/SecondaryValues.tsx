import { DollarIcon } from '@/components/Icons';
import { Responsive } from '@/components/Responsive';
import { Getter } from '@/lib/store/getter';

const SecondaryValues = () => {
  const money = Getter.useMoney() || 0;

  return (
    <div className="flex flex-row">
      <div className="mr-auto flex flex-row items-center rounded-xl border border-dark-700 bg-dark-900 px-5 py-4">
        <DollarIcon className="text-green-400" />
        <Responsive.BigText className="ml-3 text-dark-200">
          {money}
        </Responsive.BigText>
      </div>
    </div>
  );
};

export default SecondaryValues;
