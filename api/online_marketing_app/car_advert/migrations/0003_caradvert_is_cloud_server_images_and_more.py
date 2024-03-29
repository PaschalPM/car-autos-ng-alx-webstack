# Generated by Django 4.2.5 on 2024-01-21 11:39

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("car_advert", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="caradvert",
            name="is_cloud_server_images",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="caradvert",
            name="is_cloud_server_thumbnail",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="caradvert",
            name="tag",
            field=models.CharField(
                blank=True, editable=False, max_length=100, null=True
            ),
        ),
        migrations.AddField(
            model_name="caradvert",
            name="thumbnail_cloud",
            field=models.CharField(blank=True, default="", max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name="caradvert",
            name="id",
            field=models.CharField(
                default=uuid.uuid4,
                editable=False,
                max_length=36,
                primary_key=True,
                serialize=False,
                unique=True,
            ),
        ),
        migrations.AlterField(
            model_name="caradvert",
            name="thumbnail",
            field=models.ImageField(
                blank=True, default="", null=True, upload_to="thumbnail"
            ),
        ),
    ]
