import { define } from 'typeorm-seeding';
import { Status } from '../../resources/statuses/status.entity';
import { StatusTypes } from '../../../../global-types/src/index';

define(Status, () => {
  const ids = [1, 2, 3, 4, 5];
  const getIdNumber = () => ids[Math.floor(Math.random() * ids.length)];

  const status = new Status();
  status.material_id = getIdNumber();
  status.person_id = getIdNumber();
  status.status = StatusTypes.FREE;
  return status;
});
