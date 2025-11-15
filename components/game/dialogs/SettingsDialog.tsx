'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAtom } from 'jotai';
import { initializeGameAtom } from '@/lib/atoms/game-state';
import { Download, Upload, RotateCcw, Palette, Save } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [, initGame] = useAtom(initializeGameAtom);
  const { theme, setTheme } = useTheme();

  const handleNewLife = () => {
    initGame();
    onOpenChange(false);
    toast.success('New life started!');
  };

  const handleExportGame = () => {
    try {
      const gameData = {
        user: localStorage.getItem('lifely-user'),
        stats: localStorage.getItem('lifely-stats'),
        money: localStorage.getItem('lifely-money'),
        bank: localStorage.getItem('lifely-bank'),
        messages: localStorage.getItem('lifely-messages'),
      };

      const dataStr = JSON.stringify(gameData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lifely-save-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success('Game data exported successfully!');
    } catch (error) {
      toast.error('Failed to export game data');
    }
  };

  const handleImportGame = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const gameData = JSON.parse(event.target?.result as string);

          if (gameData.user) localStorage.setItem('lifely-user', gameData.user);
          if (gameData.stats) localStorage.setItem('lifely-stats', gameData.stats);
          if (gameData.money) localStorage.setItem('lifely-money', gameData.money);
          if (gameData.bank) localStorage.setItem('lifely-bank', gameData.bank);
          if (gameData.messages) localStorage.setItem('lifely-messages', gameData.messages);

          toast.success('Game data imported! Refresh to see changes.');
          setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
          toast.error('Invalid save file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
          <DialogDescription>
            Customize your game experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="theme">Theme</Label>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Save/Load */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Game Data</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleExportGame}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                onClick={handleImportGame}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>

          <Separator />

          {/* Reset */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Actions</Label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Start New Life
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-border bg-card">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your current life and start a new one.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleNewLife}>
                    Start New Life
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
