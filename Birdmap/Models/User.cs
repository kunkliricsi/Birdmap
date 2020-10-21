using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Birdmap.Models
{
    public class User
    {
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
