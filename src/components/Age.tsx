import { HourglassIcon } from '@/components/Icons';
import { Responsive } from '@/components/Responsive';
import { formatAge } from '@/lib/format';
import { Getter } from '@/lib/store/getter';

const Age = () => {
  const age = Getter.useAge();

  return (
    <div className="ml-auto flex flex-row items-center justify-center rounded-xl border border-dark-700 bg-dark-900 px-5 py-4">
      <HourglassIcon className="text-dark-400" />
      <Responsive.BigText className="ml-3 text-dark-200">
        {formatAge(age)}
      </Responsive.BigText>
    </div>
  );
};

export default Age;
