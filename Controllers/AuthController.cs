using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using angular_spa.Models;

namespace angular_spa.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        static readonly List<UserModel> Users = new List<UserModel>
        {
            new UserModel{ Login = "Dima", Password = "qwe" }
        };

        readonly JwtSecurityTokenHandler _jwtTokenHandler;

        public AuthController(JwtSecurityTokenHandler jwtTokenHandler)
        {
            _jwtTokenHandler = jwtTokenHandler;
        }

        [HttpPost]
        public IActionResult Auth([FromBody] UserModel user)
        {
            var authUser = Users.FirstOrDefault(u => u.Login.Equals(user.Login) && u.Password.Equals(user.Password));
            if (authUser == null)
                return BadRequest("Invalid username or password");

            return Json(UserWithTokens(authUser));
        }

        [HttpPost("refresh")]
        public IActionResult Refresh([FromBody] UserModel user)
        {
            if (_jwtTokenHandler.ValidateToken(user.RefreshToken, JwtAuthConfig.Parameters, out SecurityToken token)?.Identity.Name.Equals(user.Login) == true)
                return Json(UserWithTokens(user));

            return BadRequest("Invalid refresh token");
        }

        object UserWithTokens(UserModel authUser)
        {
            return new
            {
                name = authUser.Name,
                login = authUser.Login,
                token = WriteToken(authUser),
                refreshToken = WriteRefreshToken(authUser)
            };
        }

        string WriteToken(UserModel user)
        {
            return _jwtTokenHandler.WriteToken(
                _jwtTokenHandler.CreateJwtSecurityToken(
                    subject: new ClaimsIdentity(new GenericIdentity(user.Login)),
                    signingCredentials: new SigningCredentials(JwtAuthConfig.Parameters.IssuerSigningKey, SecurityAlgorithms.HmacSha256Signature),
                    audience: JwtAuthConfig.Parameters.ValidAudience,
                    issuer: JwtAuthConfig.Parameters.ValidIssuer,
                    expires: DateTime.UtcNow.AddMinutes(1)));
        }

        string WriteRefreshToken(UserModel user)
        {
            return _jwtTokenHandler.WriteToken(
                _jwtTokenHandler.CreateJwtSecurityToken(
                    subject: new ClaimsIdentity(new GenericIdentity(user.Login)),
                    signingCredentials: new SigningCredentials(JwtAuthConfig.Parameters.IssuerSigningKey, SecurityAlgorithms.HmacSha256Signature),
                    audience: JwtAuthConfig.Parameters.ValidAudience,
                    issuer: JwtAuthConfig.Parameters.ValidIssuer,
                    expires: DateTime.UtcNow.AddDays(30)));
        }

        [Authorize, HttpGet("secure")]
        public string Secret()
        {
            return User.Identity.Name;
        }
    }
}
