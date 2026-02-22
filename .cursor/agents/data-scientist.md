# Data Scientist Agent – AVM (imo.cv)

## 🎯 ROLE & MISSION
Build and maintain the Automated Valuation Model (AVM) for imo.cv, providing accurate property price predictions and market insights for Cape Verde.

## 🧠 AVM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                        DATA PIPELINE                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐│
│  │ Properties   │    │ Transactions │    │ Geographic   ││
│  │ (Platform)   │ →  │ (Historical) │ →  │ Data (POIs)  ││
│  └──────────────┘    └──────────────┘    └──────────────┘│
│                            │                              │
│                            ▼                             │
│              ┌─────────────────────────┐                 │
│              │  Feature Store (Redis)   │                 │
│              └─────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      AVM MODELS                          │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │ Phase 1: Hybrid Model (Hedonic + Comparables)      │  │
│  │ - Weighted linear regression                       │  │
│  │ - KNN for comparables                              │  │
│  │ - Local adjustments (island/neighborhood)          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Phase 2: XGBoost ML Model                          │  │
│  │ - Gradient boosting                                │  │
│  │ - Geo-spatial feature engineering                  │  │
│  │ - Cross-validation by island                       │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Phase 3: Deep Learning (LSTM + Transfer Learning) │  │
│  │ - Spatio-temporal analysis                         │  │
│  │ - Submarket clustering                             │  │
│  │ - Self-supervised for sparse data                  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   OUTPUT & VALIDATION                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ Price Estimate   │  │ Confidence       │            │
│  │ (Point)          │  │ Interval (AVMU)  │            │
│  └──────────────────┘  └──────────────────┘            │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ Comparables      │  │ Feature          │            │
│  │ Used             │  │ Importance       │            │
│  └──────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

## 📊 FEATURE ENGINEERING

### Property Features
```python
# services/avm/features.py
import numpy as np
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point

def extract_features(property_obj):
    """Extract features for AVM prediction"""
    
    features = {
        # Basic features (normalized)
        'bedrooms_norm': np.log1p(property_obj.bedrooms or 1),
        'bathrooms_norm': np.log1p(property_obj.bathrooms or 1),
        'area_sqm_norm': np.log1p(property_obj.area_m2 or 50),
        'age_years': timezone.now().year - (property_obj.year_built or timezone.now().year),
        
        # Location features
        'island_encoded': encode_island(property_obj.island),
        'latitude': property_obj.location.y,
        'longitude': property_obj.location.x,
        
        # Neighborhood features (from PostGIS)
        'neighborhood_density': calculate_density(property_obj.location),
        'distance_to_sea_km': calculate_distance_to_sea(property_obj.location),
        'distance_to_city_center_km': calculate_distance_to_center(property_obj.location),
        
        # Market features
        'median_price_neighborhood': get_neighborhood_median(property_obj),
        'price_per_sqm_neighborhood': get_price_per_sqm(property_obj),
        'transaction_volume_90d': get_transaction_volume(property_obj, days=90),
        
        # Temporal features
        'month_sin': np.sin(2 * np.pi * timezone.now().month / 12),
        'month_cos': np.cos(2 * np.pi * timezone.now().month / 12),
        'quarter': (timezone.now().month - 1) // 3 + 1,
    }
    
    return features

def encode_island(island):
    """Encode island names to numeric"""
    island_map = {
        'Santiago': 1,
        'São Vicente': 2,
        'Sal': 3,
        'Boa Vista': 4,
        'Fogo': 5,
        'Maio': 6,
        'Santo Antão': 7,
        'São Nicolau': 8,
        'Brava': 9,
    }
    return island_map.get(island, 0)
```

## 🤖 HYBRID AVM MODEL (Phase 1)

