export class CommunityMemberResponseDto {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  twitchId: string | null;
  points: number;
}

export class CommunityResponseDto {
  id: string;
  owner: {
    displayName: string | null;
    avatarUrl: string | null;
  };
  members: CommunityMemberResponseDto[];
}
