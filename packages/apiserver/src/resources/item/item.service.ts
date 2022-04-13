import {Injectable} from "@nestjs/common";
import {Material} from "../materials/material.entity";
import {Status} from "../statuses/status.entity";
import {Connection} from "typeorm";
import {ClaimError} from "../../errors";

@Injectable()
export class ItemService {
  constructor(private connection: Connection) {
  }

  async claim(claimBookInput) {
    const queryRunner = this.connection.createQueryRunner();
    const statusRepository = queryRunner.manager.getRepository<Status>('status')
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {identifier, person_id} = claimBookInput;
      if (!identifier) {
        throw new ClaimError('Received identifier not recognized, please try again')
      }
      const material = await Material.findOne({where: {identifier}});
      if (!material) {
        throw new ClaimError('This book is not registered in the library')
      }
      const {id} = material;
      const status = await statusRepository.find({
        where: {material_id: id}, order: {created_at: "DESC"}, take: 1
      });
      if (!status || status[0].status === 'Busy') {
        throw new ClaimError(`This book is busy or doesn't exist. Ask the manager!`);
      }
      const newStatus = await statusRepository.create({status: "Busy", material_id: status[0].material_id, person_id});
      await queryRunner.manager.save<Status>(newStatus)
      await queryRunner.commitTransaction();
      return newStatus
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
