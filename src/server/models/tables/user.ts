import { Model, Sequelize, DataTypes } from 'sequelize';

export interface UserFlagsInterface {

}
export interface UserSettingsInterface {

}

interface UserCreationAttributes {
  uuid?: string;
  email: string;
  password: string;
  username: string;
  disabled: boolean;
  verified: boolean;
  last_ip: string;
  last_login: Date;
  flags: UserFlagsInterface;
  settings: UserSettingsInterface;
  meta: Record<string, any>;
}

interface UserAttributes extends UserCreationAttributes {
  uuid: string;
  created_at: Date;
  updated_at: Date;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public uuid!: string;

  public email!: string;

  public password!: string;

  public username!: string;

  public disabled!: boolean;

  public verified!: boolean;

  public last_ip!: string;

  public last_login!: Date;

  public flags!: UserFlagsInterface;

  public settings!: UserSettingsInterface;

  public meta!: Record<string, any>;

  public created_at!: Date;

  public updated_at!: Date;
}

export default (sequelize: Sequelize, tablePrefix = ''): void => {
  User.init(
    {
      uuid: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      last_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      flags: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      settings: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      meta: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: `${tablePrefix}user`,
  },
  );
};