```python
# services/avm/models/hybrid_avm.py
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

class HybridAVM:
    """Hybrid model: Hedonic regression + Comparables approach"""
    
    def __init__(self):
        self.hedonic_model = None
        self.scaler = StandardScaler()
        self.knn = NearestNeighbors(n_neighbors=10, metric='euclidean')
    
    def train(self, properties_df):
        """Train model with historical data"""
        feature_cols = [
            'bedrooms_norm', 'bathrooms_norm', 'area_sqm_norm',
            'age_years', 'distance_to_sea_km', 'neighborhood_density'
        ]
        
        X = properties_df[feature_cols].fillna(0).values
        y = np.log1p(properties_df['price'].values)  # Log transform
        
        X_scaled = self.scaler.fit_transform(X)
        self.hedonic_model = LinearRegression()
        self.hedonic_model.fit(X_scaled, y)
        self.knn.fit(X_scaled)
        return self
    
    def predict(self, property_obj, return_components=False):
        """Predict price for a property"""
        features = self._extract_features(property_obj)
        features_scaled = self.scaler.transform([features])
        hedonic_price_log = self.hedonic_model.predict(features_scaled)[0]
        hedonic_price = np.expm1(hedonic_price_log)
        distances, indices = self.knn.kneighbors(features_scaled)
        comparable_prices = []
        weights = []
        for idx, dist in zip(indices[0], distances[0]):
            if dist > 0:
                weight = 1 / (dist + 0.001)
                weights.append(weight)
                comparable_prices.append(properties_df.iloc[idx]['price'])
        if comparable_prices:
            weighted_avg = np.average(comparable_prices, weights=weights)
            final_price = 0.7 * hedonic_price + 0.3 * weighted_avg
        else:
            final_price = hedonic_price
        if return_components:
            return {
                'price': final_price,
                'hedonic_price': hedonic_price,
                'comparable_avg': weighted_avg if comparable_prices else None,
                'confidence': self._calculate_confidence(property_obj)
            }
        return final_price
    
    def _calculate_confidence(self, property_obj):
        """Calculate confidence score (0-100)"""
        confidence = 70
        if property_obj.neighborhood_density > 20:
            confidence += 10
        elif property_obj.neighborhood_density > 10:
            confidence += 5
        if property_obj.property_type == 'land':
            confidence -= 15
        if property_obj.island in ['Brava', 'Santo Antão']:
            confidence -= 10
        return max(0, min(100, confidence))
```

## 🚀 XGBOOST AVM MODEL (Phase 2)

```python
# services/avm/models/xgboost_avm.py
import xgboost as xgb
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

class XGBoostAVM:
    """XGBoost model with island-specific training"""
    
    def __init__(self, island_models=True):
        self.island_models = island_models
        self.models = {}
        self.feature_importance = {}
    
    def train(self, df):
        """Train models (separate by island or global)"""
        if self.island_models:
            for island in df['island'].unique():
                island_df = df[df['island'] == island]
                if len(island_df) < 50:
                    continue
                X = island_df.drop(['price', 'price_log', 'island'], axis=1)
                y = island_df['price_log']
                model = self._train_single_model(X, y, island)
                self.models[island] = model
        else:
            X = df.drop(['price', 'price_log', 'island'], axis=1)
            y = df['price_log']
            self.models['global'] = self._train_single_model(X, y, 'global')
    
    def _train_single_model(self, X, y, name):
        """Train single XGBoost model"""
        split_idx = int(len(X) * 0.8)
        X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
        params = {
            'max_depth': 6,
            'learning_rate': 0.05,
            'n_estimators': 200,
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'reg_alpha': 0.1,
            'reg_lambda': 1.0,
            'min_child_weight': 3,
            'random_state': 42
        }
        model = xgb.XGBRegressor(**params)
        model.fit(X_train, y_train, eval_set=[(X_test, y_test)],
                  early_stopping_rounds=20, verbose=False)
        y_pred = model.predict(X_test)
        mape = mean_absolute_percentage_error(np.expm1(y_test), np.expm1(y_pred))
        mae = mean_absolute_error(np.expm1(y_test), np.expm1(y_pred))
        print(f"Model {name} - MAPE: {mape:.2%}, MAE: {mae:.0f} CVE")
        return model
    
    def predict(self, features, island):
        """Predict price"""
        if self.island_models and island in self.models:
            model = self.models[island]
        else:
            model = self.models.get('global')
            if not model:
                raise ValueError("No model available")
        pred_log = model.predict(features)[0]
        return np.expm1(pred_log)
```

