import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuPipe implements PipeTransform<CreateMenuDto, Promise<CreateMenuDto>> {
  constructor(private productsService: ProductsService) {}
  private errorString = 'Incoming menu line contains invalid data';

  async transform(value: CreateMenuDto): Promise<CreateMenuDto> {
    for (const line of value.lines) {
      const product = await this.productsService.findOne(line.productId);
      if (!product) {
        throw new BadRequestException(`${this.errorString}: product with id '${line.productId}' doesn't exist`);
      }
    }

    return value;
  }
}
