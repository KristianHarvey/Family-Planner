
using System.Net;

namespace FamilyPlanner.Models {
    public sealed class APIResponse {
        public APIResponse(dynamic data, string message, bool isError, HttpStatusCode statusCode) {
            Data = data;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(dynamic data, string token, string message, bool isError, HttpStatusCode statusCode) {
            Data = data;
            Token = token;
            Message = message;
            IsError = isError;
            StatusCode = statusCode;
        }
        public APIResponse(string token, string message, bool isError, HttpStatusCode statusCode) {
            Token = token;
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
        public string? Token { get; set; }
        public string? Message { get; set; }
        public bool? IsError { get; set; } 
        public HttpStatusCode? StatusCode { get; set; } 
    }
}