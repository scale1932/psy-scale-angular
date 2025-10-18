package com.example.hmrc.controller;

import com.example.hmrc.config.AppProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;
import java.util.HashMap; // 引入 HashMap 用于构造 Map 响应

@RestController
@RequestMapping("/api/hmrc/auth")
public class HMRCAuthController {

    // Spring Security 内部 OAuth2 启动端点的路径
    // 前端获取此路径后，将使用 window.location.href 进行跳转
    private static final String SPRING_AUTH_START_URI = "/oauth2/authorization/user";

    private final AppProperties appProperties;

    public HMRCAuthController(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    /**
     * 接口 1: 启动 HMRC 认证授权流程
     * URL: GET /api/hmrc/auth/start
     * 作用: 返回 Spring Security 启动授权流程的 URL。前端必须使用 window.location.href 跳转。
     * 响应状态: 200 OK
     */
    @GetMapping("/start")
    public ResponseEntity<Map<String, String>> startAuthFlow() {
        // 返回 200 OK 和跳转 URL，指示前端使用 window.location.href 进行跳转
        Map<String, String> response = new HashMap<>();
        // 注意：此处返回的是完整的后端路径，前端需要拼接域名
        response.put("redirectUrl", SPRING_AUTH_START_URI);
        return ResponseEntity.ok(response);
    }

    // --- 以下是 Spring Security 流程成功/失败后重定向的终点 ---

    /**
     * 授权成功后 Spring Security 内部重定向的终点
     * URL: GET /auth/success (由 SecurityConfig.defaultSuccessUrl 配置)
     * 作用: 记录 Token 和用户信息，然后最终重定向回 Angular 前端。
     */
    @GetMapping("/auth/success")
    public RedirectView authSuccessHandler(OAuth2AuthenticationToken token, @AuthenticationPrincipal OAuth2User oauth2User) {
        // --------------------------------------------------------------------------
        // 步骤 1: 获取和处理 Token/用户信息 (最重要的业务逻辑)
        // --------------------------------------------------------------------------

        // 此时，Token 已经在 Spring Security 内部被交换和存储（OAuth2AuthorizedClientService）

        // 1.1 获取用户信息（例如，用户的 HMRC ID）
        String principalName = token.getPrincipal().getName();
        String registrationId = token.getAuthorizedClientRegistrationId(); // 应该是 "user"
        Map<String, Object> attributes = oauth2User.getAttributes();

        System.out.println("Authorization Successful for user: " + principalName);
        System.out.println("HMRC User Attributes: " + attributes);

        // 1.2 实际项目:
        // a. 在此利用 principalName 和 attributes 查找/创建您的内部用户。
        // b. 可以通过 OAuth2AuthorizedClientService 获取 Access TokenAPI 和 Refresh Token，
        //    并将它们与您的用户 ID 关联，持久化存储在数据库中，用于后续的  调用。

        // --------------------------------------------------------------------------
        // 步骤 2: 重定向回前端 Angular 应用
        // --------------------------------------------------------------------------

        // 最后，将用户重定向回 Angular 应用的成功页面
        return new RedirectView(appProperties.getFrontendSuccessUrl());
    }

    /**
     * 授权失败后 Spring Security 内部重定向的终点
     * URL: GET /auth/failure (由 SecurityConfig.failureUrl 配置)
     * 作用: 最终重定向回 Angular 前端的失败页面。
     */
    @GetMapping("/auth/failure")
    public RedirectView authFailureHandler() {
        System.err.println("Authorization Failed.");
        // 重定向回 Angular 应用的失败页面
        return new RedirectView(appProperties.getFrontendFailureUrl());
    }
}
