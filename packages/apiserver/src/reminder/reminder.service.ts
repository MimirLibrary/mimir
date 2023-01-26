import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email';
import { Material } from '../resources/materials/material.entity';
import { Person } from '../resources/persons/person.entity';
import { Status } from '../resources/statuses/status.entity';
import { getIdMap } from '../utils/helpersFunctions/getIdMap';
import { StatusService } from '../resources/statuses/status.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReminderService {
  get reminderPeriod(): number {
    return +this.config.get<number>('common.reminderPeriod');
  }

  constructor(
    private emailService: EmailService,
    private statusService: StatusService,
    private config: ConfigService
  ) {}

  public async sendReturnBookReminders(): Promise<void> {
    const statuses = await this.statusService.getStatusesForReminder(
      this.reminderPeriod
    );
    if (!statuses?.length) {
      return;
    }
    const materials = await Material.findByIds(
      statuses.map((status) => status.material_id)
    );
    const persons = await Person.findByIds(
      statuses.map((status) => status.person_id)
    );
    const materialsIdMap = getIdMap(materials);
    const personsIdMap = getIdMap(persons);

    statuses.forEach((status) =>
      this.sendReminder(
        personsIdMap[status.person_id],
        materialsIdMap[status.material_id],
        status
      )
    );
  }

  private async sendReminder(
    person: Person,
    material: Material,
    status: Status
  ): Promise<void> {
    try {
      await this.emailService.sendReturnBookReminderEmail(
        person.email,
        material
      );
      await Status.update(status.id, {
        lastReminderTime: () => 'NOW()',
      });
    } catch (error) {
      Logger.log(error);
    }
  }
}
