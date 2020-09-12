import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTableUsers1599700487132 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
