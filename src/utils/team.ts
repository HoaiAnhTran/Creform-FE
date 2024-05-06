import { TeamResponse } from '@/types';

export const addRoleToTeamMembers = (team: TeamResponse) => {
  const membersWithRoles = team.members
    .map((member) => ({
      ...member,
      isOwner: member.id === team.creatorId,
      role: member.id === team.creatorId ? 'Team Owner' : 'Member',
    }))
    .sort((firstVal, secondVal) => {
      if (firstVal.isOwner && !secondVal.isOwner) {
        return -1;
      } else if (!firstVal.isOwner && secondVal.isOwner) {
        return 1;
      } else {
        return 0;
      }
    });

  return membersWithRoles;
};
