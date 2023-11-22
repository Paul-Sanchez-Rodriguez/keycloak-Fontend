export class TutorDto {
    teenId: number = 0;
}

export class UpdateTutorDto{
    legalGuardianId:number = 0;
    description: string = '';
    teens: TutorDto[] | undefined;
    
}