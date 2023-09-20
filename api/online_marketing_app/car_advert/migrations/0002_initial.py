# Generated by Django 4.2.5 on 2023-09-20 13:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('car_manufacture_year', '0001_initial'),
        ('car_advert', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='caradvert',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='adverts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='caradvert',
            name='year',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='adverts', to='car_manufacture_year.manufactureyear'),
        ),
    ]