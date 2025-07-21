package capstone.round_table.jwt;


import capstone.round_table.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtConverter {
    
    @Value("${app.secret}")
    private String secret;
    private Key key;
    private final String ISSUER = "CtrlSaltDel";
    private final int EXPIRATION_MINUTES = 5;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;


    // This runs after dependency injection is done on key
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String getTokenFromUser(User user) {
        String roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("roles", roles)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public User getUserFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7)); // substring 7 to remove bearer

            String username = jws.getBody().getSubject();
            String authStr = (String) jws.getBody().get("roles");
            List<GrantedAuthority> authorities = Arrays.stream(authStr.split(","))
                    .map(i -> new SimpleGrantedAuthority(i))
                    .collect(Collectors.toList());

            // TODO: DI user service to find user once we have token
            return new User();

        } catch (ExpiredJwtException e) {
            System.out.println("THIS TOKEN IS EXPIRED!");
            System.out.println(e);
        } catch (JwtException e) {
            System.out.println(e);
        }

        return null;
    }

}
