import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2000': {
        this.formatError(response, {
          message: this.cleanUpException(exception),
          statusCode: HttpStatus.BAD_REQUEST,
          error: BadRequestException.name,
        });
        break;
      }
      case 'P2002': {
        this.formatError(response, {
          message: exception.meta?.target?.[0]
            ? `A record with the given '${exception.meta?.target[0]}' field value already exists`
            : 'Unknown error',
          statusCode: HttpStatus.CONFLICT,
          error: ConflictException.name,
        });
        break;
      }
      case 'P2025': {
        this.formatError(response, {
          message: (exception.meta?.cause as string | undefined) || 'Record not found.',
          statusCode: HttpStatus.NOT_FOUND,
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

  cleanUpException(exception: Error): string {
    return exception.message.replaceAll('\n', '');
  }

  formatError(
    response: Response,
    { statusCode, message, error }: { statusCode: number; message: string; error: string },
  ) {
    response.status(statusCode).json({ statusCode, message, error });
  }
}