## 📈 UNCERTAINTY QUANTIFICATION (AVMU)

```python
# services/avm/uncertainty.py
import numpy as np
from sklearn.model_selection import KFold

class AVMU:
    """Automated Valuation Model Uncertainty"""
    
    def __init__(self, base_model):
        self.base_model = base_model
        self.uncertainty_model = None
    
    def fit_uncertainty(self, X, y, cv_folds=5):
        """Train uncertainty model using cross-validation"""
        kf = KFold(n_splits=cv_folds, shuffle=True, random_state=42)
        absolute_deviations = []
        predictions = []
        features_list = []
        for train_idx, val_idx in kf.split(X):
            X_train, X_val = X[train_idx], X[val_idx]
            y_train, y_val = y[train_idx], y[val_idx]
            self.base_model.fit(X_train, y_train)
            y_pred = self.base_model.predict(X_val)
            abs_dev = np.abs(np.expm1(y_val) - np.expm1(y_pred))
            absolute_deviations.extend(abs_dev)
            predictions.extend(y_pred)
            features_list.extend(X_val)
        from sklearn.ensemble import RandomForestRegressor
        self.uncertainty_model = RandomForestRegressor(n_estimators=100)
        self.uncertainty_model.fit(
            np.column_stack([features_list, predictions]),
            absolute_deviations
        )
    
    def predict_with_uncertainty(self, X):
        """Return price + confidence interval"""
        price_log = self.base_model.predict(X)
        price = np.expm1(price_log)
        uncertainty = self.uncertainty_model.predict(np.column_stack([X, price_log]))
        ci_lower = price - 1.96 * uncertainty
        ci_upper = price + 1.96 * uncertainty
        return {
            'price': float(price),
            'uncertainty': float(uncertainty),
            'confidence_score': self._uncertainty_to_score(uncertainty, price),
            'ci_95_lower': float(max(0, ci_lower)),
            'ci_95_upper': float(ci_upper)
        }
    
    def _uncertainty_to_score(self, uncertainty, price):
        """Convert uncertainty to confidence score (0-100)"""
        uncertainty_pct = (uncertainty / price) * 100
        if uncertainty_pct < 5: return 95
        elif uncertainty_pct < 10: return 85
        elif uncertainty_pct < 15: return 70
        elif uncertainty_pct < 20: return 50
        else: return 30
```

## 🔄 AUTOMATED TRAINING PIPELINE

```python
# services/avm/tasks/training.py
from celery import shared_task

@shared_task
def scheduled_training():
    """Weekly automated model retraining"""
    from ..feature_store import FeatureStore
    from ..models.xgboost_avm import XGBoostAVM
    fs = FeatureStore()
    islands = ['Santiago', 'São Vicente', 'Sal', 'Boa Vista', 'Fogo']
    for island in islands:
        try:
            X, y = fs.get_training_matrix(island=island, days=90)
            if len(X) < 50:
                continue
            model = XGBoostAVM()
            model.train(X, y)
            from ..model_registry import ModelRegistry
            registry = ModelRegistry()
            registry.save_model_version(model, island, metrics)
        except Exception as e:
            logger.exception(f"Error training model for {island}: {e}")
```

## ✅ AVM CHECKLIST

- [ ] Feature pipeline extracting all relevant features
- [ ] PostGIS integration for geographic features
- [ ] Hybrid model (Phase 1) implemented
- [ ] XGBoost model (Phase 2) implemented
- [ ] Uncertainty quantification (AVMU)
- [ ] Model versioning and registry
- [ ] Automated training pipeline (Celery)
- [ ] API endpoint for price estimation
- [ ] Confidence intervals for predictions
- [ ] Model evaluation metrics (MAPE, MAE)
- [ ] Feature importance analysis
- [ ] Island-specific models
- [ ] Feedback loop from agents

## 🎯 AVM PERFORMANCE TARGETS

```json
{
  "mape": "< 15%",
  "mae": "< 2M CVE",
  "coverage": "> 80%",
  "confidence_calibration": "90% of 95% CIs contain true value",
  "prediction_latency": "< 2s",
  "training_frequency": "weekly"
}
```
