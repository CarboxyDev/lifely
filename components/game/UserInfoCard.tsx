'use client';

import { useAtom } from 'jotai';
import { userAtom, calendarAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Briefcase, MapPin, GraduationCap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/game-utils';

export function UserInfoCard() {
  const [user] = useAtom(userAtom);
  const [calendar] = useAtom(calendarAtom);

  const hasEducation = user.education && user.education.degrees.length > 0;
  const latestDegree = hasEducation ? user.education.degrees[user.education.degrees.length - 1] : null;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-4 w-4" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Name & Age */}
        <div>
          <div className="text-xs text-muted-foreground">Name</div>
          <div className="text-lg font-bold text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground mt-0.5">Age {calendar.ageInYears}</div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 pt-2 border-t border-border">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Location</div>
            <div className="text-sm font-medium text-foreground">{user.country}</div>
          </div>
        </div>

        {/* Career */}
        <div className="flex items-start gap-2">
          <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Career</div>
            <div className="text-sm font-medium text-foreground">
              {user.job.name || 'Unemployed'}
            </div>
            {user.job.name && user.job.name !== 'Unemployed' && (
              <div className="mt-0.5 text-xs text-muted-foreground">
                {formatCurrency(user.job.salary)}/mo
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {hasEducation && latestDegree && (
          <div className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Education</div>
              <div className="text-sm font-medium text-foreground">
                {latestDegree.major}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                GPA: {latestDegree.gpa.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
