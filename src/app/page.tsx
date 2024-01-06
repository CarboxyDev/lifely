import Age from '@/components/Age';
import ButtonGroup from '@/components/ButtonGroup';
import Console from '@/components/Console';
import EventGroup from '@/components/EventGroup';
import PrimaryValues from '@/components/PrimaryValues';
import SecondaryValues from '@/components/SecondaryValues';

/**
 * Roughly 5.5:1 ratio for main content to sidebar
 * Left side main Content: (Screen height)
 *  - Secondary Values -> Fixed height
 *  - Console -> Fluid height (Remaining height)
 *  - Button Group -> Fixed height
 */

export default function Home() {
  let consoleHeight = 'calc(100vh - 2.25rem - 2.25rem - 1rem - 1rem - 9rem)';

  return (
    <main className="mx-12 my-10 2xl:mx-24 grid grid-flow-col grid-cols-13 gap-x-4">
      <div className="col-span-10 2xl:col-span-11 flex flex-col gap-y-4">
        <SecondaryValues />
        <div style={{ height: consoleHeight }}>
          <Console />
        </div>
        <ButtonGroup />
      </div>
      <div className="col-span-3 2xl:col-span-2 h-full flex flex-col gap-y-4">
        <Age />
        <PrimaryValues />
        <EventGroup />
      </div>
    </main>
  );
}
