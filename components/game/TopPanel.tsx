'use client';

import { useAtom } from 'jotai';
import { moneyAtom, userAtom, bankAtom } from '@/lib/atoms/game-state';
import { formatCurrency, formatAge } from '@/lib/utils/game-utils';
import { motion } from 'framer-motion';
import { DollarSign, Calendar } from 'lucide-react';
import { useState } from 'react';

export function TopPanel() {
  const [money] = useAtom(moneyAtom);
  const [user] = useAtom(userAtom);
  const [bank] = useAtom(bankAtom);
  const [showBank, setShowBank] = useState(false);

  return (
    <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Money Display */}
        <motion.div
          onMouseEnter={() => setShowBank(true)}
          onMouseLeave={() => setShowBank(false)}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-zinc-500">Cash</div>
            <div className="text-lg font-bold text-green-400">
              {formatCurrency(money)}
            </div>
            {showBank && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute mt-1 text-xs text-zinc-400"
              >
                Bank: {formatCurrency(bank.balance)}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Age Display */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div className="text-right text-xs text-zinc-500">Age</div>
            <div className="text-lg font-bold text-blue-400">
              {formatAge(user.age)}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <Calendar className="h-5 w-5 text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
