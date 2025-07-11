using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Twilio.Jwt.AccessToken;
using System.Net;


[ApiController]
[Route("api/twilio")]
public class TwilioController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public TwilioController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("messages")]
    public IActionResult GetMessages(
        [FromQuery] string phoneNumber,
        [FromQuery] int limit = 5,
        [FromQuery] DateTime? dateSentBefore = null,
        [FromQuery] DateTime? dateSentAfter = null)
        {

        if (string.IsNullOrEmpty(phoneNumber))
        {
            return BadRequest("Phone number is required.");
        }

        // Validate phone number format
        Regex regex = new Regex(@"^[\d\+\-\(\)]+$");
        if (!regex.IsMatch(phoneNumber))
        {
            return BadRequest("Invalid phone number format. Only the characters '+', '-', '(', ')', and numbers 0-9 are allowed.");
        }

        try
        {
            string accountSid = _configuration["Twilio:AccountSid"] ?? throw new InvalidOperationException("Twilio:AccountSid is not configured.");
            string authToken = _configuration["Twilio:AuthToken"] ?? throw new InvalidOperationException("Twilio:AuthToken is not configured.");
            TwilioClient.Init(accountSid, authToken);

            var messages = MessageResource.Read(
                to: new Twilio.Types.PhoneNumber(phoneNumber),
                dateSentBefore: dateSentBefore,
                dateSentAfter: dateSentAfter,
                limit: limit
            );

            if (messages == null || !messages.Any())
            {
                return NotFound("No messages were found being sent to that number.");
            }

            var result = messages.Select(m => new
            {
                m.To,
                From = m.From?.ToString() ?? "UnKnown",
                m.Body,
                m.Sid,
                Status = m.Status.ToString() ?? "UnKnown",
                m.DateCreated,
                m.DateSent,
                m.DateUpdated,
                ErrorCode = m.ErrorCode?.ToString() ?? "None",
                ErrorMessage = m.ErrorCode?.ToString() ?? "None",
                m.Uri
            });

            return Ok(result);
        }
        catch (Twilio.Exceptions.ApiException ex) when (ex.Status == 429)
        {
            return StatusCode(429, "Rate-Limiting present, please wait a few minutes and try again.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("message-details")]
    public IActionResult GetMessageDetails([FromQuery] string sid)
    {
        if (string.IsNullOrEmpty(sid))
        {
            return BadRequest("Message SID is required.");
        }

        try
        {
            string accountSid = _configuration["Twilio:AccountSid"] ?? throw new InvalidOperationException("Twilio:AccountSid is not configured.");
            string authToken = _configuration["Twilio:AuthToken"] ?? throw new InvalidOperationException("Twilio:AuthToken is not configured.");
            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Fetch(sid);

            var result = new
            {
                message.Sid,
                Status = message.Status.ToString() ?? "Unknown",
                ErrorCode = message.ErrorCode?.ToString() ?? "None",
                ErrorMessage = message.ErrorMessage ?? "None",
                dateSent = message.DateSent,
                dateCreated = message.DateCreated,
                dateReceived = message.DateUpdated,
                From = message.From?.ToString() ?? "Unknown",
                To = message.To?.ToString() ?? "Unknown",
                Body = message.Body
            };

            return Ok(result);
        }
        catch (Twilio.Exceptions.ApiException ex) when (ex.Status == 429)
        {
            return StatusCode(429, "Rate-Limiting present, please wait a few minutes and try again.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}