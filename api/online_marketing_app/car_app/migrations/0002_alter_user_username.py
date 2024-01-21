# Generated by Django 4.2.5 on 2024-01-21 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("car_app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=110, unique=True),
        ),
        migrations.RunSQL(
            sql='CREATE FULLTEXT INDEX user_fulltext_idx ON users (id, username, first_name, last_name, phone_number, manager_code);',
            reverse_sql='DROP INDEX user_fulltext_idx ON users;'
        ),
    ]