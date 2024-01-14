using AspChat.Controllers;
using AspChat.Data;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{

    private readonly Shared _shared;

    public ChatHub(Shared shared)
    {
        this._shared = shared;
    }
    public async Task JoinChat(UserConnection connection)
    {
        try
        {
            await Clients.All.SendAsync("Message Reçu", connection.username + " est parmi nous");
        }
        catch (Exception ex)
        {
            // Log or handle the exception
            Console.Error.WriteLine($"Error in JoinChat: {ex.Message}");
        }
    }

    public async Task JoinSpecificRoom(UserConnection connection)
    {
        try
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
            await Clients.Group(connection.ChatRoom).SendAsync("JoinSpecificRoom", connection.username + " est parmi nous dans " + connection.ChatRoom);
            _shared.connections[Context.ConnectionId] = connection;
        }
        catch (Exception ex)
        {
            // Log or handle the exception
            Console.Error.WriteLine($"Error in JoinSpecificRoom: {ex.Message}");
        }
    }

    // ChatHub.cs
    public async Task SendMessage(string message)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection connection) && connection != null)
        {
            await Clients.Group(connection.ChatRoom).SendAsync("ReceiveSpecificMessage", connection.username, message);
        }
    }



}
