import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { Person } from '../resources/persons/person.entity';
import { BlockedUsers } from '../resources/blocked-users/blocked-users.entity';

@Injectable()
export class AuthService {
  readonly oAuth2Client: OAuth2Client;
  constructor() {
    this.oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );
  }

  async authenticate(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    const bufB64 = Buffer.from(tokens.id_token.split('.')[1], 'base64');
    const result = JSON.parse(bufB64.toString());
    const person = await Person.findOne({
      where: {
        smg_id: result.sub,
      },
    });
    const state = await BlockedUsers.findOne({
      where: {
        person_id: person.id,
      },
    });
    if (person)
      return {
        ...tokens,
        ...person,
        userRole: person.type,
        blocked: state?.state,
      };

    const newPerson = Person.create({
      smg_id: result.sub,
      avatar: result.picture,
      email: result.email,
      username: result.name,
      position: 'Ruby Developer',
      type: 'Reader',
    });
    await Person.save(newPerson);

    return { ...tokens, ...newPerson, userRole: newPerson.type };
  }

  async verifyToken(id_token: string) {
    try {
      await this.oAuth2Client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const user = new UserRefreshClient(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        refresh_token
      );
      const { credentials } = await user.refreshAccessToken();
      return credentials;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
