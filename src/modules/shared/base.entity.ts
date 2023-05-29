import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ uniqueItems: true, type: Number })
  id: number;

  // @ApiProperty({ type: Date })
  // createdAt: Date;

  // @ApiProperty({ type: Date })
  // updatedAt: Date;
}
