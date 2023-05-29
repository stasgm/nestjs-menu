import { ApiProperty } from '@nestjs/swagger';
import { NamedBaseEntity } from './named.base.entity';

export class RefBaseEntity extends NamedBaseEntity {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
