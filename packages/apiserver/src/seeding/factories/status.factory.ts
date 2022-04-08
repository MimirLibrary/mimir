import { define } from 'typeorm-seeding';
import { Status } from '../../resources/statuses/status.entity';

define(Status, () => {
  const ids = [1, 2, 3, 4, 5];
  const getIdNumber = () => String(ids[Math.floor(Math.random() * ids.length)]);
  const statuses = ['Free', 'Busy'];
  const getStatus = () => String(statuses[Math.floor(Math.random() * 2)]);

  const status = new Status();
  status.material_id = getIdNumber();
  status.person_id = getIdNumber();
  status.status = getStatus();
  return status;
});
