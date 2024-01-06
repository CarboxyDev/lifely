'use client';

import Age from '@/components/Age';
import ButtonGroup from '@/components/ButtonGroup';
import Console from '@/components/Console';
import EventGroup from '@/components/EventGroup';
import PrimaryValues from '@/components/PrimaryValues';
import SecondaryValues from '@/components/SecondaryValues';
import { createNewLife } from '@/lib/new-life';
import { useEffect } from 'react';

/**
 * Supported screen sizes so far: xl, 2xl (i.e laptop, desktop)
 * Roughly 5.5:1 ratio for main content to sidebar
 * Left side main Content: (Screen height)
 *  - Secondary Values -> Fixed height
 *  - Console -> Fluid height (Remaining height)
 *  - Button Group -> Fixed height
 */

export default function Home() {
  let consoleHeight = 'calc(100vh - 2.25rem - 2.25rem - 1rem - 1rem - 8rem)'; // css calc() hack for greedy fluid height of console

  useEffect(() => {
    const player = createNewLife();
    console.log(player);
  });

  return (
    <main className="mx-12 my-10 2xl:mx-24 grid-flow-col grid-cols-13 gap-x-4 hidden xl:grid">
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
