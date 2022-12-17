import { Test } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../../testing/typeOrmSqlite.module';

//import { MaterialService } from '../materials/material.service';
import { StatusService } from './status.service';
//import { Material } from '../materials/material.entity';
import { Status } from './status.entity';

describe('Status Entity', () => {
  //let service: StatusService

  beforeEach(async () => {
    //const module =  await Test.createTestingModule({
    //  imports: [...TypeOrmTestingModule()],
    //  providers: [StatusService],
    //  //providers: [Status],
    //}).compile();
    //service = module.get<StatusService>(StatusService);
  })
  //describe('Status validation', () => {
    it('Allow valid status updates', () => {
      Status.insert(new Status());
    })
    //it('Forbid invalid status updates', () => {})
    //it('allows status updates with no history', () => {})
  //})
})
