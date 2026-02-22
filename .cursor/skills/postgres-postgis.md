---
name: postgres-postgis
description: Covers PostgreSQL + PostGIS usage in imo.cv: Property location (PointField), geo queries (radius, distance), and indexes. Use when writing geo filters, search, or map data.
---

# PostgreSQL + PostGIS – imo.cv

Reference: [Backend Engineer Agent](../agents/backend-engineer.md) for Property model and search.

## When to Use

- Adding or changing location fields or geo queries.
- Implementing radius/distance search or map aggregations.
- Tuning indexes for property search (island, type, price, location).

## Key Patterns

- **Model**: `PointField(srid=4326)` for WGS84; island, municipality, neighborhood as attributes.
- **Radius search**: `location__dwithin=(point, radius_meters)`; annotate with `Distance('location', point)`.
- **Point**: `Point(lng, lat, srid=4326)` (GeoDjango: x=longitude, y=latitude).

## Indexes

- Composite index on (island, property_type, status); index on price.
- Spatial index on location for geo queries.

## Constraints

- All coordinates in WGS84 (SRID 4326).
- For AVM features (distance to sea, density), use PostGIS functions in feature pipeline (see [AVM Models](avm-models.md)).
