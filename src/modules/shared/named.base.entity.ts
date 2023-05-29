import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export class NamedBaseEntity extends BaseEntity {
  @ApiProperty({ type: String })
  name: string;
}
