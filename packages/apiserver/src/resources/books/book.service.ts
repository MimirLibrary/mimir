import {Injectable} from "@nestjs/common";
import {ClaimBookInput} from "@mimir/global-types";
import {Material} from "../materials/material.entity";
import {Status} from "../statuses/status.entity";
import {Connection} from "typeorm";
import {ClaimError} from "../../errors";

@Injectable()
export class BookService {
  constructor(private connection: Connection) {}
  async claim(claimBookInput: ClaimBookInput) {
    const queryRunner = this.connection.createQueryRunner();
    const statusRepository = queryRunner.manager.getRepository<Status>('status')
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { identifier, person_id } = claimBookInput;
      if (!identifier) {
        return new ClaimError(404, 'Received identifier not recognized, please try again')
      }
      const material = await Material.findOne({ where: { identifier} });
      if (!material) {
        return new ClaimError(404, 'This book is not registered in the library')
      }
      const { id } = material;
      const status = await statusRepository.find({
        where: { material_id: id }, order: {created_at: "DESC"}, take: 1
      });
      if (!status || status[0].status === 'Busy') {
        return new ClaimError(404, `This book is busy or doesn't exist. Ask the manager!`)
      }
      const newStatus = await statusRepository.create({status: "Busy", material_id: status[0].material_id, person_id});
      await queryRunner.manager.save<Status>(newStatus)
      await queryRunner.commitTransaction();
      return newStatus
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return e.message
    }
    finally {
      await queryRunner.release();
    }
  }
}
