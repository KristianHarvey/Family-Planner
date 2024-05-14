
using System.Net;
using FamilyPlanner.Models.RefreshTokenModel;

namespace FamilyPlanner.Models {
    public sealed class APIResponse {
        public APIResponse(dynamic data, string message, bool isError, HttpStatusCode statusCode) {
            Data = data;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(dynamic data, string accessToken, string refreshToken, string message, bool isError, HttpStatusCode statusCode) {
            Data = data;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(dynamic data, string token, string message, bool isError, HttpStatusCode statusCode) {
            Data = data;
            AccessToken = token;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(string accessToken, string refreshToken, string message, bool isError, HttpStatusCode statusCode) {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(string message, bool isError, HttpStatusCode statusCode) {
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }

        public dynamic? Data { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? Message { get; set; }
        public bool? IsError { get; set; } 
        public HttpStatusCode? StatusCode { get; set; } 
    }
}