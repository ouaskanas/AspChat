using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatController : Controller
{
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatController(IHubContext<ChatHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(string user, string message)
    {
        // Validez les données, traitez-les, etc.

        // Envoyez le message à tous les clients connectés
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", user, message);

        return Ok();
    }
}
