import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddChecklistFieldToChecks1589250431121
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'checks',
      new TableColumn({
        name: 'checklist_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'checks',
      new TableForeignKey({
        name: 'Checklist',
        columnNames: ['checklist_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'checklists',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('checks', 'Checklist');

    await queryRunner.dropColumn('checks', 'checklist_id');
  }
}
