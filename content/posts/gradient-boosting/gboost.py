from sklearn.base import clone, BaseEstimator, RegressorMixin
from sklearn.tree import DecisionTreeRegressor
from sklearn.dummy import DummyRegressor
import numpy as np
from scipy.special import expit


def mse_gradient(y, f):
    """ Least Squares gradient, also known for GBM as pseudo-residuals """
    return y - f


def lad_gradient(y, f):
    """Also known as MAE. 1.0 if y - pred > 0.0 else -1.0"""
    return 2.0 * (y - f > 0) - 1.0


def logistic_gradient(y, f):
    """ expit(x) = 1/(1+exp(-x)). It is the inverse of the logit function. """
    return y - expit(f)


def proba_to_class(item, tol=0.5):
    """ predict class given a probability """
    return int(item > tol)


class GBoost(BaseEstimator):
    def __init__(self, n_estimators=100, learning_rate=0.1, loss='ls'):
        self.n_estimators = n_estimators
        self.learning_rate = learning_rate
        self.first_estimator = DummyRegressor(strategy='constant', constant=0)
        self.base_estimator = DecisionTreeRegressor(max_depth=1)
        if loss == 'lad':
            self.loss = lad_gradient
        elif loss == 'ls':
            self.loss = mse_gradient
        elif loss == 'logistic':
            self.loss = logistic_gradient
        else:
            raise AttributeError(f'Unknown loss function: {loss}')

    def fit(self, X, y):
        self._estimators = [self.first_estimator]
        # step 0
        f = self.first_estimator.fit(X, y)
        for m in range(self.n_estimators):
            # Step 1: predict using all weak learners trained up to this epoch
            f = self.predict(X)
            # step 2: calculate residuals from previous step
            residuals = self.loss(y, f)
            # step 3: Fit to pseudo-residuals
            g = clone(self.base_estimator).fit(X, residuals)
            # step 4: Store trained weak learner g
            self._estimators.append(g)
        return self

    def predict(self, X):
        f0 = self._estimators[0].predict(X)
        r = np.sum([self.learning_rate * f.predict(X) for f in self._estimators[1:]], axis=0)
        return f0 + r

    def predict_class(self, X):
        """ Predicts class for binary classification """
        if self.loss != 'logistic':
            raise AttributeError('Method only available for binary classification')
        proba = expit(self.predict(X))
        return np.array([proba_to_class(item) for item in proba])