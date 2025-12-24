import { Module } from '@nestjs/common';
import { DevicePositionController } from './device_position.controller';
import { DevicePositionService } from './device_position.service';

@Module({
  controllers: [DevicePositionController],
  providers: [DevicePositionService]
})
export class DevicePositionModule {}
