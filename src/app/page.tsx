import Age from '@/components/Age';
import ButtonGroup from '@/components/ButtonGroup';
import Console from '@/components/Console';
import EventGroup from '@/components/EventGroup';
import PrimaryValues from '@/components/PrimaryValues';
import SecondaryValues from '@/components/SecondaryValues';

/**
 * 5:1 ratio for main content to sidebar
 * Left side main Content:
 *  - Secondary Values -> Fixed height
 *  - Console -> Fluid height
 *  - Button Group -> Fixed height
 */

export default function Home() {
  return (
    <main className="mx-12 my-9 grid grid-flow-col grid-cols-13 gap-x-4 h-screen">
      <div className="col-span-11 flex flex-col gap-y-4">
        <SecondaryValues />
        <Console />
        <ButtonGroup />
      </div>
      <div className="col-span-2">
        <Age />
        <PrimaryValues />
        <EventGroup />
      </div>
    </main>
  );
}
