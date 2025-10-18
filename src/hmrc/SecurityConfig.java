package com.example.hmrc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AppProperties appProperties;

    public SecurityConfig(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 允许 Angular 前端进行跨域请求
            .cors(c -> c.disable())
            .csrf(csrf -> csrf.disable()) // 禁用 CSRF 保护 (REST API 常见做法，生产环境需确保其他保护机制)

            // 配置授权规则
            .authorizeHttpRequests(auth -> auth
                // 允许未认证访问启动接口和认证回调/成功页面
                .requestMatchers("/api/hmrc/auth/start", "/auth/success", "/auth/failure").permitAll()
                // 其他所有请求都需要认证 (根据您的实际业务需求调整)
                .anyRequest().authenticated()
            )

            // 启用 OAuth2 登录配置
            .oauth2Login(oauth2 -> oauth2
                // 配置 Spring Security 内部回调处理成功后的重定向目标
                // 这里指向我们自定义的 Controller Endpoint
                .defaultSuccessUrl("/auth/success", true)
                // 配置失败后的重定向目标
                .failureUrl("/auth/failure")
            );

        return http.build();
    }

    /**
     * 配置 CORS 允许 Angular 应用访问，在实际部署中应配置更严格的源。
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // 允许所有源访问，实际部署中应该限制为您的 Angular 应用域名
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

/**
 * 辅助配置类，用于读取 application.yml 中的自定义属性
 */
@Component
@ConfigurationProperties(prefix = "app")
class AppProperties {
    private String frontendSuccessUrl;
    private String frontendFailureUrl;

    public String getFrontendSuccessUrl() { return frontendSuccessUrl; }
    public void setFrontendSuccessUrl(String frontendSuccessUrl) { this.frontendSuccessUrl = frontendSuccessUrl; }
    public String getFrontendFailureUrl() { return frontendFailureUrl; }
    public void setFrontendFailureUrl(String frontendFailureUrl) { this.frontendFailureUrl = frontendFailureUrl; }
}
