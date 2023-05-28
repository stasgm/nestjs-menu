import { ApiProperty } from '@nestjs/swagger';
import { NamedBaseEntity } from './namedBaseEntity';

export class RefBaseEntity extends NamedBaseEntity {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
