//package capstone.round_table.security.jwt;
//
//
//import capstone.round_table.domain.UserService;
//import capstone.round_table.models.User;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import java.security.Key;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Component
//public class JwtConverter {
//
//    private String secret = "Secret for now but this needs to be changed";
//    private Key key;
//    private final String ISSUER = "CtrlSaltDel";
//    private final int EXPIRATION_MINUTES = 5;
//    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;
//
//
//    public String getTokenFromUser(User user) {
//
//        this.key = Keys.hmacShaKeyFor(secret.getBytes());
//        String roles = user.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(","));
//
//        return Jwts.builder()
//                .setIssuer(ISSUER)
//                .setSubject(user.getEmail())
//                .claim("roles", roles)
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
//                .signWith(key)
//                .compact();
//    }
//
//    public org.springframework.security.core.userdetails.User getUserFromToken(String token) {
//
//        if (token == null || !token.startsWith("Bearer ")) {
//            return null;
//        }
//
//        try {
//            Jws<Claims> jws = Jwts.parserBuilder()
//                    .requireIssuer(ISSUER)
//                    .setSigningKey(key)
//                    .build()
//                    .parseClaimsJws(token.substring(7)); // substring 7 to remove bearer
//
//            String email = jws.getBody().getSubject();
//            String authStr = (String) jws.getBody().get("roles");
//            List<GrantedAuthority> authorities = Arrays.stream(authStr.split(","))
//                    .map(i -> new SimpleGrantedAuthority(i))
//                    .collect(Collectors.toList());
//
//            // TODO: DI user service to find user once we have token
//            return new org.springframework.security.core.userdetails.User(email, email, authorities);
//
//        } catch (ExpiredJwtException e) {
//            System.out.println("THIS TOKEN IS EXPIRED!");
//            System.out.println(e);
//        } catch (JwtException e) {
//            System.out.println(e);
//        }
//
//        return null;
//    }
//
//}
