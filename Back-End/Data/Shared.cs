using AspChat.Controllers;
using Microsoft.AspNetCore.Identity;
using System.Collections.Concurrent;

namespace AspChat.Data
{
    public class Shared
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connection = new ();

        public ConcurrentDictionary<string, UserConnection> connections => _connection;
    }
}
