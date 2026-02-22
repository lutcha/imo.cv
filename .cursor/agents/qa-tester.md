# QA Tester Agent – imo.cv

## 🎯 ROLE & MISSION
Ensure imo.cv platform quality through comprehensive testing: unit tests, integration tests, E2E tests, performance tests, and accessibility tests.

## 📋 TESTING STRATEGY

### Test Pyramid
```
        E2E Tests (10%)
           /    \
  Integration (20%)
       /          \
   Unit Tests (70%)
```

## 🧪 UNIT TESTS

### Backend Unit Tests
```python
# tests/test_properties.py
import pytest
from django.contrib.gis.geos import Point
from apps.properties.models import Property

@pytest.mark.django_db
class TestPropertyModel:
    
    def test_property_creation(self):
        """Test property can be created"""
        property = Property.objects.create(
            title="Test Property",
            price=1000000,
            currency="CVE",
            property_type="apartment",
            bedrooms=2,
            bathrooms=1,
            area_m2=80,
            island="Santiago",
            municipality="Praia",
            location=Point(-23.5138, 15.1152)
        )
        assert property.title == "Test Property"
        assert property.price == 1000000
        assert property.island == "Santiago"
    
    def test_property_price_validation(self):
        """Test price must be positive"""
        with pytest.raises(Exception):
            Property.objects.create(
                title="Invalid Property",
                price=-100,
                currency="CVE",
                property_type="apartment",
                island="Santiago",
                municipality="Praia",
                location=Point(-23.5138, 15.1152)
            )
    
    def test_property_string_representation(self):
        """Test __str__ method"""
        property = Property.objects.create(
            title="Beautiful Apartment",
            price=1500000,
            currency="CVE",
            property_type="apartment",
            island="Santiago",
            municipality="Praia",
            location=Point(-23.5138, 15.1152)
        )
        assert str(property) == "Beautiful Apartment"
```

### Frontend Unit Tests
```typescript
// frontend/__tests__/components/PropertyCard.test.tsx
import { render, screen } from '@testing-library/react'
import PropertyCard from '@/components/property/PropertyCard'

describe('PropertyCard', () => {
  const mockProperty = {
    id: '123',
    title: 'Test Property',
    price: 1000000,
    currency: 'CVE',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    areaM2: 80,
    island: 'Santiago',
    municipality: 'Praia',
    photos: ['image1.jpg', 'image2.jpg']
  }
  
  it('renders property title', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Test Property')).toBeInTheDocument()
  })
  
  it('displays price in CVE format', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('1.000.000 CVE')).toBeInTheDocument()
  })
  
  it('shows bedroom and bathroom count', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('2 quartos')).toBeInTheDocument()
    expect(screen.getByText('1 banheiro')).toBeInTheDocument()
  })
})
```

## 🔗 INTEGRATION TESTS

### API Integration Tests
```python
# tests/test_api_properties.py
import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from apps.properties.models import Property

User = get_user_model()

@pytest.mark.django_db
class TestPropertyAPI:
    
    def setup_method(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@agency.cv',
            password='testpass123',
            role='agent'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_list_properties(self):
        """Test GET /api/properties/ returns properties"""
        Property.objects.create(
            title="Property 1",
            price=1000000,
            currency="CVE",
            property_type="apartment",
            island="Santiago",
            municipality="Praia",
            location=Point(-23.5138, 15.1152),
            agency=self.user.agency
        )
        response = self.client.get('/api/properties/')
        assert response.status_code == 200
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['title'] == "Property 1"
    
    def test_create_property(self):
        """Test POST /api/properties/ creates property"""
        data = {
            'title': 'New Property',
            'price': 1500000,
            'currency': 'CVE',
            'property_type': 'house',
            'bedrooms': 3,
            'bathrooms': 2,
            'area_m2': 120,
            'island': 'Santiago',
            'municipality': 'Praia',
            'location': {
                'type': 'Point',
                'coordinates': [-23.5138, 15.1152]
            }
        }
        response = self.client.post('/api/properties/', data, format='json')
        assert response.status_code == 201
        assert Property.objects.count() == 1
        assert Property.objects.first().title == 'New Property'
```

## 🧭 E2E TESTS (Playwright/Cypress)

