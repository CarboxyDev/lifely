'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, User, Home, Landmark, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { JobsDialog } from './JobsDialog';
import { ProfileDialog } from './ProfileDialog';
import { BankDialog } from './BankDialog';

interface ActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionsDialog({ open, onOpenChange }: ActionsDialogProps) {
  const [jobsOpen, setJobsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);

  const actions = [
    {
      icon: <Landmark className="h-5 w-5" />,
      label: 'Bank',
      description: 'Manage your finances',
      color: 'from-green-500 to-emerald-600',
      onClick: () => {
        onOpenChange(false);
        setBankOpen(true);
      },
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      label: 'Budget',
      description: 'Set monthly budget',
      color: 'from-blue-500 to-cyan-600',
      onClick: () => {},
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Jobs',
      description: 'Find employment',
      color: 'from-purple-500 to-pink-600',
      onClick: () => {
        onOpenChange(false);
        setJobsOpen(true);
      },
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      label: 'Study',
      description: 'Pursue education',
      color: 'from-orange-500 to-red-600',
      onClick: () => {},
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profile',
      description: 'View your details',
      color: 'from-zinc-500 to-zinc-700',
      onClick: () => {
        onOpenChange(false);
        setProfileOpen(true);
      },
    },
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Assets',
      description: 'Your possessions',
      color: 'from-yellow-500 to-amber-600',
      onClick: () => {},
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-2xl">Actions</DialogTitle>
            <DialogDescription>
              What would you like to do?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  onClick={action.onClick}
                  variant="outline"
                  className="h-auto w-full flex-col items-start gap-2 border-zinc-800 bg-zinc-900/50 p-4 hover:bg-zinc-800"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${action.color}`}>
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{action.label}</div>
                    <div className="text-xs text-zinc-400">{action.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-dialogs */}
      <JobsDialog open={jobsOpen} onOpenChange={setJobsOpen} />
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <BankDialog open={bankOpen} onOpenChange={setBankOpen} />
    </>
  );
}
