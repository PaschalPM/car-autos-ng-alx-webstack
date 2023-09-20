# Generated by Django 4.2.5 on 2023-09-20 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('car_advert', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, default='', null=True, upload_to='advertisement_images')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('car_advert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='car_advert.caradvert')),
            ],
            options={
                'db_table': 'images',
            },
        ),
    ]