### User Journey: Search and Contact
```typescript
// frontend/e2e/search-and-contact.spec.ts
import { test, expect } from '@playwright/test'

test('User can search properties and contact agent', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('input[placeholder="Search location..."]', 'Santiago')
  await page.click('button:has-text("Search")')
  await expect(page.locator('.property-card')).toHaveCount(5)
  await page.click('.property-card:first-child')
  await expect(page).toHaveURL(/\/property\/\d+/)
  await expect(page.locator('h1')).toContainText('Apartamento')
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="phone"]', '+238 991 23 45')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('textarea[name="message"]', 'I am interested in this property')
  await page.click('button:has-text("Contact Agent")')
  await expect(page.locator('.success-message')).toBeVisible()
  await expect(page.locator('.success-message')).toContainText('Thank you')
})
```

## ⚡ PERFORMANCE TESTS

### Load Testing with Locust
```python
# locustfile.py
from locust import HttpUser, task, between

class PropertyUser(HttpUser):
    wait_time = between(1, 3)
    
    @task(3)
    def view_properties(self):
        self.client.get("/api/properties/?island=Santiago&page=1")
    
    @task(2)
    def search_properties(self):
        self.client.get(
            "/api/properties/search/",
            params={
                "island": "Santiago",
                "min_price": 500000,
                "max_price": 5000000,
                "bedrooms": 2
            }
        )
    
    @task(1)
    def view_property_detail(self):
        self.client.get("/api/properties/123/")
    
    @task(1)
    def create_lead(self):
        self.client.post("/api/leads/", json={
            "property": 123,
            "name": "Test User",
            "phone": "+238 991 23 45",
            "email": "test@example.com",
            "message": "I am interested"
        })
```

### Performance Budget Tests
```typescript
// frontend/performance.test.ts
import { test, expect } from '@playwright/test'

test('Page load performance meets budget', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const lcp = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint')
    return paint.find(p => p.name === 'largest-contentful-paint')?.startTime
  })
  expect(lcp).toBeLessThan(2500)
  const bundleSize = await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource')
    return resources.filter(r => r.initiatorType === 'script')
      .reduce((sum, r) => sum + r.transferSize, 0)
  })
  expect(bundleSize).toBeLessThan(500 * 1024)
})
```

## ♿ ACCESSIBILITY TESTS

### WCAG 2.1 AA Compliance
```typescript
// frontend/accessibility.test.ts
import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test('Homepage has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})

test('Property card has proper ARIA labels', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const hasAriaLabel = await page.locator('.property-card button').first()
    .getAttribute('aria-label')
  expect(hasAriaLabel).toBeTruthy()
  const images = await page.locator('.property-card img')
  for (const img of await images.all()) {
    const alt = await img.getAttribute('alt')
    expect(alt).toBeTruthy()
  }
})
```

## 🌐 CROSS-BROWSER TESTING

### Browser Matrix
```json
{
  "desktop": [
    "Chrome Latest",
    "Firefox Latest", 
    "Safari Latest",
    "Edge Latest"
  ],
  "mobile": [
    "Chrome Mobile",
    "Safari iOS",
    "Samsung Internet"
  ],
  "minimum_versions": {
    "chrome": 90,
    "firefox": 88,
    "safari": 14,
    "ios": 14,
    "android": 10
  }
}
```

## 📊 TEST COVERAGE TARGETS

```json
{
  "unit_tests": {
    "backend": "> 80%",
    "frontend": "> 70%"
  },
  "integration_tests": {
    "api_endpoints": "> 90%",
    "critical_flows": "100%"
  },
  "e2e_tests": {
    "user_journeys": "> 80%",
    "critical_paths": "100%"
  },
  "accessibility": "WCAG 2.1 AA",
  "performance": {
    "lighthouse_score": "> 90",
    "bundle_size": "< 500KB",
    "tti_3g": "< 3.5s"
  }
}
```

## ✅ QA CHECKLIST

- [ ] Unit tests cover all models and functions
- [ ] Integration tests cover all API endpoints
- [ ] E2E tests cover critical user journeys
- [ ] Performance tests meet budget
- [ ] Accessibility tests pass WCAG 2.1 AA
- [ ] Cross-browser tests pass
- [ ] Mobile responsive tests pass
- [ ] Security tests (OWASP) pass
- [ ] Load tests handle expected traffic
- [ ] Error handling tested
- [ ] Edge cases tested
- [ ] Test coverage reports generated
- [ ] CI/CD pipeline runs tests automatically
- [ ] Test data management in place
- [ ] Bug tracking system integrated

## 🐛 BUG TRACKING WORKFLOW

```markdown
1. Bug Reported → Status: New
2. Bug Triaged → Status: Confirmed
3. Bug Assigned → Status: In Progress
4. Bug Fixed → Status: Fixed
5. Bug Verified → Status: Closed

Priority Levels:
- P0: Critical (blocks release)
- P1: High (major functionality broken)
- P2: Medium (minor issues)
- P3: Low (cosmetic issues)
```
