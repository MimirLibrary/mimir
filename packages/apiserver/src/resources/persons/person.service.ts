import { Injectable } from '@nestjs/common';

const persons = [{
  id: "1",
  smg_id: "22222",
  type: "user",
  created_at: new Date(),
  status: {
    id: "2",
    material: "book1",
    person: {
      id: "5",
      smg_id: "22222",
      type: "user",
      created_at: new Date()
    },
    status: "free",
    created_at: new Date()
  }
}]

@Injectable()
export class PersonService {

  async findOne(id: string){
    const user = persons.find(item => item.id === id)
    return user
  }
}
