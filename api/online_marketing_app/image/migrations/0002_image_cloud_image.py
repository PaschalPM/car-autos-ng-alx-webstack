# Generated by Django 4.2.5 on 2024-01-21 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("image", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="image",
            name="cloud_image",
            field=models.CharField(blank=True, default="", max_length=200, null=True),
        ),
    ]
