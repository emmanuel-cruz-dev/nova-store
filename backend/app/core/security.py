from datetime import datetime, timedelta, timezone
from typing import Optional, Any, Dict
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Generate password hash"""
    return pwd_context.hash(password)


def create_access_token(
    subject: str,
    data: Optional[Dict[str, Any]] = None,
    expires_delta: Optional[timedelta] = None
) -> str:
    """Create a JWT access token"""
    to_encode = {"sub": subject}

    if data:
        to_encode.update(data)

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return encoded_jwt


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and validate a JWT token"""
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.now(timezone.utc):
            return None

        return payload
    except JWTError:
        return None


def get_token_payload(token: str) -> Dict[str, Any]:
    """Get token payload with validation (raises HTTPException on error)"""
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload


def get_subject_from_token(token: str) -> str:
    """Extract subject (usually user email or ID) from token"""
    payload = get_token_payload(token)
    subject = payload.get("sub")
    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return subject


def create_refresh_token(subject: str) -> str:
    """Create a refresh token (longer expiration)"""
    expires_delta = timedelta(days=7)
    return create_access_token(subject, {"type": "refresh"}, expires_delta)


def verify_refresh_token(token: str) -> bool:
    """Verify if token is a valid refresh token"""
    payload = decode_access_token(token)
    if not payload:
        return False
    return payload.get("type") == "refresh"


def validate_password_strength(password: str) -> bool:
    """Validate password meets minimum requirements"""
    if len(password) < 8:
        return False

    return True


def generate_reset_token() -> str:
    """Generate a secure random token for password reset"""
    import secrets
    return secrets.token_urlsafe(32)


def create_email_verification_token(email: str) -> str:
    """Create token for email verification"""
    expires_delta = timedelta(hours=24)
    return create_access_token(
        email,
        {"purpose": "email_verification"},
        expires_delta
    )