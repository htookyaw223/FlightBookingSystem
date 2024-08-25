package com.hkdev.flightfinder.security.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hkdev.flightfinder.constants.SecurityConstants;
import com.hkdev.flightfinder.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Override
    public User extractUser(String token) {
        String claim =  extractClaim(token, Claims::getSubject);
        try {
            User user = new ObjectMapper().readValue(claim, User.class);

            return user;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generateToken(User user, UserDetails userDetails) {
        return doGenerateToken(new HashMap<>(), user);
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final User user = extractUser(token);
        return (user.getUsername().equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String doGenerateToken(Map<String, Object> extraClaims, User userDetails) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonResult = mapper.writeValueAsString(userDetails);
            return Jwts.builder().setClaims(extraClaims).setSubject(jsonResult)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
        } catch (Exception e) {
            System.out.println("Exception "+ e.getMessage());
        }
        return  null;
    }

    @Override
    public boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SecurityConstants.JWT_SECERT);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
