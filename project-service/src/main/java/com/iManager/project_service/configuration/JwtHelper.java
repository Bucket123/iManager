package com.iManager.project_service.configuration;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtHelper {

    // ⚠️ SAME secret as auth-service (for now hardcode)
    private final Key key = Keys.hmacShaKeyFor(
            "minijira-secret-key-123456-minijira-secret-key".getBytes()
    );


    public String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
