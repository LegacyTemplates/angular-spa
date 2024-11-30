using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace angular_spa
{
    public static class JwtAuthConfig
    {
        public static TokenValidationParameters Parameters { get; } =
            new TokenValidationParameters
            {
                ValidIssuer = "Fiver.Security.Bearer",
                ValidAudience = "http://localhost:80",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1")),
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
    }
}
