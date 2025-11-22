# Generated migration for vendor social media and gallery

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('vendors', '0001_initial'),  # Adjust if needed
    ]

    operations = [
        # Add social media fields to Vendor
        # Note: cover_photo is added in migration 0004, not here
        migrations.AddField(
            model_name='vendor',
            name='facebook_url',
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='vendor',
            name='instagram_url',
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='vendor',
            name='twitter_url',
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='vendor',
            name='linkedin_url',
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='vendor',
            name='website_url',
            field=models.URLField(blank=True, max_length=500),
        ),
        # Create VendorPhoto model
        migrations.CreateModel(
            name='VendorPhoto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='vendor_gallery/')),
                ('caption', models.CharField(blank=True, max_length=255)),
                ('order', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery', to='vendors.vendor')),
            ],
            options={
                'ordering': ['order', '-created_at'],
            },
        ),
    ]
