import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ uniqueItems: true, type: Number })
  id: number;
}
