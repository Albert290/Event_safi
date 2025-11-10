from django.db import models
from django.conf import settings
import uuid

# Create your models here.
class ChatMemory(models.Model):
    """
    Store user-AI conversation context for the recommender assistant.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    messages = models.JSONField(default=list)  # [{'role': 'user', 'text': 'Hi'}, {'role': 'assistant', 'text': 'Hello!'}]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def add_message(self, role, text):
        """
        Append a message and save memory.
        """
        self.messages.append({"role": role, "text": text})
        self.save()

    def __str__(self):
        return f"ChatMemory for {self.user.username} ({len(self.messages)} messages)"