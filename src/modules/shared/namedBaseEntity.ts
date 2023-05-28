import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './baseEntity';

export class NamedBaseEntity extends BaseEntity {
  @ApiProperty({ type: String })
  name: string;
}
