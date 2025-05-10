
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Group, User } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { AvatarGroup } from '@/components/ui/avatar';

interface GroupItemProps {
  group: Group;
  currentUser: User;
}

const GroupItem = ({ group, currentUser }: GroupItemProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Number of members to display before showing +X more
  const MAX_VISIBLE_MEMBERS = 3;
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${isHovered ? 'shadow-md border-primary/40' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{group.name}</CardTitle>
          <Badge variant="outline">
            {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center">
          <AvatarGroup>
            {group.members.slice(0, MAX_VISIBLE_MEMBERS).map(member => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
            ))}
            {group.members.length > MAX_VISIBLE_MEMBERS && (
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>+{group.members.length - MAX_VISIBLE_MEMBERS}</AvatarFallback>
              </Avatar>
            )}
          </AvatarGroup>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Created {formatDate(group.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => console.log(`Manage group: ${group.id}`)}
        >
          Manage
        </Button>
        <Button 
          size="sm"
          onClick={() => navigate(`/add-expense?groupId=${group.id}`)}
        >
          Add Expense
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupItem;
