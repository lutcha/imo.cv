from django.contrib.gis.db.backends.postgis.base import DatabaseWrapper as PostGISDatabaseWrapper
from django_tenants.postgresql_backend.base import DatabaseWrapper as TenantDatabaseWrapper

class DatabaseWrapper(TenantDatabaseWrapper):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ops = PostGISDatabaseWrapper(self.settings_dict, self.alias).ops
        self.ops.connection = self
