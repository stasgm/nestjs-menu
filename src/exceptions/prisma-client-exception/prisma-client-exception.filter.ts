import { ArgumentsHost, BadRequestException, Catch, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: exception.meta?.target?.[0]
            ? `A record with the given '${exception.meta?.target[0]}' field value already exists`
            : 'Unknown error',
          error: BadRequestException.name,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: exception.meta?.cause || 'Record not found.',
          error: NotFoundException.name,
        });
        break;
      }
      default: {
        // default 500 error code
        super.catch(exception, host);
        break;
      }
    }
  }
}
