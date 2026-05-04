export class CreateChipDto {
  chipGuessId: string;
  chipById: string;
}

export class CreateGameDto {
  chips: CreateChipDto[];
}
